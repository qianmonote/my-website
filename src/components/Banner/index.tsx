"use client";

import React, { useMemo } from "react";
import { Carousel } from "antd";
import Image from "next/image";
import "./index.css";

const Banner: React.FC = () => {

  // 轮播图片数据
  const bannerSlides = useMemo(
    () => [
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
    ],
    []
  );

  // 轮播配置
  const carouselProps = {
    adaptiveHeight: true,
    autoplay: true,
    // 根据屏幕宽度决定是否显示dots
    dots: { className: "custom-dots" },
    autoplaySpeed: 3000, // 修改为3秒间隔
  };

  return (
    <section className="c-banner-section">
      <Carousel {...carouselProps}>
        {bannerSlides.map((slide) => (
          <div key={slide.id}>
            <div className="banner-slide">
              <Image
                src={slide.image}
                alt=""
                style={{
                  width: "100%",
                  height: "auto",
                }}
                width={1440}
                height={662}
                unoptimized
              />
            </div>
          </div>
        ))}
      </Carousel>
    </section>
  );
};

export default Banner;
