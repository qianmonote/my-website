// 分布式光储充一体化系统产品介绍页面
// 包含头图、系统原理、工艺流程、系统优势、典型应用等区块
// 复用通用组件，风格与其他产品页一致
"use client";

import React from "react";
import { Row, Col } from "antd";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import styles from "./styles.module.css";
import HeroSection from "@/components/elements/HeroSection";
import SolutionCardList from "@/components/elements/SolutionCardList";
import StepCardList from "@/components/elements/StepCardList";

const PowerStorageIntegrationPage = () => {
  return (
    <div className={styles.powerStoragePage}>
      <Navbar />
      {/* 头图区 */}
      <HeroSection
        title="智能储能解决方案"
        backgroundImage="/product/p2/bn.jpg"
      />
      
      <section className={styles.processSection}>
        <h2 className={styles.sectionTitle}>充电流程</h2>
        <p className={styles.sectionDescription}>
          简单便捷的充电体验，智能化的服务流程
        </p>
        <SolutionCardList />
      </section>
      <StepCardList />
      <section className={styles.principleSection}>
        <div className={styles.principleContainer}>
          <Row>
            <Col xs={24} lg={12} style={{ alignContent: "center" }}>
              <div className={styles.principleContent}>
                <div className={styles.principleList}>
                  <div className={styles.principleListLi}>
                    光伏发电：高效利用太阳能，绿色清洁
                  </div>
                  <div className={styles.principleListLi}>
                    储能系统：削峰填谷，提升用能灵活性
                  </div>
                  <div className={styles.principleListLi}>
                    智能充电：动态分配，满足多场景需求
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={24} lg={12}>
              <div className={styles.principleImage}>
                <Image
                  src="/product/p2/intro.jpg"
                  alt=""
                  width={500}
                  height={375}
                  style={{ objectFit: "cover" }}
                />
              </div>
            </Col>
          </Row>
        </div>
      </section>
      {/* 四大亮点 */}
      <section className={styles.applicationSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>四大亮点</h2>
          <Row gutter={[16, 32]}>
            <Col xs={24} md={10}>
              <div className={styles.applicationCard}>
                <div className={styles.applicationImage}>
                  <Image
                    src="/product/p2/ld1.jpg"
                    alt=""
                    width={400}
                    height={280}
                  />
                </div>
                <div className={styles.applicationContent}>
                  <h3>
                    <div className={styles.applicationContentTitle}>
                      光伏矩阵
                      <div className={styles.featureTitleUnderline} />
                    </div>
                  </h3>
                  <p>定制化屋顶/地面光伏系统，年均发电效率提升18%</p>
                </div>
              </div>
            </Col>
            <Col xs={24} md={14}>
              <div className={styles.applicationCard}>
                <div className={styles.applicationImage}>
                  <Image
                    src="/product/p2/ld2.jpg"
                    alt=""
                    width={540}
                    height={280}
                  />
                </div>
                <div className={styles.applicationContent}>
                  <h3>
                    <div className={styles.applicationContentTitle}>
                      智慧储能
                      <div className={styles.featureTitleUnderline} />
                    </div>
                  </h3>
                  <p>梯次电池+智能EMS管理系统，削峰填谷节省30%电费</p>
                </div>
              </div>
            </Col>
            <Col xs={24} md={14}>
              <div className={styles.applicationCard}>
                <div className={styles.applicationImage}>
                  <Image
                    src="/product/p2/ld3.jpg"
                    alt=""
                    width={540}
                    height={280}
                  />
                </div>
                <div className={styles.applicationContent}>
                  <h3>
                    <div className={styles.applicationContentTitle}>
                      柴油备用
                      <div className={styles.featureTitleUnderline} />
                    </div>
                  </h3>
                  <p>无缝切换应急电源，保障关键负载24小时不间断运行</p>
                </div>
              </div>
            </Col>
            <Col xs={24} md={10}>
              <div className={styles.applicationCard}>
                <div className={styles.applicationImage}>
                  <Image
                    src="/product/p2/ld4.jpg"
                    alt=""
                    width={400}
                    height={280}
                  />
                </div>
                <div className={styles.applicationContent}>
                  <h3>
                    <div className={styles.applicationContentTitle}>
                      充电生态
                      <div className={styles.featureTitleUnderline} />
                    </div>
                  </h3>
                  <p>配套智能充电桩，构建清洁能源交通闭环（选配）</p>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </section>
      {/* 应用场景 */}
      <section className={styles.applicationSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>应用场景</h2>
          <Row gutter={16}>
            <Col xs={24} md={8}>
              <div className={styles.applicationCard}>
                <div className={styles.applicationImage}>
                  <Image
                    src="/product/p2/yy1.jpg"
                    alt=""
                    width={319}
                    height={484}
                  />
                </div>
              </div>
            </Col>
            <Col xs={24} md={8}>
              <div className={styles.applicationCard}>
                <div className={styles.applicationImage}>
                  <Image
                    src="/product/p2/yy2.jpg"
                    alt=""
                    width={319}
                    height={484}
                  />
                </div>
              </div>
            </Col>
            <Col xs={24} md={8}>
              <div className={styles.applicationCard}>
                <div className={styles.applicationImage}>
                  <Image
                    src="/product/p2/yy3.jpg"
                    alt=""
                    width={319}
                    height={484}
                  />
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

export default PowerStorageIntegrationPage;
