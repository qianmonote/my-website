# 线上环境数据库连接失败修复指南

## 问题分析

根据代码分析，线上环境的500错误主要出现在以下三个位置：

### 1. 数据库初始化失败 (第120-135行)
```typescript
try {
  await initializeDatabase();
} catch (error) {
  console.error("数据库初始化失败:", error);
  return NextResponse.json({
    flag: 0,
    msg: "数据库连接失败，请稍后重试",
  }, { status: 500 });
}
```

### 2. 数据插入失败 (第137-165行)
```typescript
try {
  const result = await DatabaseAdapter.insertContact({...});
} catch (error) {
  console.error("数据插入失败:", error);
  return NextResponse.json({
    flag: 0,
    msg: "保存数据失败，请稍后重试",
  }, { status: 500 });
}
```

### 3. 一般服务器错误 (第166-180行)
```typescript
catch (error) {
  console.error("联系表单提交错误:", error);
  return NextResponse.json({
    flag: 0,
    msg: "服务器错误，请稍后重试",
  }, { status: 500 });
}
```

## 根本原因

### Vercel Postgres 环境变量问题

生产环境使用 Vercel Postgres，需要以下环境变量：
- `POSTGRES_URL`
- `DATABASE_URL` 
- `VERCEL_ENV=production`

当这些环境变量缺失或配置错误时，会导致：
1. `@vercel/postgres` 的 `sql` 函数无法连接数据库
2. `initializeDatabase()` 抛出异常
3. API 返回500错误

## 修复方案

### 方案1：检查 Vercel 项目配置

1. **登录 Vercel Dashboard**
   ```bash
   # 检查当前项目
   npx vercel env ls
   ```

2. **确认数据库实例状态**
   - 进入 Vercel 项目 → Storage → Postgres
   - 确认数据库实例正在运行
   - 检查连接字符串是否正确

3. **重新部署触发环境变量更新**
   ```bash
   git commit --allow-empty -m "trigger redeploy for env vars"
   git push origin main
   ```

### 方案2：增强错误处理和重试机制

创建更健壮的数据库连接逻辑：

```typescript
// 在 database-postgres.ts 中添加重试逻辑
static async initializeTablesWithRetry(maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      await this.initializeTables();
      return;
    } catch (error) {
      console.error(`数据库初始化失败 (尝试 ${i + 1}/${maxRetries}):`, error);
      if (i === maxRetries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
}
```

### 方案3：添加详细的错误日志

在 API 路由中添加更详细的错误信息：

```typescript
// 在 route.ts 中增强错误处理
try {
  await initializeDatabase();
} catch (error) {
  console.error("数据库初始化详细错误:", {
    error: error.message,
    stack: error.stack,
    env: {
      POSTGRES_URL: !!process.env.POSTGRES_URL,
      DATABASE_URL: !!process.env.DATABASE_URL,
      VERCEL_ENV: process.env.VERCEL_ENV
    }
  });
  // ... 返回错误响应
}
```

## 立即执行的修复步骤

### 1. 检查生产环境状态
```bash
# 检查部署状态
npx vercel ls

# 检查环境变量
npx vercel env ls

# 查看最新部署日志
npx vercel logs
```

### 2. 重新创建数据库连接
```bash
# 如果数据库实例有问题，重新创建
npx vercel env rm DATABASE_URL
npx vercel env rm POSTGRES_URL

# 在 Vercel Dashboard 中重新创建 Postgres 实例
# 环境变量会自动配置
```

### 3. 强制重新部署
```bash
git add .
git commit -m "fix: enhance database connection error handling"
git push origin main
```

### 4. 验证修复
```bash
# 测试生产环境 API
curl -X POST https://your-domain.com/api/contact/submit \
  -H "Content-Type: application/json" \
  -d '{
    "name": "测试用户",
    "phone": "13800138000", 
    "email": "test@example.com",
    "company": "测试公司",
    "content": "数据库连接测试"
  }'
```

## 监控和预防

### 1. 添加健康检查端点监控
```bash
# 定期检查健康状态
curl https://your-domain.com/api/health
```

### 2. 设置 Vercel 监控告警
- 在 Vercel Dashboard 中配置错误告警
- 监控数据库连接状态
- 设置响应时间阈值

### 3. 日志分析
```bash
# 查看实时日志
npx vercel logs --follow

# 过滤错误日志
npx vercel logs | grep -i error
```

## 常见问题排查

### Q: 环境变量存在但仍然连接失败
A: 检查 Vercel Postgres 实例是否正常运行，可能需要重启实例

### Q: 本地正常但生产环境失败
A: 确认生产环境使用的是 Postgres 而不是 SQLite，检查 `isVercelPostgres()` 函数逻辑

### Q: 间歇性连接失败
A: 可能是数据库连接池问题，考虑添加连接重试机制

## 联系支持

如果问题持续存在：
1. 收集 Vercel 部署日志
2. 记录具体的错误信息
3. 提供数据库配置截图
4. 联系 Vercel 技术支持

---

**最后更新**: 2025-07-28  
**状态**: 待验证修复效果