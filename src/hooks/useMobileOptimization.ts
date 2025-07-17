import { useState, useEffect, useCallback } from 'react';

interface UseMobileOptimizationProps {
  enableTouchFeedback?: boolean;
  enableSmoothScroll?: boolean;
  enablePerformanceOptimization?: boolean;
}

interface TouchState {
  isTouching: boolean;
  touchStartTime: number;
  touchPosition: { x: number; y: number };
}

export const useMobileOptimization = ({
  enableTouchFeedback = true,
  enableSmoothScroll = true,
  enablePerformanceOptimization = true,
}: UseMobileOptimizationProps = {}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });
  const [touchState, setTouchState] = useState<TouchState>({
    isTouching: false,
    touchStartTime: 0,
    touchPosition: { x: 0, y: 0 },
  });

  // 检测设备类型
  useEffect(() => {
    // 确保在客户端环境
    if (typeof window === 'undefined') return;
    
    const checkDeviceType = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setScreenSize({ width, height });
      setIsMobile(width <= 768);
      setIsTablet(width > 768 && width <= 1024);
    };

    checkDeviceType();
    window.addEventListener('resize', checkDeviceType);
    
    return () => window.removeEventListener('resize', checkDeviceType);
  }, []);

  // 触摸反馈处理
  const handleTouchStart = useCallback((event: React.TouchEvent) => {
    if (!enableTouchFeedback) return;
    
    setTouchState({
      isTouching: true,
      touchStartTime: Date.now(),
      touchPosition: {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY,
      },
    });
  }, [enableTouchFeedback]);

  const handleTouchEnd = useCallback(() => {
    if (!enableTouchFeedback) return;
    
    setTouchState(prev => ({
      ...prev,
      isTouching: false,
    }));
  }, [enableTouchFeedback]);

  // 平滑滚动处理
  const smoothScrollTo = useCallback((target: string | HTMLElement, offset = 0) => {
    if (!enableSmoothScroll || typeof window === 'undefined' || typeof document === 'undefined') return;
    
    const element = typeof target === 'string' 
      ? document.querySelector(target) 
      : target;
    
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  }, [enableSmoothScroll]);

  // 性能优化：防抖函数
  const debounce = useCallback(<T extends (...args: unknown[]) => unknown>(
    func: T,
    delay: number
  ): ((...args: Parameters<T>) => void) => {
    let timeoutId: NodeJS.Timeout;
    
    return (...args: Parameters<T>) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  }, []);

  // 性能优化：节流函数
  const throttle = useCallback(<T extends (...args: unknown[]) => unknown>(
    func: T,
    delay: number
  ): ((...args: Parameters<T>) => void) => {
    let lastCall = 0;
    
    return (...args: Parameters<T>) => {
      const now = Date.now();
      if (now - lastCall >= delay) {
        lastCall = now;
        func(...args);
      }
    };
  }, []);

  // 移动端特定的样式类
  const getMobileClass = useCallback((baseClass: string) => {
    if (isMobile) return `${baseClass} mobile`;
    if (isTablet) return `${baseClass} tablet`;
    return baseClass;
  }, [isMobile, isTablet]);

  // 检测是否为触摸设备
  const isTouchDevice = useCallback(() => {
    if (typeof window === 'undefined') return false;
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }, []);

  // 防止双击缩放
  useEffect(() => {
    if (enablePerformanceOptimization && isMobile && typeof document !== 'undefined') {
      let lastTouchEnd = 0;
      
      const preventZoom = (event: TouchEvent) => {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) {
          event.preventDefault();
        }
        lastTouchEnd = now;
      };
      
      document.addEventListener('touchend', preventZoom, false);
      
      return () => {
        document.removeEventListener('touchend', preventZoom);
      };
    }
  }, [enablePerformanceOptimization, isMobile]);

  // 优化滚动性能
  useEffect(() => {
    if (enablePerformanceOptimization && isMobile && typeof document !== 'undefined') {
      const optimizeScroll = () => {
        // 为移动端优化滚动性能
        document.body.style.setProperty('-webkit-overflow-scrolling', 'touch');
      };
      
      optimizeScroll();
    }
  }, [enablePerformanceOptimization, isMobile]);

  return {
    // 设备信息
    isMobile,
    isTablet,
    screenSize,
    isTouchDevice: isTouchDevice(),
    
    // 触摸状态
    touchState,
    handleTouchStart,
    handleTouchEnd,
    
    // 滚动控制
    smoothScrollTo,
    
    // 性能优化工具
    debounce,
    throttle,
    
    // 样式工具
    getMobileClass,
    
    // 断点检测
    breakpoints: {
      isSmall: screenSize.width <= 480,
      isMedium: screenSize.width > 480 && screenSize.width <= 768,
      isLarge: screenSize.width > 768 && screenSize.width <= 1024,
      isXLarge: screenSize.width > 1024,
    },
  };
};

export default useMobileOptimization; 