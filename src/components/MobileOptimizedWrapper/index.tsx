"use client";

import React, { ReactNode, useEffect, useState } from 'react';
import { useMobileOptimization } from '@/hooks/useMobileOptimization';
import styles from './styles.module.css';

interface MobileOptimizedWrapperProps {
  children: ReactNode;
  className?: string;
  enableTouchFeedback?: boolean;
  enableSmoothScroll?: boolean;
  enablePerformanceOptimization?: boolean;
  touchFeedbackScale?: number;
  touchFeedbackDuration?: number;
}

const MobileOptimizedWrapper: React.FC<MobileOptimizedWrapperProps> = ({
  children,
  className = '',
  enableTouchFeedback = true,
  enableSmoothScroll = true,
  enablePerformanceOptimization = true,
  touchFeedbackScale = 0.95,
  touchFeedbackDuration = 150,
}) => {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  const {
    isMobile,
    isTablet,
    handleTouchStart,
    handleTouchEnd,
    getMobileClass,
  } = useMobileOptimization({
    enableTouchFeedback,
    enableSmoothScroll,
    enablePerformanceOptimization,
  });

  const wrapperClass = getMobileClass(`${styles.mobileOptimizedWrapper} ${className}`);

  // 服务器端渲染时返回基础样式
  if (!isClient) {
    return (
      <div
        className={`${styles.mobileOptimizedWrapper} ${className}`}
        style={{
          '--touch-feedback-scale': touchFeedbackScale,
          '--touch-feedback-duration': `${touchFeedbackDuration}ms`,
        } as React.CSSProperties}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      className={wrapperClass}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        '--touch-feedback-scale': touchFeedbackScale,
        '--touch-feedback-duration': `${touchFeedbackDuration}ms`,
      } as React.CSSProperties}
      data-mobile={isMobile}
      data-tablet={isTablet}
    >
      {children}
    </div>
  );
};

export default MobileOptimizedWrapper; 