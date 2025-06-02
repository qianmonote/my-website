"use client";

import React from "react";
import { Carousel } from "antd";
import { useI18n } from "@/context/I18nContext";
import ContractBtn from "@/components/elements/ContractBtn";
import './index.css'

const Banner: React.FC = () => {
  const { t } = useI18n();

  // 轮播图片数据
  const bannerSlides = [
    {
      id: 1,
      image: "/images/banner.png",
      title: t("bannerTitle"),
      desc: t("bannerDesc"),
    },
    {
      id: 2,
      image: "/images/banner.png",
      title: t("bannerTitle"),
      desc: t("bannerDesc"),
    },
    {
      id: 3,
      image: "/images/banner.png",
      title: t("bannerTitle"),
      desc: t("bannerDesc"),
    },
  ];

  return (
    <section className="c-banner-section">
      <Carousel
        autoplay
        autoplaySpeed={4000}
        speed={800}
        dots={bannerSlides.length > 1 ? {
          className: "custom-dots",
        } : false}
        effect="fade"
      >
        {bannerSlides.map((slide) => (
          <div key={slide.id}>
            <div
              className="banner-slide"
              style={{
                background: `url(${slide.image}) right center no-repeat`,
              }}
            >
              <div className="banner-content-wrapper">
                <div
                  className="banner-title"
                  dangerouslySetInnerHTML={{ __html: slide.title?.replace(/\r?\n/g, "<br />") }}
                />
                <div
                  className="banner-desc"
                  dangerouslySetInnerHTML={{ __html: slide.desc?.replace(/\n/g, "<br />") }}
                />
                <ContractBtn />
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </section>
  );
};

export default Banner;
