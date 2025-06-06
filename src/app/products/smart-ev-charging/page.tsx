'use client';

import React from 'react';
import { Button, Row, Col } from 'antd';
import { CustomerServiceOutlined } from '@ant-design/icons';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from './styles.module.css';

const SmartEVChargingPage = () => {
  return (
    <div className={styles.smartEvPage}>
      <Navbar />
      
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroOverlay}>
          <div className={styles.container}>
            <h1 className={styles.heroTitle}>智慧EV充电生态体系</h1>
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

      {/* 三位一体 Section */}
      <section className={styles.trinitySection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>三位一体</h2>
          <p className={styles.sectionSubtitle}>
            集成充电设施、智能管理、用户体验三位一体的<br />
            EV充电全生态解决方案，实现智能化服务和可持续发展
          </p>
          
          <Row gutter={[48, 32]} align="middle">
            <Col xs={24} lg={12}>
              <div className={styles.trinityFeatures}>
                <div className={styles.featureItem}>
                  <div className={`${styles.featureIcon} ${styles.green}`}></div>
                  <div className={styles.featureContent}>
                    <h4>充电基础设施</h4>
                    <p>高性能充电桩、智能配电网络、灵活部署方案覆盖城市充电需求</p>
                  </div>
                </div>
                
                <div className={styles.featureItem}>
                  <div className={`${styles.featureIcon} ${styles.blue}`}></div>
                  <div className={styles.featureContent}>
                    <h4>智能管理平台</h4>
                    <p>大数据分析、云端监控、实时调度，实现充电网络智能化运营管理</p>
                  </div>
                </div>
                
                <div className={styles.featureItem}>
                  <div className={`${styles.featureIcon} ${styles.purple}`}></div>
                  <div className={styles.featureContent}>
                    <h4>用户服务体验</h4>
                    <p>一键预约、移动支付、个性化服务，提升用户充电体验和满意度</p>
                  </div>
                </div>
              </div>
            </Col>
            
            <Col xs={24} lg={12}>
              <div className={styles.trinityDiagram}>
                <div className={styles.stackedLayers}>
                  <div className={`${styles.layer} ${styles.layer1}`}></div>
                  <div className={`${styles.layer} ${styles.layer2}`}></div>
                  <div className={`${styles.layer} ${styles.layer3}`}></div>
                </div>
                <div className={styles.layerLabels}>
                  <div className={styles.label}>基础设施层</div>
                  <div className={styles.label}>智能管理层</div>
                  <div className={styles.label}>用户体验层</div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </section>

      {/* 生物质燃气环保优点 Section */}
      <section className={styles.environmentalBenefits}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>生物质燃气环保优点</h2>
          <Row gutter={[48, 32]} align="middle">
            <Col xs={24} lg={12}>
              <div className={styles.benefitsList}>
                <div className={styles.benefitItem}>
                  <div className={styles.benefitNumber}>01</div>
                  <div className={styles.benefitContent}>
                    <h4>资源循环</h4>
                    <p>变废为宝，资源循环利用</p>
                  </div>
                </div>
                
                <div className={styles.benefitItem}>
                  <div className={styles.benefitNumber}>02</div>
                  <div className={styles.benefitContent}>
                    <h4>绿色环保</h4>
                    <p>无污染、低碳排放，环保友好</p>
                  </div>
                </div>
                
                <div className={styles.benefitItem}>
                  <div className={styles.benefitNumber}>03</div>
                  <div className={styles.benefitContent}>
                    <h4>清洁高效</h4>
                    <p>燃烧充分，清洁高效，热值稳定</p>
                  </div>
                </div>
                
                <div className={styles.benefitItem}>
                  <div className={styles.benefitNumber}>04</div>
                  <div className={styles.benefitContent}>
                    <h4>经济效益</h4>
                    <p>降低运营成本，提升经济效益</p>
                  </div>
                </div>
                
                <div className={styles.benefitItem}>
                  <div className={styles.benefitNumber}>05</div>
                  <div className={styles.benefitContent}>
                    <h4>政策支持</h4>
                    <p>符合国家能源政策，享受政策红利</p>
                  </div>
                </div>
                
                <div className={styles.benefitItem}>
                  <div className={styles.benefitNumber}>06</div>
                  <div className={styles.benefitContent}>
                    <h4>技术成熟</h4>
                    <p>工艺成熟稳定，操作简单易维护</p>
                  </div>
                </div>
              </div>
            </Col>
            
            <Col xs={24} lg={12}>
              <div className={styles.environmentalImages}>
                <div className={`${styles.envImageContainer} ${styles.mainImage}`}>
                  <div className={styles.envImage}>
                    <Image 
                      src="/images/forest-environment.jpg" 
                      alt="森林自然环境"
                      width={400}
                      height={300}
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                </div>
                <div className={`${styles.envImageContainer} ${styles.sideImage}`}>
                  <div className={styles.envImage}>
                    <Image 
                      src="/images/clean-energy.jpg" 
                      alt="清洁能源"
                      width={200}
                      height={180}
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </section>

      {/* 生物质能养殖气化发电系统 Section */}
      <section className={styles.biomassSystem}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>生物质能养殖气化发电系统</h2>
          <p className={styles.systemDescription}>
            发电机房采用集装箱式标准化设计，具有结构紧凑、运输便捷、安装快速等优势。全自动化运行，远程监控，
            低维护成本。适用于农业废料、林业剩余物、养殖废料等多种生物质原料的高效气化发电，为乡村振兴和绿色发展提供清洁能源支撑。
          </p>
          
          <div className={styles.systemsGrid}>
            <div className={styles.systemCard}>
              <div className={styles.systemImage}>
                <Image 
                  src="/images/industrial-gasification.jpg" 
                  alt="生物质能发电设备1"
                  width={400}
                  height={200}
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className={styles.systemContent}>
                <h3>集装箱式生物质气化发电设备</h3>
                <p>
                  标准化集装箱设计，即装即用，具有良好的移动性和适应性。
                  整套系统包括气化炉、发电机组、控制系统等核心设备。
                  采用先进的气化技术，发电效率高，运行稳定可靠。
                </p>
              </div>
            </div>
            
            <div className={styles.systemCard}>
              <div className={styles.systemImage}>
                <Image 
                  src="/images/agricultural-gasification.jpg" 
                  alt="生物质能发电设备2"
                  width={400}
                  height={200}
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className={styles.systemContent}>
                <h3>智能化控制管理系统平台</h3>
                <p>
                  集成物联网技术，实现设备状态实时监控和远程控制。
                  智能化运维管理，故障预警，降低运营成本。
                  数据分析和优化，提升发电效率和设备寿命。
                </p>
              </div>
            </div>
            
            <div className={styles.systemCard}>
              <div className={styles.systemImage}>
                <Image 
                  src="/images/integrated-plant.jpg" 
                  alt="生物质能发电设备3"
                  width={400}
                  height={200}
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className={styles.systemContent}>
                <h3>综合能源管理与并网系统</h3>
                <p>
                  支持多种并网模式，包括离网独立运行和并网发电。
                  智能电网接入，实现电力双向流动和优化调度。
                  配套储能系统，提高能源利用效率和供电稳定性。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SmartEVChargingPage; 