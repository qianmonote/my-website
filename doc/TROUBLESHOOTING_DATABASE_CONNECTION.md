# 数据库连接失败问题诊断与解决方案

## 问题描述
用户报告："线上数据库连接失败，请稍后重试"

## 问题分析

### 1. 本地环境状态 ✅
- 本地开发环境数据库连接正常
- SQLite 数据库文件存在：`/data/contact.db`
- API 接口在本地环境返回 200 状态码
- 环境检测日志显示：使用本地 SQLite 数据库

### 2. 可能的线上问题 ⚠️
根据代码分析，线上环境可能存在以下问题：

#### A. 环境变量配置问题
- **POSTGRES_URL** 或 **DATABASE_URL** 未正确设置
- Vercel Postgres 数据库连接字符串无效
- 环境变量在部署时未正确传递

#### B. Vercel Postgres 数据库状态
- 数据库实例可能处于休眠状态
- 数据库连接池已满
- 网络连接超时

#### C. 数据库初始化问题
- 数据表未正确创建
- 权限配置错误
- 数据库版本兼容性问题

## 解决方案

### 方案 1：检查 Vercel 环境变量

1. **登录 Vercel Dashboard**
   - 访问：https://vercel.com/dashboard
   - 找到项目：`fe-onetouch-pc`

2. **检查环境变量**
   - 进入项目 → Settings → Environment Variables
   - 确认以下变量存在且有值：
     - `DATABASE_URL`
     - `POSTGRES_URL`（可选）
     - `DATABASE_URL_UNPOOLED`（可选）

3. **如果环境变量缺失**
   - 重新创建 Vercel Postgres 数据库
   - 或手动添加数据库连接字符串

### 方案 2：重新部署应用

1. **强制重新部署**
   ```bash
   # 方法1：推送代码触发部署
   git commit --allow-empty -m "Force redeploy to fix database connection"
   git push origin main
   
   # 方法2：在 Vercel Dashboard 手动重新部署
   # 进入项目 → Deployments → 点击最新部署 → Redeploy
   ```

2. **检查部署日志**
   - 在 Vercel Dashboard 查看部署日志
   - 查找数据库连接相关的错误信息
   - 确认环境检测日志：
     ```
     数据库环境检测: {
       POSTGRES_URL: true,
       DATABASE_URL: true,
       VERCEL_ENV: 'production',
       usePostgres: true
     }
     使用 Vercel Postgres 数据库
     ```

### 方案 3：数据库状态检查

1. **检查 Vercel Postgres 状态**
   - 在 Vercel Dashboard → Storage 标签
   - 确认数据库状态为 "Active"
   - 检查连接数和使用情况

2. **测试数据库连接**
   - 使用 Vercel 提供的数据库管理工具
   - 或通过 SQL 客户端直接连接测试

### 方案 4：应急回滚方案

如果问题持续存在，可以临时使用以下方案：

1. **修改环境检测逻辑**
   - 临时禁用 Vercel Postgres
   - 强制使用 SQLite（需要持久化存储支持）

2. **使用外部数据库**
   - 配置其他 PostgreSQL 服务（如 Railway、Supabase）
   - 更新环境变量指向新的数据库

## 监控和预防

### 1. 添加健康检查接口
创建 `/api/health` 接口用于监控数据库状态：

```typescript
// src/app/api/health/route.ts
export async function GET() {
  try {
    await initializeDatabase();
    return NextResponse.json({ status: 'ok', database: 'connected' });
  } catch (error) {
    return NextResponse.json(
      { status: 'error', database: 'disconnected', error: error.message },
      { status: 500 }
    );
  }
}
```

### 2. 增强错误日志
在数据库连接失败时记录更详细的错误信息：

```typescript
console.error('数据库连接详细错误:', {
  error: error.message,
  stack: error.stack,
  environment: {
    POSTGRES_URL: !!process.env.POSTGRES_URL,
    DATABASE_URL: !!process.env.DATABASE_URL,
    VERCEL_ENV: process.env.VERCEL_ENV
  }
});
```

### 3. 设置监控告警
- 使用 Vercel Analytics 监控 API 错误率
- 配置 Slack/邮件通知
- 定期检查数据库连接状态

## 验证步骤

完成修复后，请按以下步骤验证：

1. **API 接口测试**
   ```bash
   curl -X POST https://your-domain.com/api/contact/list \
     -H "Content-Type: application/json" \
     -d '{"page": 1, "pageSize": 10}'
   ```

2. **预期响应**
   ```json
   {
     "flag": 1,
     "data": {
       "list": [],
       "pagination": {
         "current": 1,
         "pageSize": 10,
         "total": 0,
         "totalPages": 0,
         "hasNext": false,
         "hasPrev": false
       }
     }
   }
   ```

3. **前端功能测试**
   - 访问联系表单页面
   - 提交测试数据
   - 检查管理后台数据显示

## 联系支持

如果问题仍然存在，请提供以下信息：

1. Vercel 部署日志截图
2. 环境变量配置截图（隐藏敏感信息）
3. API 错误响应详情
4. 数据库状态截图

---

**创建时间**: 2024-12-19  
**最后更新**: 2024-12-19  
**状态**: 待验证