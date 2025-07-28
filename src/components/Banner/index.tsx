"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Carousel } from "antd";
import "./index.css";

const Banner: React.FC = () => {
  // 修复水合错误：统一服务端和客户端的初始状态
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [imageHeights, setImageHeights] = useState<{ [key: number]: number }>({});
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [screenWidth, setScreenWidth] = useState(1440);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // 轮播图片数据
  const bannerSlides = useMemo(() => [
    {
      id: 1,
      image: "/home/banner/bn-1.jpg",
    },
    {
      id: 2,
      image: "/home/banner/bn-2.jpg",
    },
    {
      id: 3,
      image: "/home/banner/bn-3.jpg",
    },
    {
      id: 4,
      image: "/home/banner/bn-4.jpg",
    },
    {
      id: 5,
      image: "/home/banner/bn-5.jpg",
    },
    {
      id: 6,
      image: "/home/banner/bn-6.jpg",
    },
  ], []);

  // 防抖函数
  const debounce = useCallback(<T extends (...args: unknown[]) => void>(func: T, wait: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  }, []);

  // 检测屏幕尺寸变化
  const checkScreenSize = useCallback(() => {
    const width = window.innerWidth;
    setScreenWidth(width);
    setIsLargeScreen(width > 1440);
  }, []);

  // 客户端挂载后初始化
  useEffect(() => {
    setIsMounted(true);
    checkScreenSize();
    
    const debouncedCheckScreenSize = debounce(checkScreenSize, 100);
    window.addEventListener("resize", debouncedCheckScreenSize);
    
    return () => {
      window.removeEventListener("resize", debouncedCheckScreenSize);
    };
  }, [checkScreenSize, debounce]);

  // 预加载图片并计算高度 - 使用缓存优化
  useEffect(() => {
    const loadImages = async () => {
      const heights: { [key: number]: number } = {};
      
      const loadImage = (index: number, slide: typeof bannerSlides[0]): Promise<void> => {
        return new Promise((resolve) => {
          const img = new Image();
          
          img.onload = () => {
            const aspectRatio = img.height / img.width;
            let calculatedHeight;
            
            if (screenWidth > 1000) {
              calculatedHeight = 662;
            } else {
              calculatedHeight = screenWidth * aspectRatio;
            }
            
            heights[index] = calculatedHeight;
            resolve();
          };
          
          img.onerror = () => {
            heights[index] = screenWidth <= 1000 ? 250 : 400;
            resolve();
          };
          
          img.src = slide.image;
        });
      };

      const loadPromises = bannerSlides.map((slide, index) => loadImage(index, slide));
      await Promise.all(loadPromises);
      
      setImageHeights(heights);
      setIsInitialized(true);
    };
    
    if (screenWidth > 0) {
      loadImages();
    }
  }, [screenWidth, bannerSlides]);

  // 轮播配置 - 使用useMemo优化，修改为3秒间隔
  const carouselProps = useMemo(() => ({
    autoplay: isMounted,
    // 根据屏幕宽度决定是否显示dots
    dots: isMounted && screenWidth >= 1000 ? { className: "custom-dots" } : false,
    // 移除fade效果，避免图片渐入动画
    // effect: "fade" as const,
    autoplaySpeed: 3000, // 修改为3秒间隔
    beforeChange: (from: number, to: number) => {
      setCurrentSlideIndex(to);
    },
  }), [screenWidth, isMounted]);

  // 获取当前图片的高度 - 使用useMemo优化
  const getCurrentImageHeight = useCallback(() => {
    if (isLargeScreen) {
      return 662; // 大屏幕固定高度
    }
    
    const height = imageHeights[currentSlideIndex];
    if (height) {
      return height;
    }
    
    // 默认高度
    return screenWidth <= 1000 ? 250 : 662;
  }, [isLargeScreen, imageHeights, currentSlideIndex, screenWidth]);

  // 当前高度 - 修复水合错误，确保服务端和客户端一致
  const currentHeight = useMemo(() => {
    if (!isMounted) {
      // 服务端渲染时使用固定高度
      return 400;
    }
    
    if (!isInitialized) {
      // 客户端初始化时使用预估高度
      if (isLargeScreen) {
        return 662;
      } else {
        // 根据常见的图片比例预估高度
        const estimatedAspectRatio = 0.4; // 假设图片高宽比为0.4
        return Math.min(screenWidth * estimatedAspectRatio, 400);
      }
    }
    return getCurrentImageHeight();
  }, [isMounted, isInitialized, isLargeScreen, screenWidth, getCurrentImageHeight]);

  return (
    <section className="c-banner-section">
      <Carousel {...carouselProps}>
        {bannerSlides.map((slide) => (
          <div key={slide.id}>
            <div
              className="banner-slide"
              style={{
                background: `url(${slide.image}) no-repeat center center`,
                backgroundSize: isMounted && isLargeScreen ? "cover" : "contain",
                width: "100%",
                height: `${currentHeight}px`,
                // 添加过渡效果，使高度变化更平滑
                transition: isMounted && isInitialized ? "height 0.3s ease-in-out" : "none",
              }}
            />
          </div>
        ))}
      </Carousel>
    </section>
  );
};

export default Banner;
