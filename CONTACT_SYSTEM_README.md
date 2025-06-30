# 联系表单系统使用说明

## 🚀 功能概述

本系统实现了完整的联系表单功能，包括：

1. **前端表单提交** - 用户可以通过表单提交联系信息
2. **数据存储** - 使用SQLite数据库存储提交的数据
3. **后台管理** - 管理员可以查看和管理提交的数据
4. **API接口** - 提供RESTful API接口用于数据操作

## 📋 表单字段

根据设计图，表单包含以下字段：

- **姓名** (必填) - 用户姓名，2-20字符
- **手机号** (必填) - 中国手机号格式验证
- **电子邮件** (必填) - 邮箱格式验证
- **公司名称** (选填) - 最多100字符
- **咨询业务内容** (必填) - 详细描述，10-1000字符

## 🗄️ 数据库设计

### 表结构：contacts

| 字段名 | 类型 | 说明 |
|--------|------|------|
| id | INTEGER PRIMARY KEY | 自增主键 |
| name | VARCHAR(100) | 姓名 |
| phone | VARCHAR(20) | 手机号 |
| email | VARCHAR(100) | 邮箱 |
| company | VARCHAR(200) | 公司名称 |
| content | TEXT | 咨询内容 |
| created_at | DATETIME | 创建时间 |
| updated_at | DATETIME | 更新时间 |

## 🔌 API 接口

### 1. 提交联系表单
**POST** `/api/contact/submit`

**请求体：**
```json
{
  "name": "张三",
  "phone": "13800138000",
  "email": "zhangsan@example.com",
  "company": "ABC科技有限公司",
  "content": "希望了解贵公司的人工智能产品解决方案"
}
```

**响应：**
```json
{
  "success": true,
  "message": "提交成功，我们会尽快与您联系",
  "data": {
    "id": 1
  }
}
```

### 2. 查询联系数据
**GET** `/api/contact/list`

**查询参数：**
- `page` - 页码（默认：1）
- `pageSize` - 每页条数（默认：10）
- `name` - 姓名搜索
- `phone` - 手机号搜索
- `email` - 邮箱搜索
- `company` - 公司名称搜索
- `startDate` - 开始日期（YYYY-MM-DD）
- `endDate` - 结束日期（YYYY-MM-DD）

**响应：**
```json
{
  "success": true,
  "data": {
    "list": [...],
    "pagination": {
      "current": 1,
      "pageSize": 10,
      "total": 50,
      "totalPages": 5,
      "hasNext": true,
      "hasPrev": false
    }
  }
}
```

## 🎨 页面路由

### 用户页面
- `/contact` - 联系表单页面

### 管理员页面
- `/admin/contact` - 联系数据管理页面

## 🛠️ 技术栈

- **框架**: Next.js 15 (App Router)
- **UI组件**: Ant Design 5
- **数据库**: SQLite
- **样式**: CSS Modules
- **语言**: TypeScript

## 🚀 快速开始

### 1. 安装依赖
```bash
npm install
```

### 2. 启动开发服务器
```bash
npm run dev
```

### 3. 访问页面
- 联系表单：http://localhost:3000/contact
- 管理后台：http://localhost:3000/admin/contact

## 📁 文件结构

```
src/
├── app/
│   ├── api/contact/           # API路由
│   │   ├── submit/route.ts    # 提交接口
│   │   └── list/route.ts      # 查询接口
│   ├── admin/contact/         # 管理页面
│   │   ├── page.tsx
│   │   └── styles.module.css
│   └── contact/               # 用户表单页面
│       ├── page.tsx
│       └── styles.module.css
├── components/
│   └── ContactForm/           # 表单组件
│       ├── index.tsx
│       └── styles.module.css
├── lib/
│   └── database.ts            # 数据库配置
└── data/
    └── contact.db             # SQLite数据库文件
```

## ✅ 功能特性

### 前端特性
- ✅ 响应式设计，支持移动端
- ✅ 表单字段验证
- ✅ 提交成功/失败反馈
- ✅ 加载状态显示
- ✅ 美观的UI设计

### 后台特性
- ✅ 数据列表展示
- ✅ 多字段搜索
- ✅ 分页功能
- ✅ 日期范围筛选
- ✅ 详情查看
- ✅ 数据导出（可扩展）

### API特性
- ✅ 输入验证
- ✅ 错误处理
- ✅ 分页查询
- ✅ 模糊搜索
- ✅ 日期筛选

## 🔧 自定义配置

### 修改表单字段
编辑 `src/components/ContactForm/index.tsx` 中的表单项定义。

### 修改数据库表结构
编辑 `src/lib/database.ts` 中的 `initializeTables` 函数。

### 修改样式主题
编辑对应的 `.module.css` 文件中的CSS变量。

## 🔍 调试和测试

### 查看数据库
数据库文件位于 `data/contact.db`，可以使用SQLite工具查看。

### API测试
可以使用Postman或curl测试API接口。

### 错误排查
- 检查控制台错误信息
- 查看Network面板中的API请求
- 确认数据库文件权限

## 📝 注意事项

1. **数据安全**: 生产环境中应添加访问控制和数据加密
2. **性能优化**: 大量数据时考虑添加索引和查询优化
3. **备份**: 定期备份SQLite数据库文件
4. **监控**: 添加错误监控和日志记录

## 🎯 下一步扩展

- [ ] 添加数据导出功能
- [ ] 实现邮件通知
- [ ] 添加用户认证
- [ ] 数据统计报表
- [ ] 批量操作功能

---

**开发完成时间**: 2024年
**开发者**: AI Assistant
**使用中文规范**: 所有代码注释和文档均使用中文 