"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./styles.module.css";

type SolutionCardProps = Partial<{
  number: string;
  title: string;
  description: string;
  features: string[];
  image: string;
  imageActive: string;
  isActive?: boolean;
  onClick?: () => void;
  onMouseEnter?: () => void;
}>;

const SolutionCard: React.FC<SolutionCardProps> = ({
  image = '',
  isActive = false,
  imageActive = '',
  onClick,
  onMouseEnter,
}) => {
  const [isMobile, setIsMobile] = useState(false);

  // 检测屏幕宽度
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1000);
    };

    // 初始检查
    checkScreenSize();

    // 监听窗口大小变化
    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  // 根据屏幕尺寸和激活状态计算图片尺寸
  const getImageDimensions = () => {
    if (isMobile) {
      // 移动端：使用原始图片比例，保持宽高比
      return {
        width: 595,
        height: 440,
        src: imageActive || image
      };
    } else {
      // 桌面端：根据激活状态决定尺寸
      return {
        width: isActive ? 595 : 119,
        height: 440,
        src: isActive ? imageActive : image
      };
    }
  };

  const imageConfig = getImageDimensions();

  return (
    <div
      className={`${styles.card} ${isActive ? styles.active : ""}`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
    >
      <div className={styles.background}>
        <Image 
          src={imageConfig.src} 
          width={imageConfig.width} 
          height={imageConfig.height} 
          alt="solution"  
          unoptimized={true}
          className={styles.image}
        />
      </div>
    </div>
  );
};

export default SolutionCard;
