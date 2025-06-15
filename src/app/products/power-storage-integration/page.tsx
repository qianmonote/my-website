// 分布式光储充一体化系统产品介绍页面
// 包含头图、系统原理、工艺流程、系统优势、典型应用等区块
// 复用通用组件，风格与其他产品页一致
'use client';

import React from 'react';
import { Button, Row, Col, Card } from 'antd';
import { CustomerServiceOutlined } from '@ant-design/icons';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from './styles.module.css';

const PowerStorageIntegrationPage = () => {
  return (
    <div className={styles.powerStoragePage}>
      <Navbar />
      {/* 头图区 */}
      <section className={styles.heroSection}>
        <div className={styles.heroOverlay}>
          <div className={styles.container}>
            <h1 className={styles.heroTitle}>分布式光储充一体化系统</h1>
            <Button 
              type="primary" 
              size="large" 
              icon={<CustomerServiceOutlined />}
              className={styles.contactBtn}
            >
              联系我们
            </Button>
          </div>
        </div>
      </section>
      {/* 系统原理 */}
      <section className={styles.principleSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>系统原理</h2>
          <Row gutter={[48, 32]} align="middle">
            <Col xs={24} lg={12}>
              <div className={styles.principleContent}>
                <p className={styles.principleIntro}>
                  分布式光储充一体化系统集成了光伏发电、储能系统与智能充电设施，通过能量管理系统实现多能互补与智能调度，提升能源利用效率，保障供电安全与绿色低碳。
                </p>
                <ul className={styles.principleList}>
                  <li>光伏发电：高效利用太阳能，绿色清洁</li>
                  <li>储能系统：削峰填谷，提升用能灵活性</li>
                  <li>智能充电：动态分配，满足多场景需求</li>
                </ul>
              </div>
            </Col>
            <Col xs={24} lg={12}>
              <div className={styles.principleImage}>
                <Image src="/product/p3-bg.png" alt="系统原理示意" width={400} height={300} style={{objectFit:'cover'}} />
              </div>
            </Col>
          </Row>
        </div>
      </section>
      {/* 工艺流程 */}
      <section className={styles.processSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>工艺流程</h2>
          <div className={styles.timeline}>
            <div className={styles.timelineItem}>
              <div className={styles.timelineIcon}><Image src="/product/p3.png" alt="光伏发电" width={32} height={32} /></div>
              <div className={styles.timelineLabel}>光伏发电</div>
            </div>
            <div className={styles.timelineArrow}>→</div>
            <div className={styles.timelineItem}>
              <div className={styles.timelineIcon}><Image src="/product/p3.png" alt="储能系统" width={32} height={32} /></div>
              <div className={styles.timelineLabel}>储能系统</div>
            </div>
            <div className={styles.timelineArrow}>→</div>
            <div className={styles.timelineItem}>
              <div className={styles.timelineIcon}><Image src="/product/p3.png" alt="能量管理" width={32} height={32} /></div>
              <div className={styles.timelineLabel}>能量管理</div>
            </div>
            <div className={styles.timelineArrow}>→</div>
            <div className={styles.timelineItem}>
              <div className={styles.timelineIcon}><Image src="/product/p3.png" alt="智能充电" width={32} height={32} /></div>
              <div className={styles.timelineLabel}>智能充电</div>
            </div>
          </div>
        </div>
      </section>
      {/* 系统优势 */}
      <section className={styles.advantagesSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>系统优势</h2>
          <Row gutter={[32, 32]}>
            <Col xs={24} md={8}>
              <div className={styles.advantageCard}>
                <h4>绿色环保</h4>
                <p>清洁能源利用，减少碳排放，助力双碳目标。</p>
              </div>
            </Col>
            <Col xs={24} md={8}>
              <div className={styles.advantageCard}>
                <h4>高效智能</h4>
                <p>智能调度，能量优化分配，提升整体效率。</p>
              </div>
            </Col>
            <Col xs={24} md={8}>
              <div className={styles.advantageCard}>
                <h4>安全可靠</h4>
                <p>多重安全防护，保障系统稳定运行。</p>
              </div>
            </Col>
            <Col xs={24} md={8}>
              <div className={styles.advantageCard}>
                <h4>经济节能</h4>
                <p>削峰填谷，降低用电成本，提升经济效益。</p>
              </div>
            </Col>
            <Col xs={24} md={8}>
              <div className={styles.advantageCard}>
                <h4>灵活扩展</h4>
                <p>模块化设计，适应多种应用场景，灵活部署。</p>
              </div>
            </Col>
          </Row>
        </div>
      </section>
      {/* 典型应用 */}
      <section className={styles.applicationSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>典型应用</h2>
          <Row gutter={[32, 32]} className={styles.applicationsGrid}>
            <Col xs={24} md={8}>
              <Card className={styles.applicationCard} bordered={false}>
                <div className={styles.cardImage}>
                  <Image src="/product/p3.png" alt="园区分布式光储充一体化" width={400} height={220} style={{objectFit:'cover'}} />
                </div>
                <div className={styles.cardContent}>
                  <h3>园区分布式光储充一体化</h3>
                  <p>为产业园区、写字楼等场景提供绿色能源与智能充电一体化解决方案。</p>
                </div>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card className={styles.applicationCard} bordered={false}>
                <div className={styles.cardImage}>
                  <Image src="/product/p3.png" alt="高速服务区光储充一体化" width={400} height={220} style={{objectFit:'cover'}} />
                </div>
                <div className={styles.cardContent}>
                  <h3>高速服务区光储充一体化</h3>
                  <p>满足高速公路服务区大功率充电与绿色用能需求，提升运营效率。</p>
                </div>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card className={styles.applicationCard} bordered={false}>
                <div className={styles.cardImage}>
                  <Image src="/product/p3.png" alt="社区/乡村新能源充电站" width={400} height={220} style={{objectFit:'cover'}} />
                </div>
                <div className={styles.cardContent}>
                  <h3>社区/乡村新能源充电站</h3>
                  <p>为社区、乡村等分布式场景提供经济高效的新能源充电基础设施。</p>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default PowerStorageIntegrationPage; 