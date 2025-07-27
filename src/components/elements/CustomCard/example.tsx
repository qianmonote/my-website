import React from 'react';
import UniversalCard from './index';

/**
 * UniversalCard 组件使用示例
 */
const UniversalCardExample: React.FC = () => {
  return (
    <div style={{ padding: '20px', background: '#0a0a0a' }}>
      <h1 style={{ color: '#fff', textAlign: 'center', marginBottom: '40px' }}>
        UniversalCard 组件示例
      </h1>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
        gap: '30px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        
        {/* 示例1: 基础卡片 */}
        <UniversalCard
          image={{
            src: "/about/part-1-cont.png",
            alt: "基础卡片示例",
            width: 780,
            height: 180
          }}
          titleZh="基础卡片"
          titleEn="Basic Card"
          subtitle="简单展示"
          descriptionZh="这是一个基础的卡片示例，包含图片、标题和描述"
          descriptionEn="This is a basic card example with image, title and description"
        />
        
        {/* 示例2: 只显示部分角标 */}
        <UniversalCard
          image={{
            src: "/about/part-2-cont.png",
            alt: "部分角标示例",
            width: 780,
            height: 600
          }}
          titleZh="部分角标"
          titleEn="Partial Corners"
          subtitle="自定义配置"
          descriptionZh="只显示左上和右下的角标"
          descriptionEn="Only show top-left and bottom-right corners"
          cornerBorders={{
            topLeft: true,
            topRight: false,
            bottomLeft: false,
            bottomRight: true
          }}
        />
        
        {/* 示例3: 自定义内容 */}
        <UniversalCard
          image={{
            src: "/about/part-3-cont.png",
            alt: "自定义内容示例",
            width: 780,
            height: 600
          }}
          titleZh="自定义内容"
          titleEn="Custom Content"
          customContent={
            <div style={{ 
              background: 'rgba(0,0,0,0.5)', 
              padding: '20px', 
              borderRadius: '8px',
              marginTop: '20px'
            }}>
              <button style={{
                background: '#4facfe',
                color: '#fff',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '5px',
                cursor: 'pointer',
                marginRight: '10px'
              }}>
                立即体验
              </button>
              <button style={{
                background: 'transparent',
                color: '#4facfe',
                border: '1px solid #4facfe',
                padding: '10px 20px',
                borderRadius: '5px',
                cursor: 'pointer'
              }}>
                了解更多
              </button>
            </div>
          }
        />
        
        {/* 示例4: 带更多按钮 */}
        <UniversalCard
          image={{
            src: "/about/part-1-cont.png",
            alt: "更多按钮示例",
            width: 780,
            height: 180
          }}
          titleZh="带更多按钮"
          titleEn="With More Button"
          subtitle="交互功能"
          descriptionZh="点击更多按钮查看详细信息"
          descriptionEn="Click more button to view details"
          moreButton={{
            text: "查看详情",
            icon: "/product/btn-more.png",
            onClick: () => alert('查看详情被点击！')
          }}
          onClick={() => console.log('卡片被点击')}
        />
        
        {/* 示例5: 无角标卡片 */}
        <UniversalCard
          image={{
            src: "/about/part-2-cont.png",
            alt: "无角标示例",
            width: 780,
            height: 600
          }}
          titleZh="无角标卡片"
          titleEn="No Corner Card"
          subtitle="简洁风格"
          descriptionZh="不显示任何角标的简洁风格"
          descriptionEn="Clean style without any corner borders"
          cornerBorders={{
            topLeft: false,
            topRight: false,
            bottomLeft: false,
            bottomRight: false
          }}
        />
        
        {/* 示例6: 完整功能展示 */}
        <UniversalCard
          className="demo-card"
          image={{
            src: "/about/part-3-cont.png",
            alt: "完整功能示例",
            width: 780,
            height: 600,
            style: { filter: 'brightness(0.7)' }
          }}
          backgroundImage={{
            src: "/about/part-1.png",
            width: 120,
            height: 180,
            style: { opacity: 0.3 }
          }}
          titleZh="完整功能展示\n支持多行标题"
          titleEn="Full Feature Demo\nMulti-line Title Support"
          subtitle="所有功能"
          descriptionZh="这是一个展示所有功能的完整示例卡片"
          descriptionEn="This is a complete example card showcasing all features"
          contentStyle={{ 
            background: 'linear-gradient(45deg, rgba(79,172,254,0.1), rgba(0,242,254,0.1))',
            borderRadius: '10px',
            padding: '20px'
          }}
          moreButton={{
            text: "完整体验",
            icon: "/product/btn-more.png",
            onClick: () => alert('完整体验功能！')
          }}
          onClick={() => console.log('完整功能卡片被点击')}
        />
      </div>
    </div>
  );
};

export default UniversalCardExample;