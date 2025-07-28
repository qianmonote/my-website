# Vercel Postgres 数据库配置指南

## 🎯 您的数据库配置

✅ **数据库名称**：`neon_contact_form_prod`  
✅ **数据库类型**：Neon Postgres（通过 Vercel Marketplace）  
✅ **状态**：已创建，等待配置使用  

### 🚀 快速开始
1. **环境变量**：Vercel 已自动注入数据库连接信息
2. **代码兼容**：项目代码已完全兼容，无需修改
3. **部署即用**：重新部署项目即可自动连接到您的数据库

---

## 🚀 概述

本项目现已支持 **Vercel Postgres (Neon)** 数据库，可以根据环境自动切换：
- **本地开发**：使用 SQLite 数据库
- **线上部署**：使用 Vercel Postgres (Neon) 数据库

## 📋 功能特性

✅ **自动环境检测**：根据环境变量自动选择数据库类型  
✅ **统一接口**：使用 `DatabaseAdapter` 提供统一的数据库操作接口  
✅ **无缝迁移**：现有代码无需修改，自动适配不同数据库  
✅ **类型安全**：完整的 TypeScript 类型支持  
✅ **错误处理**：完善的错误处理和日志记录  

## 🛠️ 技术架构

### 数据库适配器模式
```
src/lib/
├── database.ts          # 主数据库配置文件（SQLite + 适配器）
├── database-postgres.ts # Vercel Postgres 专用操作类
└── DatabaseAdapter      # 统一的数据库操作接口
```

### 环境检测逻辑
```typescript
const isVercelPostgres = () => {
  return process.env.POSTGRES_URL || process.env.VERCEL_ENV === 'production';
};
```

## 📝 数据库命名最佳实践

### 命名规则
根据 PostgreSQL 和 Vercel 的最佳实践，建议遵循以下命名规则：

#### 1. 基本规则
- **使用小写字母**：PostgreSQL 会将未引用的标识符转换为小写 <mcreference link="https://www.postgresql.org/docs/7.0/syntax525.htm" index="5">5</mcreference>
- **使用下划线分隔**：采用 snake_case 命名风格 <mcreference link="https://blog.api-fiddle.com/posts/naming-conventions-in-postgresql" index="2">2</mcreference>
- **避免特殊字符**：不使用空格、连字符或其他特殊符号
- **长度限制**：PostgreSQL 默认最大名称长度为 31 个字符 <mcreference link="https://www.postgresql.org/docs/7.0/syntax525.htm" index="5">5</mcreference>

#### 2. 推荐命名格式
```
{项目名称}_{环境标识}
```

#### 3. 环境标识建议
- `prod` 或 `production` - 生产环境
- `staging` 或 `stage` - 预发布环境
- `dev` 或 `development` - 开发环境
- `test` - 测试环境

#### 4. 命名示例
| 项目类型 | 推荐名称 | 说明 |
|---------|---------|------|
| 个人网站 | `my_website_prod` | 简洁明了 |
| 联系系统 | `contact_system_prod` | 描述性强 |
| 企业官网 | `company_site_prod` | 业务相关 |
| API 服务 | `api_service_prod` | 功能导向 |

#### 5. 避免的命名方式
❌ **不推荐**：
- `MyWebsite-Prod` (包含大写字母和连字符)
- `my website prod` (包含空格)
- `db_prod_2024_final_v2` (过于复杂)
- `prod` (缺乏描述性)

✅ **推荐**：
- `my_website_prod`
- `contact_form_prod`
- `user_management_prod`

## 🔧 配置步骤

### 1. 安装依赖
项目已自动安装 `@vercel/postgres` 依赖包。

### 2. 本地开发配置
本地开发时**无需任何配置**，系统会自动：
- 使用 SQLite 数据库
- 创建 `./data/contact.db` 文件
- 自动初始化数据表

### 3. Vercel 线上部署配置

#### 步骤 1：创建 Vercel Postgres 数据库
1. 登录 [Vercel Dashboard](https://vercel.com/dashboard)
2. 进入你的项目
3. 点击 "Storage" 选项卡
4. 点击 "Create Database"
5. 选择 "Postgres"
6. 填写数据库名称并创建

**数据库命名建议：**
- 使用小写字母和下划线（snake_case）
- 包含项目名称和环境标识
- 推荐格式：`{项目名}_{环境}`
- 示例：`my_website_prod`、`contact_system_production`、`website_db_prod`
- 避免使用特殊字符、空格和大写字母

#### 步骤 2：配置环境变量
Vercel 会自动为你的项目添加以下环境变量：
```bash
POSTGRES_URL="postgres://username:password@host:port/database"
POSTGRES_PRISMA_URL="postgres://username:password@host:port/database?pgbouncer=true&connect_timeout=15"
POSTGRES_URL_NON_POOLING="postgres://username:password@host:port/database"
POSTGRES_USER="username"
POSTGRES_HOST="host"
POSTGRES_PASSWORD="password"
POSTGRES_DATABASE="database"
```

#### 步骤 3：部署项目
```bash
# 提交代码
git add .
git commit -m "feat: 添加 Vercel Postgres 支持"
git push

# Vercel 会自动部署
```

## 📊 数据表结构

### contacts 表
| 字段名 | 类型 | 说明 |
|--------|------|------|
| id | SERIAL/INTEGER PRIMARY KEY | 自增主键 |
| name | VARCHAR(100) | 姓名 |
| phone | VARCHAR(20) | 手机号 |
| email | VARCHAR(100) | 邮箱 |
| company | VARCHAR(200) | 公司名称 |
| content | TEXT | 咨询内容 |
| created_at | TIMESTAMP/DATETIME | 创建时间 |
| updated_at | TIMESTAMP/DATETIME | 更新时间 |

### users 表
| 字段名 | 类型 | 说明 |
|--------|------|------|
| id | SERIAL/INTEGER PRIMARY KEY | 自增主键 |
| username | VARCHAR(50) | 用户名 |
| password | VARCHAR(100) | 密码 |
| created_at | TIMESTAMP/DATETIME | 创建时间 |

## 🔌 API 使用方式

### 统一的数据库操作接口
```typescript
import { DatabaseAdapter } from '@/lib/database';

// 插入联系表单数据
const result = await DatabaseAdapter.insertContact({
  name: '张三',
  phone: '13800138000',
  email: 'zhangsan@example.com',
  company: 'ABC公司',
  content: '咨询内容'
});

// 查询联系表单数据
const data = await DatabaseAdapter.queryContacts({
  page: 1,
  pageSize: 10,
  name: '张三'
});

// 根据ID查询
const contact = await DatabaseAdapter.getContactById(1);

// 删除数据
const success = await DatabaseAdapter.deleteContact(1);

// 用户认证
const user = await DatabaseAdapter.authenticateUser('admin', 'password');
```

## 🚦 环境检测

系统会根据以下条件自动选择数据库：

### 使用 Vercel Postgres 的条件
- 存在 `POSTGRES_URL` 环境变量
- 或者 `VERCEL_ENV` 等于 `'production'`

### 使用 SQLite 的条件
- 不满足上述条件时（通常是本地开发环境）

## 📝 数据迁移

### 从 SQLite 迁移到 Vercel Postgres

如果你需要将本地 SQLite 数据迁移到 Vercel Postgres：

1. **导出 SQLite 数据**
```bash
# 导出为 SQL 文件
sqlite3 ./data/contact.db .dump > backup.sql
```

2. **转换 SQL 语法**
需要将 SQLite 语法转换为 PostgreSQL 语法：
- `INTEGER PRIMARY KEY AUTOINCREMENT` → `SERIAL PRIMARY KEY`
- `DATETIME` → `TIMESTAMP`
- 其他语法差异

3. **导入到 Vercel Postgres**
使用 Vercel Dashboard 的数据库管理工具或 psql 命令行工具导入数据。

## 🔍 调试和监控

### 查看当前使用的数据库类型
```typescript
const isPostgres = process.env.POSTGRES_URL || process.env.VERCEL_ENV === 'production';
console.log('当前数据库类型:', isPostgres ? 'Vercel Postgres' : 'SQLite');
```

### 错误日志
所有数据库操作都包含详细的错误日志，便于调试：
```typescript
try {
  await DatabaseAdapter.insertContact(data);
} catch (error) {
  console.error('数据库操作失败:', error);
}
```

## ⚡ 性能优化

### Vercel Postgres 优化建议
1. **连接池**：使用 `POSTGRES_PRISMA_URL` 获得连接池支持
2. **查询优化**：为常用查询字段添加索引
3. **分页查询**：避免一次性查询大量数据
4. **缓存策略**：对于不经常变化的数据考虑添加缓存

### SQLite 优化建议
1. **WAL 模式**：提高并发性能
2. **索引优化**：为查询字段添加合适的索引
3. **定期备份**：定期备份 SQLite 数据库文件

## 🛡️ 安全考虑

1. **环境变量安全**：确保数据库连接信息不会泄露到客户端
2. **SQL 注入防护**：使用参数化查询
3. **访问控制**：在生产环境中添加适当的访问控制
4. **数据加密**：敏感数据考虑加密存储

## 🔄 版本兼容性

- **Next.js**: 15.3.3+
- **Node.js**: 18+
- **TypeScript**: 5+
- **@vercel/postgres**: 最新版本

## 📚 相关文档

- [Vercel Postgres 官方文档](https://vercel.com/docs/storage/vercel-postgres)
- [Next.js 数据库集成](https://nextjs.org/docs/app/building-your-application/data-fetching)
- [SQLite 文档](https://www.sqlite.org/docs.html)

## 🎯 未来扩展

- [ ] 添加数据库连接池配置
- [ ] 实现自动数据迁移脚本
- [ ] 添加数据库性能监控
- [ ] 支持读写分离
- [ ] 添加数据备份策略

---

**配置完成时间**: 2024年  
**开发者**: AI Assistant  
**技术支持**: Vercel Postgres + SQLite 双数据库支持