"use client";

import { useEffect } from 'react';

const PageLoadManager: React.FC = () => {
  useEffect(() => {
    // 确保在客户端环境
    if (typeof document === 'undefined') return;
    
    // 页面加载完成后添加 page-loaded 类
    const timer = setTimeout(() => {
      document.body.classList.add('page-loaded');
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return null;
};

export default PageLoadManager; 