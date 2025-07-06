"use client";

import React from "react";
import { Carousel } from "antd";
import { useI18n } from "@/context/I18nContext";
import Link from "next/link";
import ContractBtn from "@/components/elements/CustomtBtn";
import Image from "next/image";
import "./index.css";

const Banner: React.FC = () => {

  // 轮播图片数据
  const bannerSlides = [
    {
      id: 1,
      image: "/images/home-bn.png",
      content: (
        <>
          <Image
            src="/home/bn-one-cont.png"
            alt="banner"
            width={627}
            height={199}
            style={{ marginBottom: "40px", marginLeft: '-100px' }}
          />
          <Link href="/contact" style={{ marginLeft: '-100px' }}>
            <ContractBtn type="contactEn" />
          </Link>
        </>
      ),
    }
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
              <div className="banner-content-wrapper">
                <div className="banner-content">{slide.content}</div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </section>
  );
};

export default Banner;
