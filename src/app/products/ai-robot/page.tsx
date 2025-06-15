// AI棕榈果采摘机器人产品介绍页面
// 包含头图、产品介绍、三大核心功能区块
// 复用通用组件，风格与其他产品页一致
"use client";

import React from "react";
import { Button, Row, Col } from "antd";
import { CustomerServiceOutlined } from "@ant-design/icons";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from '@/components/elements/HeroSection'
import styles from "./styles.module.css";

const AIRobotPage = () => {
  return (
    <div className={styles.aiRobotPage}>
      <Navbar />
      {/* 头图区 */}
      <HeroSection 
        backgroundImage="/product/p3/bn.jpg"
        title="AI棕榈果采摘机器人"
      />
      {/* 产品介绍区 */}
      <section className={styles.introSection}>
        <div className={styles.introContainer}>
          <Row>
            <Col xs={24} lg={12} style={{ alignContent: "center" }}>
              <div className={styles.introContent}>
                <h2 className={styles.introTitle}>
                  “眼疾手快”
                  <br />
                  棕榈园智采收专家
                </h2>
                <div className={styles.introList}>
                  <div className={styles.introListLi}>搭载多模态AI视觉系统</div>
                  <div className={styles.introListLi}>
                    实现95%成熟果识别精准度
                  </div>
                  <div className={styles.introListLi}>7×24小时全天候作业</div>
                  <div className={styles.introListLi}>
                    综合采摘效率达人工3-5倍
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={24} lg={12}>
              <div className={styles.introImage}>
                <Image
                  src="/product/p3/intro.jpg"
                  alt="AI采摘机器人"
                  width={500}
                  height={750}
                  style={{ objectFit: "cover" }}
                />
              </div>
            </Col>
          </Row>
        </div>
      </section>
      {/* 三大核心功能区 */}
      <section className={styles.featuresSection}>
        <div className={styles.container}>
          <Row gutter={16}>
            <Col xs={24} md={8}>
              <div className={styles.featureCard}>
                <div className={styles.featureImage}>
                  <Image
                    src="/product/p3/swgz.png"
                    alt="三维感知"
                    width={280}
                    height={280}
                  />
                </div>
                <div className={styles.featureContent}>
                  <h3>
                    <div className={styles.featureContentTitle}>
                      三维感知
                      <div className={styles.featureTitleUnderline} />
                    </div>
                  </h3>
                  <p>毫米波雷法+高光谱成像，穿透枝叶精准定位果实</p>
                </div>
              </div>
            </Col>
            <Col xs={24} md={8}>
              <div className={styles.featureCard}>
                <div className={styles.featureImage}>
                  <Image
                    src="/product/p3/rxzq.png"
                    alt="柔性抓取"
                    width={280}
                    height={280}
                  />
                </div>
                <div className={styles.featureContent}>
                  <h3>
                    <div className={styles.featureContentTitle}>
                      柔性抓取 <div className={styles.featureTitleUnderline} />
                    </div>
                  </h3>
                  <p>放生抓夹+动态扭矩控制，无损采收率提升至95%</p>
                </div>
              </div>
            </Col>
            <Col xs={24} md={8}>
              <div className={styles.featureCard}>
                <div className={styles.featureImage}>
                  <Image
                    src="/product/p3/zhdd.png"
                    alt="智慧测度"
                    width={280}
                    height={280}
                  />
                </div>
                <div className={styles.featureContent}>
                  <h3>
                    <div className={styles.featureContentTitle}>
                      智慧测度 <div className={styles.featureTitleUnderline} />
                    </div>
                  </h3>
                  <p>自主导航避障+群体协作算法，亩均作业能耗降低30%～40%</p>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </section>
      <Footer inviteShow={false} />
    </div>
  );
};

export default AIRobotPage;
