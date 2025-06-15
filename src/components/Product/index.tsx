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
      img: "/product/p1.jpg",
      title: t("product1"),
      desc: t("product1Desc"),
      link: '/products/biomass-gasification',
      placement: "right",
      imgStyle: {
        width: 980,
        height: 574,
      },
      contentStyle: {
        width: 388,
      },
    },
    {
      img: "/product/p2.jpg",
      title: t("product2"),
      desc: t("product2Desc"),
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
      img: "/product/p3.png",
      contentBgImg: "/product/p3-bg.png",
      title: t("product3"),
      desc: t("product3Desc"),
      link: '/products/ai-robot',
      placement: "right",
      imgStyle: {
        width: 980,
        height: 574,
      },
      contentBgImgStyle: {
        width: 422,
        height: 574,
      },
      contentStyle: {
        width: 490,
        alignItems: "start",
        paddingTop: 120,
      },
    },
    {
      img: "/product/p4.png",
      contentBgImg: "/product/p4-bg.png",
      title: t("product4"),
      desc: t("product4Desc"),
      link: '/products/smart-ev-charging',
      placement: "left",
      imgStyle: {
        width: 980,
        height: 574,
      },
      contentBgImgStyle: {
        width: 430,
        height: 574,
        left: 10,
        bottom: 0,
        top: 10,
        right: "unset",
      },
      contentStyle: {
        width: 430,
        padding: "0 10px",
      },
    },
  ];
  return (
    <section className="c-product-section-wrap">
      <div className="product-container">
        <div className="product-title">
          <div className="product-title-main">关于我们，不仅仅是充电</div>
          <div className="product-title-sub">
            构建「清洁能源生产-智能充电优化-资源循环再生」三位一体的绿色科技生态
          </div>
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
                  className={classnames("product-card-content", p.placement)}
                  style={{ ...(p?.contentStyle || {}) }}
                >
                  <div className="product-card-content-inner">
                    {p?.contentBgImg ? (
                      <Image
                        alt=""
                        src={p?.contentBgImg}
                        width={422}
                        height={574}
                        className="product-content-bg-image"
                        style={{
                          ...(p?.contentBgImgStyle || {}),
                        }}
                      />
                    ) : null}
                    <div
                      className="product-card-title"
                      dangerouslySetInnerHTML={{
                        __html: p.title?.replace(/\r?\n/g, "<br />"),
                      }}
                    />
                    <div className="product-card-description">{p.desc}</div>
                    <a className="product-card-more" href={p?.link} target="_blank">
                      <CustomtBtn type="learnMore">
                        {t("learnMore")}
                      </CustomtBtn>
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
