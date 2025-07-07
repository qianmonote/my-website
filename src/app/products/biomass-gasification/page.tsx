"use client";

import React from "react";
import { Row, Col, Card } from "antd";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "./styles.module.css";

const BiomassGasificationPage = () => {
  const commonCardList = [
    {
      image: "/product/p1/pt-part3-1.png",
      title: "偏远地区/离网能源供应",
      description: (
        <>
          1.岛屿、偏远乡村、山区：替代柴油发电，提供稳定电;
          2.微电网系统：与储能、太阳能、风能结合，形成独立供电系统
        </>
      ),
    },
    {
      image: "/product/p1/pt-part3-2.png",
      title: "农业废弃物资源化",
      description: (
        <>
          1.油棕叶、椰壳、稻壳、玉米秸秆、果树枝条等农废，通过气化转化为电力和热能；
          2.实现农业废弃物减量化、资源化、无害化处理
        </>
      ),
    },
    {
      image: "/product/p1/pt-part3-3.png",
      title: "工业热能与动力供应",
      description: (
        <>
          1.中小型工厂、食品加工厂、木材加工厂等：提供蒸汽、热水、热风；
          2.也可直接驱动内燃机发电或生产动力
        </>
      ),
    },
    {
      image: "/product/p1/pt-part3-4.png",
      title: "商业综合体与旅游景区能源",
      description: (
        <>
          度假村、生态园区、旅游小镇：
          1.利用本地生物质（如椰壳、树枝）自给自足供能；
          2.配套电动汽车充电、照明、冷热水系统
        </>
      ),
    },
    {
      image: "/product/p1/pt-part3-5.png",
      title: "碳资产与碳信用交易",
      description: (
        <>
          1.气化炉生产生物质炭（Biochar），用于土壤改良，同时实现碳封存；
          2.可参与国际碳信用交易市场，获取额外收益
        </>
      ),
    },
    {
      image: "/product/p1/pt-part3-6.png",
      title: "新能源车辆与移动能源",
      description: (
        <>
          气化炉+内燃机系统可为：
          1.电动三轮车、电动船、电动农业机械提供发电支持。 2.充当小型移动能源站
        </>
      ),
    },
  ];
  const applicationCardList = [
    {
      image: "/product/p1/pt-part5-1.png",
      title: "油棕废弃物气化发电集成系统",
      description: <>（气化效率75%，单次连续发电运行 达500小时）</>,
    },
    {
      image: "/product/p1/pt-part5-2.png",
      title: "首个商业化生物质综合解决方案",
      description: (
        <>(纯干法燃气净化工艺确保气体洁净且无二次污染废水产生，发电稳定）</>
      ),
    },
    {
      image: "/product/p1/pt-part5-3.png",
      title: "联合研发二代低焦油气化系统",
      description: (
        <>（单炉30~60吨/日，气化率提升至80%，尾部余热烘干原料，降低30%能耗）</>
      ),
    },
  ];

  return (
    <div className={styles.biomassPage}>
      <Navbar />
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroOverlay}>
          <div className={styles.heroOverlayContainer}>
            <h1 className={styles.heroTitle}>· 生物质气化发电系统 ·</h1>
          </div>
        </div>
      </section>

      {/* 气化原理 Section */}
      <section className={styles.partSection}>
        <div className={styles.container}>
          <Image
            src="/product/p1/pt-part1-des.png"
            alt="气化原理"
            width={1000}
            height={807}
          />
        </div>
      </section>

      {/* 工艺路线 Section */}
      <section className={styles.partSection}>
        <div className={styles.container}>
          <Image
            src="/product/p1/pt-part2-des.png"
            alt="工艺路线"
            width={1000}
            height={628}
          />
        </div>
      </section>

      {/* 生物质热解气化炉主要使用场景 Section */}
      <section className={styles.partSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>生物质热解气化炉主要使用场景</h2>
          <Row gutter={16}>
            {commonCardList.map((item, index) => (
              <Col xs={24} md={8} key={index}>
                <div className={styles.commonCard}>
                  <div className={styles.commonImage}>
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={318}
                      height={280}
                    />
                  </div>
                  <div className={styles.commonContent}>
                    <h3>
                      <div className={styles.commonContentTitle}>
                        {item.title}
                        <div className={styles.commonTitleUnderline} />
                      </div>
                    </h3>
                    <p>{item.description}</p>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* 环保优点 Section */}
      <section className={styles.partSection}>
        <div className={styles.container}>
          <Image
            src="/product/p1/pt-part4-des.png"
            alt="生物质燃气环保优点"
            width={1000}
            height={750}
          />
        </div>
      </section>

      {/* 应用案例 · ONETOUCH与拉曼大学联合研发 Section */}
      <section className={styles.partSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>
            应用案例 · ONETOUCH与拉曼大学联合研发
          </h2>
          <div className={styles.partSectionIntroText}>
            该项目标志着我司在可再生能源领域取得双重突破：技术上完成气化效率与系统稳定发性的行业革新，战略上构建"废弃物-绿电-碳汇"的循环经济范式，深度契合《巴黎协定》全球控温1.5℃目标
          </div>
          <Row gutter={16}>
            {applicationCardList.map((item, index) => (
              <Col xs={24} md={8} key={index}>
                <div className={styles.commonCard}>
                  <div className={styles.commonImage}>
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={318}
                      height={280}
                    />
                  </div>
                  <div className={styles.commonContent}>
                    <h3>
                      <div className={styles.commonContentTitle}>
                        {item.title}
                        <div className={styles.commonTitleUnderline} />
                      </div>
                    </h3>
                    <p>{item.description}</p>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BiomassGasificationPage;
