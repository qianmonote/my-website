'use client';

import React from 'react';
import styles from './styles.module.css';
import StepCard from '../StepCard';

const steps = [
  {
    step: 1,
    title: '下载与注册',
    description: '收集各种电桩设施数据作为初始资料',
    defaultImage: '/home/banner/bn-1.jpg',
  },
  {
    step: 2,
    title: '选择充电模式',
    description: '将收集的原料数据转换为小的颗粒',
    defaultImage: '/home/banner/bn-2.jpg',
  },
  {
    step: 3,
    title: '查找充电桩',
    description: '地图查找附近充电桩',
    defaultImage: '/home/banner/bn-3.jpg',
  },
  {
    step: 4,
    title: '预约上门服务/导航',
    description: '输入位置，选择时间/导航至固定位置',
    defaultImage: '/home/banner/bn-4.jpg',
  },
  {
    step: 5,
    title: '服务确认',
    description: '查看路线，接收确认信息',
    defaultImage: '/home/banner/bn-5.jpg',
  },
  {
    step: 6,
    title: '启动充电',
    description: '现场扫码/APP远程启动',
    defaultImage: '/home/banner/bn-6.jpg',
  },
  {
    step: 7,
    title: '充电进行中',
    description: '用户连接设备，在线同步数据',
    defaultImage: '/home/banner/bn-1.jpg',
  },
  {
    step: 8,
    title: '支付与完成',
    description: '自动结算，评价服务',
    defaultImage: '/home/banner/bn-2.jpg',
  },
];

interface StepCardListProps {
  className?: string;
}

const StepCardList: React.FC<StepCardListProps> = ({ className }) => {
  return (
    <div className={`${styles.container} ${className || ''}`}>
      <div className={styles.grid}>
        {steps.map((step) => (
          <StepCard
            key={step.step}
            {...step}
          />
        ))}
      </div>
    </div>
  );
};

export default StepCardList; 