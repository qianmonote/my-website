"use client";

import React from "react";
import { Row, Col } from "antd";
import Image from "next/image";
import { useI18n } from "@/context/I18nContext";
import classnames from "classnames";
import CustomtBtn from "@/components/elements/CustomtBtn";
import "./index.css";

const ProductSection: React.FC = () => {
  const { t } = useI18n();
  const products = [
    {
      img: "/home/ab-pd-p1.png",
      title: 'Biomass Gasification  <br/>  Power Generation  <br/>  Systems',
      desc: '生物质气化发电系统',
      link: '/products/biomass-gasification',
      placement: "left",
      imgStyle: {
        width: 980,
        height: 574,
      },
      contentStyle: {
        width: 388,
      },
    },
    {
      img: "/home/ab-pd-p2.png",
      title: 'Distributed Solar  <br/>  Photovoltaic Power  <br/>  Systems',
      desc: '分布式光储充一体化系统',
      link: '/products/power-storage-integration',
      imgStyle: {
        width: 980,
        height: 574,
      },
      placement: "left",
      contentStyle: {
        width: 388,
      },
    },
    {
      img: "/home/ab-pd-p3.png",
      title: 'Smart EV Charging  <br/>  Ecosystem',
      desc: '智慧EV充电生态体系',
      link: '/products/ai-robot',
      placement: "left",
      imgStyle: {
        width: 980,
        height: 574,
      },
      contentStyle: {
        width: 388,
      }
    }
  ];
  return (
    <section className="c-product-section-wrap">
      <div className="product-container">
        <div className="product-title">
          <Image src="/home/ab-pd-tit.png" alt="product" width={654} height={96} />
        </div>
        <Row>
          {products.map((p, idx) => (
            <Col span={24} key={idx}>
              <div className="product-card">
                <Image
                  alt={p.title}
                  src={p.img}
                  className="product-image"
                  {...(p?.imgStyle || {})}
                />
                <div
                  className={classnames("product-card-content", p.placement ?? 'left')}
                  style={{ ...(p?.contentStyle || {}) }}
                >
                  <div className="product-card-content-inner">
                    <div
                      className="product-card-title"
                      dangerouslySetInnerHTML={{
                        __html: p.title?.replace(/\r?\n/g, "<br />"),
                      }}
                    />
                    <div className="product-card-description">{p.desc}</div>
                    <a className="product-card-more" href={p?.link} target="_blank">
                      <CustomtBtn type="learnMoreEn" />
                    </a>
                  </div>
                </div>
                <div className="border-top-left"></div>
                <div className="border-top-right"></div>
                <div className="border-bottom-right"></div>
                <div className="border-bottom-left"></div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
};

export default ProductSection;
