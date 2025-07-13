'use client';

import React, { useState } from 'react';
import styles from './styles.module.css';
import Image from 'next/image';

interface StepCardProps {
  defaultImage: string;  // 默认的图片
  imageActive: string;   // 鼠标悬浮时的图片
  title: string;         // 标题
  description?: string;   // 描述文本
  step: number;         // 步骤编号
}

const StepCard: React.FC<StepCardProps> = ({
  defaultImage,
  imageActive,
  title,
  // description,
  // step,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`${styles.card} ${isHovered ? styles.hovered : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.imageContainer}>
          <Image
            src={isHovered ? imageActive : defaultImage}
            alt={title}
            width={244}
            height={244}
            unoptimized
            className={styles.image}
          />
        {/* <div className={styles.overlay}>
          <div className={styles.stepInfo}>
            <div className={styles.stepNumber}>{step}</div>
            <div className={styles.stepTitle}>{title}</div>
            <div className={styles.stepDescription}>{description}</div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default StepCard; 