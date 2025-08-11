# 生产环境数据库连接验证指南

## 概述
本文档提供了完整的生产环境数据库连接验证流程，确保 Vercel Postgres 自动检测功能正常工作，避免500错误。

## 🔍 验证步骤

### 1. 本地环境验证

#### 检查本地开发环境
```bash
# 启动开发服务器
npm run dev

# 测试健康检查接口
curl http://localhost:3000/api/health

# 测试联系表单API
curl -X POST http://localhost:3000/api/contact/list \
  -H "Content-Type: application/json" \
  -d '{"page": 1, "pageSize": 5}'
```

#### 运行诊断脚本
```bash
# 检查当前环境配置
node scripts/check-production-database.js

# 修复数据库连接问题
node scripts/fix-database-connection.js
```

### 2. 部署验证

#### 确认代码已推送
```bash
# 检查Git状态
git status

# 如有未提交更改，提交并推送
git add .
git commit -m "Fix: database connection verification"
git push origin main
```

#### 监控部署状态
1. 访问 [Vercel Dashboard](https://vercel.com/dashboard)
2. 找到项目并查看最新部署状态
3. 检查部署日志中的数据库连接信息

### 3. 生产环境验证

#### 使用健康检查接口
```bash
# 基本健康检查
curl https://your-domain.com/api/health

# 详细健康检查
curl -X POST https://your-domain.com/api/health

# 测试联系表单API
curl -X POST https://your-domain.com/api/contact/list \
  -H "Content-Type: application/json" \
  -d '{"page": 1, "pageSize": 5}'
```

#### 使用监控脚本
```bash
# 单次检查
PRODUCTION_URL=https://your-domain.com node scripts/monitor-production.js single

# 持续监控（可选）
PRODUCTION_URL=https://your-domain.com node scripts/monitor-production.js monitor
```

## 🔧 环境配置检查

### Vercel 环境变量
在 Vercel Dashboard → 项目 → Settings → Environment Variables 中确认：

| 变量名 | 必需性 | 说明 |
|--------|--------|------|
| `DATABASE_URL` | 必需 | 主要的 Postgres 连接字符串 |
| `DATABASE_URL_UNPOOLED` | 推荐 | 非连接池的连接字符串 |
| `POSTGRES_URL` | 可选 | 兼容性连接字符串 |
| `POSTGRES_PRISMA_URL` | 可选 | Prisma 专用连接字符串 |

### 自动检测逻辑
系统会按以下优先级检测数据库：

1. **Vercel Postgres 检测条件**（任一满足即使用 Postgres）：
   - `process.env.POSTGRES_URL` 存在
   - `process.env.DATABASE_URL` 存在
   - `process.env.VERCEL_ENV === 'production'`

2. **SQLite 回退**：
   - 以上条件都不满足时使用本地 SQLite

## 📊 健康检查接口说明

### GET /api/health
基本健康检查，返回：
```json
{
  "status": "healthy",
  "timestamp": "2024-12-19T10:00:00.000Z",
  "environment": {
    "NODE_ENV": "production",
    "hasPostgresUrl": true,
    "hasDatabaseUrl": true
  },
  "database": {
    "type": "postgres",
    "connected": true,
    "initializationTime": 45,
    "testQueryTime": 12,
    "error": null
  },
  "api": {
    "responseTime": 58
  }
}
```

### POST /api/health
详细健康检查，包含：
- 完整的环境变量检测
- 数据库连接详情
- 性能指标
- 优化建议

## 🚨 常见问题和解决方案

### 问题1：500 Internal Server Error

**症状**：API 请求返回500错误

**诊断**：
```bash
# 检查健康状态
curl https://your-domain.com/api/health
```

**解决方案**：
1. 检查 Vercel 部署日志
2. 确认环境变量配置
3. 重新部署应用

### 问题2：数据库连接超时

**症状**：健康检查显示连接超时

**解决方案**：
1. 检查数据库实例状态
2. 验证连接字符串格式
3. 检查网络连接

### 问题3：环境变量缺失

**症状**：生产环境使用 SQLite 而非 Postgres

**解决方案**：
1. 在 Vercel Dashboard 中重新连接数据库
2. 手动添加环境变量
3. 重新部署应用

### 问题4：数据表不存在

**症状**：查询时报告表不存在

**解决方案**：
1. 检查数据库初始化日志
2. 手动运行表创建脚本
3. 重新部署以触发初始化

## 🔄 自动修复流程

### 立即修复步骤
1. **重新部署**：
   ```bash
   git commit --allow-empty -m "Force redeploy for database fix"
   git push origin main
   ```

2. **检查环境变量**：
   - 登录 Vercel Dashboard
   - 验证数据库连接字符串
   - 如需要，重新创建数据库连接

3. **验证修复**：
   ```bash
   # 等待部署完成后测试
   curl https://your-domain.com/api/health
   ```

### 预防措施
1. **定期监控**：
   ```bash
   # 设置定时任务
   */5 * * * * PRODUCTION_URL=https://your-domain.com node /path/to/scripts/monitor-production.js single
   ```

2. **告警设置**：
   - 配置 Vercel 集成告警
   - 设置健康检查失败通知

3. **备份方案**：
   - 准备备用数据库连接
   - 文档化回滚流程

## 📈 性能优化建议

### 数据库连接优化
1. 使用连接池（`DATABASE_URL`）
2. 配置非连接池连接（`DATABASE_URL_UNPOOLED`）用于长查询
3. 监控连接数使用情况

### API 响应优化
1. 添加适当的缓存策略
2. 优化数据库查询
3. 实现请求限流

### 监控和日志
1. 启用详细的数据库日志
2. 监控响应时间趋势
3. 设置性能告警阈值

## 📚 相关文档

- [数据库修复指南](./doc/DATABASE_FIX_GUIDE.md)
- [问题诊断文档](./TROUBLESHOOTING_DATABASE_CONNECTION.md)
- [Vercel Postgres 配置](./doc/VERCEL_POSTGRES_README.md)
- [联系表单系统说明](./doc/CONTACT_SYSTEM_README.md)

## 🆘 紧急联系

如果问题持续存在且影响生产环境，请：

1. **立即回滚**：
   ```bash
   # 回滚到上一个稳定版本
   git revert HEAD
   git push origin main
   ```

2. **收集信息**：
   - Vercel 部署日志截图
   - 健康检查响应
   - 环境变量配置（隐藏敏感信息）

3. **联系支持**：
   - 提供完整的错误信息
   - 包含诊断脚本输出
   - 说明已尝试的解决步骤

---

**最后更新**: 2024-12-19  
**版本**: 1.0  
**状态**: 生产就绪