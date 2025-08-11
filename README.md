# 企业官网项目

[中文](./README.md) | [English](./README_EN.md)

这是一个基于 [Next.js](https://nextjs.org) 构建的现代化企业官网项目，支持多语言、响应式设计和完整的联系表单系统。专为 ONETOUCH AGRI ROBOTECH SDN. BHD. 打造，展示公司的绿色科技生态系统和创新解决方案。

## ✨ 主要特性

- 🚀 **Next.js 15** - 最新的 React 框架
- 🎨 **Ant Design 5** - 企业级 UI 组件库
- 🌍 **多语言支持** - 中英文切换
- 📱 **响应式设计** - 完美适配移动端
- 💾 **双数据库支持** - SQLite (本地) + Vercel Postgres (线上)
- 📋 **联系表单系统** - 完整的数据收集和管理
- 🛡️ **TypeScript** - 类型安全

## 🗄️ 数据库支持

项目支持自动环境检测的双数据库架构：

- **本地开发**: 自动使用 SQLite 数据库
- **线上部署**: 自动使用 Vercel Postgres 数据库

详细配置请参考：[Vercel Postgres 配置指南](./doc/VERCEL_POSTGRES_README.md)

### 3. 访问应用

打开 [http://localhost:3000](http://localhost:3000) 查看网站。

- 联系表单页面：[http://localhost:3000/contact](http://localhost:3000/contact)
- 管理后台：[http://localhost:3000/admin/contact](http://localhost:3000/admin/contact)

## 📁 项目结构

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API 路由
│   │   └── contact/       # 联系表单 API
│   ├── admin/             # 管理后台
│   ├── about/             # 关于我们页面
│   └── products/          # 产品页面
├── components/            # React 组件
│   ├── Navbar/           # 导航栏
│   ├── Footer/           # 页脚
│   ├── Banner/           # 轮播图
│   └── elements/         # 通用组件
├── lib/                  # 工具库
│   ├── database.ts       # 数据库配置
│   └── database-postgres.ts # Vercel Postgres 支持
└── config/               # 配置文件
    └── locales/          # 多语言配置
```

## 🔧 环境配置

### 本地开发
本地开发无需任何数据库配置，系统会自动：
- 创建 SQLite 数据库文件 `./data/contact.db`
- 初始化数据表结构
- 创建默认管理员账号 (admin/admin123)

### 生产环境部署

1. **创建 Vercel Postgres 数据库**
   - 在 Vercel Dashboard 中创建 Postgres 数据库
   - Vercel 会自动配置环境变量

2. **部署到 Vercel**
   ```bash
   git push origin main
   ```
   
   系统会自动检测环境并使用 Vercel Postgres。

## 📋 功能模块

### 联系表单系统
- ✅ 表单数据验证
- ✅ 数据存储和管理
- ✅ 后台数据查看
- ✅ 分页和搜索功能

### 多语言支持
- ✅ 中英文切换
- ✅ 动态语言加载
- ✅ SEO 友好的 URL

### 响应式设计
- ✅ 移动端优化
- ✅ 触摸友好的交互
- ✅ 自适应布局

## 📚 相关文档

- [联系表单系统说明](./doc/CONTACT_SYSTEM_README.md)
- [国际化指南](./doc/INTERNATIONALIZATION_GUIDE.md)
- [Vercel Postgres 配置指南](./doc/VERCEL_POSTGRES_README.md)
- [移动端优化说明](./doc/MOBILE_OPTIMIZATION_README.md)
- [团队交互功能说明](./doc/TEAM_INTERACTION_README.md)
- [数据库修复指南](./doc/DATABASE_FIX_GUIDE.md)

## 🛠️ 技术栈

- **前端框架**: Next.js 15 (App Router)
- **UI 组件**: Ant Design 5
- **样式方案**: CSS Modules
- **开发语言**: TypeScript
- **数据库**: SQLite + Vercel Postgres
- **部署平台**: Vercel

## 🚀 部署指南

### Vercel 部署（推荐）

1. **连接 GitHub 仓库**
   - 在 Vercel Dashboard 中导入项目
   - 连接你的 GitHub 仓库

2. **配置数据库**
   - 创建 Vercel Postgres 数据库
   - 环境变量会自动配置

3. **部署**
   - 每次 push 到 main 分支会自动部署
   - 首次部署会自动初始化数据库表

### 其他平台部署

如需部署到其他平台，请确保：
- 配置 `POSTGRES_URL` 环境变量
- 或保持使用 SQLite（需要持久化存储）

## 🔍 开发指南

### 添加新页面
```bash
# 在 src/app 目录下创建新的路由文件夹
mkdir src/app/new-page
touch src/app/new-page/page.tsx
```

### 修改数据库结构
1. 更新 `src/lib/database.ts` 中的表结构
2. 更新 `src/lib/database-postgres.ts` 中的对应结构
3. 重新部署以应用更改

### 添加新的 API 接口
```bash
# 在 src/app/api 目录下创建新的 API 路由
mkdir src/app/api/new-endpoint
touch src/app/api/new-endpoint/route.ts
```

### 多语言开发
1. 在 `src/config/locales/zh/common.json` 和 `src/config/locales/en/common.json` 中添加翻译
2. 在组件中使用 `useI18n` Hook：
   ```typescript
   import { useI18n } from '../context/I18nContext';
   
   function MyComponent() {
     const { t } = useI18n();
     return <h1>{t('title')}</h1>;
   }
   ```

### 样式开发
- 使用 CSS Modules 进行样式隔离
- 遵循 Ant Design 设计规范
- 确保移动端响应式适配

### 环境变量配置
创建 `.env.local` 文件（本地开发）：
```env
# 可选：自定义数据库路径
DATABASE_PATH=./data/custom.db

# 生产环境会自动使用 Vercel Postgres
# POSTGRES_URL=your_postgres_connection_string
```

## 🤝 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🔧 故障排除

### 常见问题

**1. 数据库连接失败**
- 检查 `data` 目录是否存在写入权限
- 确认 SQLite 文件路径正确
- 生产环境检查 `POSTGRES_URL` 环境变量

**2. 多语言切换不生效**
- 确认组件被 `I18nProvider` 包装
- 检查翻译文件格式是否正确
- 验证翻译键是否存在

**3. 样式问题**
- 清除浏览器缓存
- 检查 CSS Modules 类名是否正确
- 确认 Ant Design 主题配置

**4. API 接口错误**
- 检查请求方法和路径
- 验证请求参数格式
- 查看服务器日志

### 性能优化

- 使用 Next.js 图片优化组件
- 启用静态生成 (SSG) 适合的页面
- 合理使用客户端和服务端组件
- 优化数据库查询

## 📞 技术支持

如有问题或建议，请：
- 创建 [Issue](../../issues)
- 发送邮件至技术支持
- 查看项目文档
- 参考故障排除指南

## 🔄 更新日志

### v1.0.0 (2024-12-19)
- ✅ 初始版本发布
- ✅ 完整的多语言支持
- ✅ 响应式设计实现
- ✅ 联系表单系统
- ✅ 双数据库架构
- ✅ Vercel 部署支持

---

**开发团队**: ONETOUCH Development Team  
**最后更新**: 2024年12月19日  
**版本**: 1.0.0  
**许可证**: MIT
