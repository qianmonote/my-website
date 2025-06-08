import React from 'react';
import styles from './styles.module.css';

interface TimelineItem {
  label: React.ReactNode;
  children: React.ReactNode;
}

interface CustomTimelineProps {
  items: TimelineItem[];
}

/**
 * 自定义时间轴组件
 * 实现左侧固定宽度，右侧弹性宽度的布局
 */
const CustomTimeline: React.FC<CustomTimelineProps> = ({ items }) => {
  return (
    <div className={styles.timeline}>
      {items.map((item, index) => (
        <div key={index} className={styles.timelineItem}>
          {/* 左侧标签区域 - 固定宽度 */}
          <div className={styles.timelineLabel}>
            {item.label}
          </div>
          
          {/* 时间轴线条和节点 */}
          <div className={styles.timelineConnector}>
            <div className={styles.timelineNode}></div>
            {index < items.length - 1 && (
              <div className={styles.timelineLine}></div>
            )}
          </div>
          
          {/* 右侧内容区域 - 弹性宽度 */}
          <div className={styles.timelineContent}>
            {item.children}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CustomTimeline; 