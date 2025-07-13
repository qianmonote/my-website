'use client';

import React from 'react';
import styles from './styles.module.css';
import StepCard from '../StepCard';

const steps = [
  {
    step: 1,
    title: '下载与注册',
    description: '收集各种电桩设施数据作为初始资料',
    defaultImage: '/product/p4/part3/01.png',
    imageActive: '/product/p4/part3/01-active.png',
  },
  {
    step: 2,
    title: '选择充电模式',
    description: '将收集的原料数据转换为小的颗粒',
    defaultImage: '/product/p4/part3/02.png',
    imageActive: '/product/p4/part3/02-active.png',
  },
  {
    step: 3,
    title: '查找充电桩',
    description: '地图查找附近充电桩',
    defaultImage: '/product/p4/part3/03.png',
    imageActive: '/product/p4/part3/03-active.png',
  },
  {
    step: 4,
    title: '预约上门服务/导航',
    description: '输入位置，选择时间/导航至固定位置',
    defaultImage: '/product/p4/part3/04.png',
    imageActive: '/product/p4/part3/04-active.png',
  },
  {
    step: 5,
    title: '服务确认',
    description: '查看路线，接收确认信息',
    defaultImage: '/product/p4/part3/05.png',
    imageActive: '/product/p4/part3/05-active.png',
  },
  {
    step: 6,
    title: '启动充电',
    description: '现场扫码/APP远程启动',
    defaultImage: '/product/p4/part3/06.png',
    imageActive: '/product/p4/part3/06-active.png',
  },
  {
    step: 7,
    title: '充电进行中',
    description: '用户连接设备，在线同步数据',
    defaultImage: '/product/p4/part3/07.png',
    imageActive: '/product/p4/part3/07-active.png',
  },
  {
    step: 8,
    title: '支付与完成',
    description: '自动结算，评价服务',
    defaultImage: '/product/p4/part3/08.png',
    imageActive: '/product/p4/part3/08-active.png',
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