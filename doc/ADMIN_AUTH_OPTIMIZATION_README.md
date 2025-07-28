# 管理员认证系统优化

## 功能概述

本次优化为管理员系统添加了以下两个重要功能：

1. **自动退出登录机制** - 长时间不操作自动退出登录
2. **单点登录限制** - 一个账号不能同时在多个地方登录

## 功能详情

### 1. 自动退出登录机制

#### 实现原理
- **非活跃超时**: 30分钟无任何操作自动退出
- **会话过期**: 登录后2小时强制过期
- **活动检测**: 监听鼠标、键盘、滚动等用户活动
- **定时检查**: 每5分钟检查一次登录状态

#### 监听的用户活动
- 鼠标移动 (mousemove)
- 鼠标点击 (mousedown, click)
- 键盘输入 (keypress)
- 页面滚动 (scroll)
- 触摸操作 (touchstart)

#### 自动退出触发条件
- 30分钟内无任何用户活动
- 会话token过期
- 会话在数据库中被删除

### 2. 单点登录限制

#### 实现原理
- **会话管理**: 使用数据库存储用户会话信息
- **强制退出**: 新登录会删除该用户的所有旧会话
- **唯一性保证**: 每个用户同时只能有一个有效会话

#### 会话信息包含
- 用户ID和用户名
- 唯一会话token
- 创建时间和过期时间
- 最后活动时间
- 客户端IP地址
- 用户代理信息

## 技术实现

### 数据库表结构

#### user_sessions 表
```sql
CREATE TABLE user_sessions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  username TEXT NOT NULL,
  session_token TEXT UNIQUE NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  last_activity DATETIME DEFAULT CURRENT_TIMESTAMP,
  expires_at DATETIME NOT NULL,
  ip_address TEXT,
  user_agent TEXT
);
```

### API 接口

#### 1. 登录接口 `/api/auth/login`
- **功能**: 用户登录认证
- **新增逻辑**:
  - 检查并删除用户的旧会话
  - 生成新的session token
  - 设置2小时过期时间
  - 记录客户端信息

#### 2. 登录检查接口 `/api/auth/check`
- **功能**: 验证登录状态
- **新增逻辑**:
  - 验证session token有效性
  - 检查非活跃超时
  - 更新最后活动时间
  - 自动清理过期会话

#### 3. 退出登录接口 `/api/auth/logout`
- **功能**: 手动退出登录
- **逻辑**:
  - 删除数据库中的会话记录
  - 清除所有相关cookies

### 前端组件

#### useAutoLogout Hook
- **位置**: `/src/hooks/useAutoLogout.ts`
- **功能**:
  - 监听用户活动
  - 定时检查登录状态
  - 自动更新活动时间
  - 提供手动退出功能

#### 用户界面优化
- 在管理页面右上角显示用户名
- 提供下拉菜单退出登录
- 自动退出时显示友好提示

## 安全特性

### 1. Session Token 安全
- 使用 crypto.randomBytes(32) 生成随机token
- HttpOnly cookie 防止XSS攻击
- SameSite=Lax 防止CSRF攻击
- 生产环境启用 Secure 标志

### 2. 自动清理机制
- 定期清理过期会话
- 登录时强制清理旧会话
- 防止会话泄露和积累

### 3. 中间件保护
- 页面级别的认证检查
- 未登录自动重定向
- 防止直接访问管理页面

## 配置参数

### 超时设置
```typescript
// 非活跃超时（毫秒）
const INACTIVITY_TIMEOUT = 30 * 60 * 1000; // 30分钟

// 会话过期时间（毫秒）
const SESSION_EXPIRE = 2 * 60 * 60 * 1000; // 2小时

// 检查间隔（毫秒）
const CHECK_INTERVAL = 5 * 60 * 1000; // 5分钟
```

### 监听事件
```typescript
const ACTIVITY_EVENTS = [
  'mousedown', 'mousemove', 'keypress', 
  'scroll', 'touchstart', 'click'
];
```

## 使用说明

### 管理员账户
- **默认账户**: admin
- **默认密码**: admin123
- **建议**: 首次登录后修改密码

### 登录行为
1. 输入用户名密码登录
2. 系统检查是否有其他活跃会话
3. 如有旧会话，自动强制退出
4. 创建新会话，设置2小时过期
5. 开始监听用户活动

### 自动退出场景
1. **30分钟无操作**: 显示"长时间未操作，已自动退出登录"
2. **会话过期**: 显示"会话已过期，请重新登录"
3. **其他地方登录**: 当前会话被强制退出

### 手动退出
- 点击右上角用户名
- 选择"退出登录"
- 系统清理会话并跳转到登录页

## 注意事项

1. **数据库依赖**: 需要SQLite数据库支持
2. **Cookie依赖**: 需要浏览器支持cookie
3. **时间同步**: 服务器时间需要准确
4. **网络稳定**: 定时检查需要网络连接

## 故障排除

### 常见问题

1. **频繁自动退出**
   - 检查系统时间是否正确
   - 确认网络连接稳定
   - 查看浏览器cookie设置

2. **无法登录**
   - 检查数据库连接
   - 确认用户表是否存在
   - 查看控制台错误信息

3. **会话冲突**
   - 清除浏览器cookie
   - 重启应用服务
   - 检查数据库会话表

### 调试信息
- 查看浏览器开发者工具的Network标签
- 检查cookie中的session信息
- 查看控制台的错误日志

## 更新日志

### v1.0.0 (当前版本)
- ✅ 实现30分钟非活跃自动退出
- ✅ 实现单点登录限制
- ✅ 添加会话管理数据库表
- ✅ 优化用户界面和体验
- ✅ 添加安全防护机制
- ✅ 完善错误处理和提示