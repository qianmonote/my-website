# 联系表单提交500错误解决方案

## 问题描述

用户报告 `/api/contact/submit` 端点返回500错误。经过分析，这个问题主要出现在生产环境中，本地开发环境运行正常。

## 错误分析

### 可能的原因

1. **数据库连接问题**（最常见）
   - 生产环境缺少 Postgres 数据库配置
   - 数据库连接字符串错误
   - 数据库实例未启动或不可访问

2. **环境变量配置问题**
   - `DATABASE_URL` 或 `POSTGRES_URL` 未正确设置
   - Vercel 环境变量配置缺失

3. **数据库初始化失败**
   - 数据表不存在
   - 数据库权限问题

4. **代码逻辑错误**
   - 未捕获的异常
   - 依赖包问题

## 诊断步骤

### 1. 使用诊断工具

我们提供了专门的诊断脚本来快速定位问题：

```bash
# 诊断生产环境（替换为实际域名）
node scripts/diagnose-500-error.js https://your-domain.com

# 或使用环境变量
PRODUCTION_URL=https://your-domain.com node scripts/diagnose-500-error.js
```

### 2. 检查本地环境

首先确认本地环境正常：

```bash
# 启动开发服务器
npm run dev

# 在另一个终端测试本地API
node scripts/test-contact-submit.js --local
```

### 3. 检查健康状态

```bash
# 检查生产环境健康状态
curl https://your-domain.com/api/health

# 获取详细诊断信息
curl -X POST https://your-domain.com/api/health
```

## 解决方案

### 方案1: 修复数据库连接配置

#### 步骤1: 检查 Vercel 数据库配置

1. 登录 [Vercel Dashboard](https://vercel.com/dashboard)
2. 进入你的项目
3. 点击 **Storage** 标签
4. 检查是否有 Postgres 数据库实例

#### 步骤2: 配置数据库连接

如果没有数据库：

1. 在 Storage 页面点击 **Create Database**
2. 选择 **Postgres**
3. 创建数据库实例
4. Vercel 会自动配置环境变量

如果有数据库但连接失败：

1. 进入 **Settings** → **Environment Variables**
2. 确认以下变量存在且正确：
   - `DATABASE_URL`
   - `POSTGRES_URL`（可选）
   - `DATABASE_URL_UNPOOLED`（可选）

#### 步骤3: 重新部署

```bash
# 提交并推送代码触发重新部署
git add .
git commit -m "fix: 修复数据库连接配置"
git push origin main
```

### 方案2: 手动配置环境变量

如果自动配置失败，可以手动设置：

1. 在 Vercel Dashboard 中进入项目设置
2. 点击 **Environment Variables**
3. 添加以下变量：

```
DATABASE_URL=postgresql://username:password@host:port/database
POSTGRES_URL=postgresql://username:password@host:port/database
```

### 方案3: 代码层面的修复

如果问题不是数据库配置，可能需要代码修复：

#### 增强错误处理

在 `src/app/api/contact/submit/route.ts` 中添加更详细的错误日志：

```typescript
// 在数据库初始化部分
try {
  await initializeDatabase();
} catch (error) {
  console.error("数据库初始化详细错误:", {
    error: error.message,
    stack: error.stack,
    environment: {
      POSTGRES_URL: !!process.env.POSTGRES_URL,
      DATABASE_URL: !!process.env.DATABASE_URL,
      VERCEL_ENV: process.env.VERCEL_ENV,
      NODE_ENV: process.env.NODE_ENV
    }
  });
  return NextResponse.json(
    {
      flag: 0,
      msg: "数据库连接失败，请稍后重试",
    },
    {
      status: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
}
```

#### 添加重试机制

```typescript
// 数据库操作重试函数
async function retryDatabaseOperation(operation, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation();
    } catch (error) {
      console.error(`数据库操作失败 (尝试 ${i + 1}/${maxRetries}):`, error.message);
      if (i === maxRetries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
}
```

## 验证修复

### 1. 自动化测试

```bash
# 运行完整的联系表单测试
PRODUCTION_URL=https://your-domain.com node scripts/test-contact-submit.js

# 运行生产环境诊断
node scripts/diagnose-500-error.js https://your-domain.com
```

### 2. 手动测试

```bash
# 测试联系表单提交
curl -X POST https://your-domain.com/api/contact/submit \
  -H "Content-Type: application/json" \
  -d '{
    "name": "测试用户",
    "phone": "13800138000",
    "email": "test@example.com",
    "company": "测试公司",
    "content": "测试消息"
  }'
```

期望响应：
```json
{
  "flag": 1,
  "data": {
    "id": 123
  },
  "msg": "提交成功，我们会尽快与您联系"
}
```

### 3. 前端测试

1. 访问网站的联系表单页面
2. 填写并提交表单
3. 确认收到成功提示
4. 在管理后台检查数据是否正确保存

## 监控和预防

### 1. 设置监控

```bash
# 启动持续监控（可选）
PRODUCTION_URL=https://your-domain.com node scripts/monitor-production.js monitor
```

### 2. 定期健康检查

在 CI/CD 流程中添加健康检查：

```yaml
# .github/workflows/health-check.yml
name: Health Check
on:
  schedule:
    - cron: '0 */6 * * *'  # 每6小时检查一次
  workflow_dispatch:

jobs:
  health-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Check API Health
        run: |
          curl -f https://your-domain.com/api/health || exit 1
          curl -f -X POST https://your-domain.com/api/contact/submit \
            -H "Content-Type: application/json" \
            -d '{"name":"Health Check","phone":"13800138000","email":"health@example.com","company":"CI","content":"Automated health check"}' || exit 1
```

## 常见问题

### Q: 本地正常但生产环境500错误

**A:** 这通常是数据库配置问题。本地使用 SQLite，生产环境使用 Postgres。检查 Vercel 的数据库配置。

### Q: 间歇性500错误

**A:** 可能是数据库连接池问题或网络不稳定。考虑添加重试机制和连接池配置。

### Q: 错误信息不够详细

**A:** 在代码中添加更详细的错误日志，并检查 Vercel 的 Functions 日志。

## 相关文档

- [生产环境数据库验证指南](./PRODUCTION_DATABASE_VERIFICATION.md)
- [数据库连接问题排查](./TROUBLESHOOTING_DATABASE_CONNECTION.md)
- [Vercel Postgres 配置指南](./doc/VERCEL_POSTGRES_README.md)
- [联系系统文档](./doc/CONTACT_SYSTEM_README.md)

## 联系支持

如果问题仍然存在，请提供以下信息：

1. 诊断工具的完整输出
2. Vercel 部署日志截图
3. 环境变量配置截图（隐藏敏感信息）
4. 具体的错误复现步骤

---

**创建时间**: 2024-12-19  
**最后更新**: 2024-12-19  
**状态**: 已验证