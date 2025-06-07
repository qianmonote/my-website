'use client';

import React from 'react';
import { Button, Row, Col, Card } from 'antd';
import { CustomerServiceOutlined } from '@ant-design/icons';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from './styles.module.css';

const BiomassGasificationPage = () => {
  return (
    <div className={styles.biomassPage}>
      <Navbar />
      
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroOverlay}>
          <div className={styles.container}>
            <h1 className={styles.heroTitle}>生物质废弃物气化发电系统</h1>
            <Button 
              type="primary" 
              size="large" 
              icon={<CustomerServiceOutlined />}
              className={styles.contactBtn}
            >
              联系客服
            </Button>
          </div>
        </div>
      </section>

      {/* 气化原理 Section */}
      <section className={styles.gasificationPrinciple}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>气化原理</h2>
          <Row gutter={[48, 32]} align="middle">
            <Col xs={24} lg={12}>
              <div className={styles.principleContent}>
                <p className={styles.principleIntro}>
                  生物质气化是在高温(800-1000℃)缺氧环境下，将生物质废料转换为清洁燃气的热化学过程。
                </p>
                
                <div className={styles.principleSteps}>
                  <div className={styles.step}>
                    <div className={`${styles.stepIcon} ${styles.green}`}></div>
                    <div className={styles.stepContent}>
                      <h4>干燥</h4>
                      <p>去除生物质中多余水分，提高气化效率，温度约105-200℃。</p>
                    </div>
                  </div>
                  
                  <div className={styles.step}>
                    <div className={`${styles.stepIcon} ${styles.orange}`}></div>
                    <div className={styles.stepContent}>
                      <h4>热解</h4>
                      <p>在缺氧条件下分解有机物质，产生挥发性有机化合物、焦炭和不凝气体。</p>
                    </div>
                  </div>
                  
                  <div className={styles.step}>
                    <div className={`${styles.stepIcon} ${styles.purple}`}></div>
                    <div className={styles.stepContent}>
                      <h4>氧化</h4>
                      <p>引入适量空气，进行部分氧化反应，为后续还原反应提供热量。</p>
                    </div>
                  </div>
                  
                  <div className={styles.step}>
                    <div className={`${styles.stepIcon} ${styles.teal}`}></div>
                    <div className={styles.stepContent}>
                      <h4>还原</h4>
                      <p>在高温环境下，产生大量可燃气体成分，主要为CO、H₂等。</p>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            
            <Col xs={24} lg={12}>
              <div className={styles.processDiagram}>
                <div className={styles.cloudContainer}>
                  <div className={styles.gasCloud}>
                    <div className={styles.cloudLayer}></div>
                    <div className={styles.cloudLayer}></div>
                    <div className={styles.cloudLayer}></div>
                  </div>
                  <div className={styles.gasComponents}>
                    <div className={styles.component}>H₂ 15-20%</div>
                    <div className={styles.component}>CO 18-24%</div>
                    <div className={styles.component}>CO₂ 9-15%</div>
                    <div className={styles.component}>CH₄ 1-5%</div>
                    <div className={styles.component}>N₂ 45-60%</div>
                  </div>
                </div>
                
                <div className={styles.reactorContainer}>
                  <div className={styles.reactor}></div>
                  <div className={styles.arrows}>
                    <div className={`${styles.arrow} ${styles.down}`}></div>
                    <div className={`${styles.arrow} ${styles.up}`}></div>
                  </div>
                </div>
                
                <div className={styles.output}>
                  <div className={styles.outputText}>燃气</div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </section>

      {/* 工艺路线 Section */}
      <section className={styles.processTimeline}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>工艺路线</h2>
          <div className={styles.timeline}>
            <div className={styles.timelinePath}>
              <div className={styles.timelineItem}>
                <div className={styles.timelineIcon}>
                  <Image src="/icons/raw-material.png" alt="原料" width={24} height={24} />
                </div>
                <div className={styles.timelineLabel}>原料</div>
                <div className={styles.timelineDesc}>生物质废料收集分类</div>
              </div>
              
              <div className={styles.timelineItem}>
                <div className={styles.timelineIcon}>
                  <Image src="/icons/pretreatment.png" alt="预处理" width={24} height={24} />
                </div>
                <div className={styles.timelineLabel}>预处理</div>
                <div className={styles.timelineDesc}>破碎、干燥、筛分</div>
              </div>
              
              <div className={styles.timelineItem}>
                <div className={styles.timelineIcon}>
                  <Image src="/icons/feeding.png" alt="给料" width={24} height={24} />
                </div>
                <div className={styles.timelineLabel}>给料</div>
                <div className={styles.timelineDesc}>自动化定量给料系统</div>
              </div>
              
              <div className={styles.timelineItem}>
                <div className={styles.timelineIcon}>
                  <Image src="/icons/gasification.png" alt="气化" width={24} height={24} />
                </div>
                <div className={styles.timelineLabel}>气化</div>
                <div className={styles.timelineDesc}>高温气化反应器</div>
              </div>
              
              <div className={styles.timelineItem}>
                <div className={styles.timelineIcon}>
                  <Image src="/icons/cleaning.png" alt="净化" width={24} height={24} />
                </div>
                <div className={styles.timelineLabel}>净化</div>
                <div className={styles.timelineDesc}>燃气除尘脱硫净化</div>
              </div>
              
              <div className={styles.timelineItem}>
                <div className={styles.timelineIcon}>
                  <Image src="/icons/power-generation.png" alt="发电" width={24} height={24} />
                </div>
                <div className={styles.timelineLabel}>发电</div>
                <div className={styles.timelineDesc}>燃气轮机发电机组</div>
              </div>
              
              <div className={styles.timelineItem}>
                <div className={styles.timelineIcon}>
                  <Image src="/icons/waste-treatment.png" alt="废料处理" width={24} height={24} />
                </div>
                <div className={styles.timelineLabel}>废料处理</div>
                <div className={styles.timelineDesc}>炉渣综合利用</div>
              </div>
              
              <div className={styles.timelineItem}>
                <div className={styles.timelineIcon}>
                  <Image src="/icons/emission-treatment.png" alt="尾气处理" width={24} height={24} />
                </div>
                <div className={styles.timelineLabel}>尾气处理</div>
                <div className={styles.timelineDesc}>烟气脱硝除尘达标排放</div>
              </div>
              
              <div className={styles.timelineItem}>
                <div className={styles.timelineIcon}>
                  <Image src="/icons/power-grid.png" alt="并网发电" width={24} height={24} />
                </div>
                <div className={styles.timelineLabel}>并网发电</div>
                <div className={styles.timelineDesc}>清洁电力输送电网</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 环保优点 Section */}
      <section className={styles.environmentalBenefits}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>生物质燃气环保优点</h2>
          <Row gutter={[48, 32]} align="middle">
            <Col xs={24} lg={12}>
              <div className={styles.benefitsList}>
                <div className={styles.benefitItem}>
                  <div className={styles.benefitNumber}>01</div>
                  <div className={styles.benefitContent}>
                    <h4>碳排放减少</h4>
                    <p>生物质燃烧产生的CO₂与植物生长时吸收的CO₂基本平衡，实现碳中和。</p>
                  </div>
                </div>
                
                <div className={styles.benefitItem}>
                  <div className={styles.benefitNumber}>02</div>
                  <div className={styles.benefitContent}>
                    <h4>废物资源化</h4>
                    <p>将农林废弃物转化为清洁能源，变废为宝，解决环境污染问题。</p>
                  </div>
                </div>
                
                <div className={styles.benefitItem}>
                  <div className={styles.benefitNumber}>03</div>
                  <div className={styles.benefitContent}>
                    <h4>清洁燃烧</h4>
                    <p>通过先进的气化和净化技术，大幅减少颗粒物、SO₂、NOx等污染物排放。</p>
                  </div>
                </div>
                
                <div className={styles.benefitItem}>
                  <div className={styles.benefitNumber}>04</div>
                  <div className={styles.benefitContent}>
                    <h4>资源循环</h4>
                    <p>气化过程产生的炉渣可作为建材，实现资源的最大化利用。</p>
                  </div>
                </div>
                
                <div className={styles.benefitItem}>
                  <div className={styles.benefitNumber}>05</div>
                  <div className={styles.benefitContent}>
                    <h4>能源安全</h4>
                    <p>利用本地生物质资源，减少对进口能源的依赖，提高能源安全性。</p>
                  </div>
                </div>
                
                <div className={styles.benefitItem}>
                  <div className={styles.benefitNumber}>06</div>
                  <div className={styles.benefitContent}>
                    <h4>生态保护</h4>
                    <p>减少秸秆焚烧，保护大气环境，促进农村生态环境改善。</p>
                  </div>
                </div>
              </div>
            </Col>
            
            <Col xs={24} lg={12}>
              <div className={styles.environmentalImages}>
                <div className={styles.envImageContainer}>
                  <Image 
                    src="/images/forest-environment.jpg" 
                    alt="森林环境"
                    width={400}
                    height={300}
                    className={styles.envImage}
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className={styles.envImageContainer}>
                  <Image 
                    src="/images/clean-energy.jpg" 
                    alt="清洁能源"
                    width={400}
                    height={300}
                    className={styles.envImage}
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </section>

      {/* 产品应用 Section */}
      <section className={styles.productApplications}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>生物质废弃物气化发电系统</h2>
          <p className={styles.sectionSubtitle}>
            我们的生物质气化发电系统采用先进的气化技术，能够高效处理各种生物质废料，
            转化为清洁电力，为您提供可持续的能源解决方案。
          </p>
          
          <Row gutter={[32, 32]} className={styles.applicationsGrid}>
            <Col xs={24} md={8}>
              <Card className={styles.applicationCard} bordered={false}>
                <div className={styles.cardImage}>
                  <Image 
                    src="/images/industrial-gasification.jpg" 
                    alt="城市生物废气处理利用发电机组"
                    width={400}
                    height={220}
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className={styles.cardContent}>
                  <h3>城市生物废气处理利用发电机组</h3>
                  <p>
                    专为城市有机废弃物处理设计，能够高效处理厨余垃圾、园林废料等城市生物质废料，
                    转化为清洁电力，同时解决城市垃圾处理难题。
                  </p>
                </div>
              </Card>
            </Col>
            
            <Col xs={24} md={8}>
              <Card className={styles.applicationCard} bordered={false}>
                <div className={styles.cardImage}>
                  <Image 
                    src="/images/agricultural-gasification.jpg" 
                    alt="农作物秸秆气化发电机组"
                    width={400}
                    height={220}
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className={styles.cardContent}>
                  <h3>农作物秸秆气化发电机组</h3>
                  <p>
                    针对农业秸秆废料优化设计，有效处理稻秆、麦秆、玉米秸秆等农作物废料，
                    为农村地区提供分布式清洁能源，促进农业可持续发展。
                  </p>
                </div>
              </Card>
            </Col>
            
            <Col xs={24} md={8}>
              <Card className={styles.applicationCard} bordered={false}>
                <div className={styles.cardImage}>
                  <Image 
                    src="/images/integrated-plant.jpg" 
                    alt="智能化生物质气化发电站"
                    width={400}
                    height={220}
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className={styles.cardContent}>
                  <h3>智能化生物质气化发电站</h3>
                  <p>
                    大型集成式生物质气化发电站，适用于工业园区和大型农业基地，
                    具备强大的处理能力和稳定的电力输出，支撑区域绿色发展。
                  </p>
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

export default BiomassGasificationPage; 