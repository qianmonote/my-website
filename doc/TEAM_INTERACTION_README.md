# 团队组件交互功能说明

## 功能概述

团队组件现在支持响应式的详情展示功能，根据屏幕尺寸自动选择最适合的交互方式：

- **桌面端（>738px）**：点击卡片弹出模态框展示详情
- **移动端（≤738px）**：点击卡片从底部侧滑展示详情

## 实现特性

### 1. 响应式交互
- 使用 `useMobileOptimization` hook 检测屏幕尺寸
- 738px 作为桌面端和移动端的分界点
- 自动选择最适合的展示方式

### 2. 桌面端模态框
- 使用 Ant Design 的 `Modal` 组件
- 居中显示，宽度 600px
- 支持点击遮罩层关闭
- 自定义深色主题样式

### 3. 移动端底部侧滑
- 使用 Ant Design 的 `Drawer` 组件
- 从底部滑出，高度占屏幕 85%
- 支持手势关闭
- 优化移动端触摸体验

### 4. 丰富的详情内容
每个团队成员包含以下信息：
- **基本信息**：姓名、职位、公司、角色
- **个人简介**：详细的专业背景介绍
- **专业领域**：技能标签展示
- **工作经验**：工作经历列表
- **教育背景**：学历信息
- **联系方式**：邮箱、LinkedIn、电话

### 5. 交互反馈
- **桌面端**：鼠标悬停时卡片上移效果
- **移动端**：点击时缩放反馈
- 平滑的过渡动画
- 视觉反馈增强用户体验

## 文件结构

```
src/components/Team/
├── index.tsx              # 主组件
├── index.css              # 基础样式
├── TeamDetailModal.tsx    # 详情模态框组件
└── TeamDetailModal.module.css  # 详情样式
```

## 使用方法

1. 在团队轮播图中点击任意成员卡片
2. 根据设备类型自动显示相应的详情界面
3. 点击关闭按钮或遮罩层关闭详情

## 技术实现

### 状态管理
```typescript
const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
const [modalVisible, setModalVisible] = useState(false);
```

### 响应式判断
```typescript
const { screenSize } = useMobileOptimization();
const isMobileView = screenSize.width <= 738;
```

### 点击处理
```typescript
const handleCardClick = (member: TeamMember) => {
  setSelectedMember(member);
  setModalVisible(true);
};
```

## 样式特点

### 深色主题
- 渐变背景：`linear-gradient(135deg, #1B2B65 0%, #0A0F1A 100%)`
- 蓝色主色调：`#1677FF`
- 白色文字，半透明辅助色

### 移动端优化
- 触摸友好的按钮尺寸
- 合理的间距和字体大小
- 流畅的动画效果

### 无障碍支持
- 语义化的 HTML 结构
- 键盘导航支持
- 屏幕阅读器友好

## 性能优化

1. **懒加载**：详情内容按需加载
2. **动画优化**：使用 CSS transform 和 will-change
3. **内存管理**：组件销毁时清理状态
4. **响应式图片**：头像使用 Next.js Image 组件

## 浏览器兼容性

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- 移动端浏览器支持

## 未来扩展

1. **国际化支持**：多语言详情内容
2. **动画增强**：更丰富的过渡效果
3. **数据动态化**：从 API 获取团队成员信息
4. **社交分享**：分享团队成员信息
5. **搜索功能**：按技能或职位搜索团队成员 