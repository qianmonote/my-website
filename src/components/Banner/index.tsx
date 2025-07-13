"use client";

import React from "react";
import { Carousel } from "antd";
import "./index.css";

const Banner: React.FC = () => {

  // 轮播图片数据
  const bannerSlides = [
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
      id: 5,
      image: "/home/banner/bn-6.jpg",
    },
  ];

  return (
    <section className="c-banner-section">
      <Carousel>
        {bannerSlides.map((slide) => (
          <div key={slide.id}>
            <div
              className="banner-slide"
              style={{
                background: `url(${slide.image}) no-repeat center center`,
                backgroundSize: "cover",
              }}
            >
              {/* {slide?.content && (
                <div className="banner-content-wrapper">
                  <div className="banner-content">{slide.content}</div>
                </div>
              )} */}
            </div>
          </div>
        ))}
      </Carousel>
    </section>
  );
};

export default Banner;
