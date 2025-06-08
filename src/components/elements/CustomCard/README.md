# UniversalCard 通用卡片组件

一个灵活的卡片组件，支持图片、标题、副标题、自定义内容和可配置的角标。

## 功能特性

- ✅ 支持主图片和背景图片
- ✅ 标题、副标题、描述文本
- ✅ 可配置的四角边框
- ✅ 自定义内容插槽
- ✅ 响应式设计
- ✅ 悬停动画效果
- ✅ TypeScript 支持

## 基础用法

### 1. 简单卡片

```tsx
import CustomCard from '@/components/CustomCard';

<CustomCard
  image={{
    src: "/images/card-bg.jpg",
    alt: "卡片背景",
    width: 600,
    height: 400
  }}
  title="卡片标题"
  subtitle="副标题"
  description="这是卡片的描述内容"
/>
```

### 2. 带角标配置的卡片

```tsx
<CustomCard
  image={{
    src: "/images/product.jpg",
    alt: "产品图片"
  }}
  title="产品名称"
  subtitle="产品系列"
  cornerBorders={{
    topLeft: true,
    topRight: true,
    bottomLeft: false,
    bottomRight: false
  }}
/>
```

### 3. 自定义内容卡片

```tsx
<CustomCard
  image={{
    src: "/images/service.jpg",
    alt: "服务图片"
  }}
  title="服务名称"
  customContent={
    <div>
      <button>立即体验</button>
      <p>免费试用30天</p>
    </div>
  }
  contentPlacement="left"
/>
```

### 4. 带更多按钮的卡片

```tsx
<CustomCard
  image={{
    src: "/images/news.jpg",
    alt: "新闻图片"
  }}
  title="新闻标题"
  description="新闻摘要内容..."
  moreButton={{
    text: "阅读更多",
    icon: "/icons/btn-more.png",
    onClick: () => console.log('查看详情')
  }}
/>
```

### 5. 完整配置示例

```tsx
<CustomCard
  className="custom-card"
  image={{
    src: "/images/hero-bg.jpg",
    alt: "英雄背景",
    width: 800,
    height: 600,
    style: { filter: 'brightness(0.8)' }
  }}
  backgroundImage={{
    src: "/images/content-bg.png",
    width: 422,
    height: 574,
    style: { opacity: 0.7 }
  }}
  title="主要标题\n支持换行"
  subtitle="副标题"
  description="详细的描述信息，可以是较长的文本内容"
  contentPlacement="center"
  contentStyle={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
  cornerBorders={{
    topLeft: true,
    topRight: true,
    bottomLeft: true,
    bottomRight: true
  }}
  moreButton={{
    text: "了解更多",
    icon: "/images/btn-more.png",
    onClick: () => router.push('/detail')
  }}
  onClick={() => console.log('卡片被点击')}
/>
```

## Props 参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `image` | `ImageConfig` | - | 主图片配置 |
| `backgroundImage` | `ImageConfig` | - | 背景图片配置 |
| `title` | `string` | - | 主标题 |
| `subtitle` | `string` | - | 副标题 |
| `description` | `string` | - | 描述文本 |
| `customContent` | `ReactNode` | - | 自定义内容 |
| `className` | `string` | - | 自定义CSS类名 |
| `contentPlacement` | `'left' \| 'right' \| 'center'` | `'center'` | 内容定位 |
| `contentStyle` | `CSSProperties` | - | 内容区域样式 |
| `cornerBorders` | `CornerBorders` | 全部显示 | 角标配置 |
| `onClick` | `() => void` | - | 点击事件 |
| `moreButton` | `MoreButtonConfig` | - | 更多按钮配置 |

## 类型定义

```tsx
interface ImageConfig {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
}

interface CornerBorders {
  topLeft?: boolean;
  topRight?: boolean;
  bottomLeft?: boolean;
  bottomRight?: boolean;
}

interface MoreButtonConfig {
  text: string;
  onClick?: () => void;
  icon?: string;
}
```

## 样式定制

组件使用 CSS Modules，你可以通过 `className` 属性传入自定义类名来覆盖样式：

```css
.customCard {
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

.customCard .cardTitle {
  color: #ff6b6b;
}
```

## 响应式支持

组件内置响应式支持：

- **桌面端** (>768px): 完整尺寸和效果
- **平板端** (≤768px): 适中尺寸
- **移动端** (≤480px): 紧凑布局 