'use client';

import React from 'react';
import { Button, Row, Col, Card } from 'antd';
import { CustomerServiceOutlined } from '@ant-design/icons';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './styles.css';

const BiomassGasificationPage = () => {
  return (
    <div className="biomass-page">
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay">
          <div className="container">
            <h1 className="hero-title">生物质废弃物气化发电系统</h1>
            <Button 
              type="primary" 
              size="large" 
              icon={<CustomerServiceOutlined />}
              className="contact-btn"
            >
              联系客服
            </Button>
          </div>
        </div>
      </section>

      {/* 气化原理 Section */}
      <section className="gasification-principle">
        <div className="container">
          <h2 className="section-title">气化原理</h2>
          <Row gutter={[48, 32]} align="middle">
            <Col xs={24} lg={12}>
              <div className="principle-content">
                <p className="principle-intro">
                  生物质气化是在高温(800-1000℃)缺氧环境下，将生物质废料转换为清洁燃气的热化学过程。
                </p>
                
                <div className="principle-steps">
                  <div className="step">
                    <div className="step-icon green"></div>
                    <div className="step-content">
                      <h4>干燥</h4>
                      <p>去除生物质中多余水分，提高气化效率，温度约105-200℃。</p>
                    </div>
                  </div>
                  
                  <div className="step">
                    <div className="step-icon orange"></div>
                    <div className="step-content">
                      <h4>热解</h4>
                      <p>在缺氧条件下分解有机物质，产生挥发性有机化合物、焦炭和不凝气体。</p>
                    </div>
                  </div>
                  
                  <div className="step">
                    <div className="step-icon purple"></div>
                    <div className="step-content">
                      <h4>氧化</h4>
                      <p>引入适量空气，进行部分氧化反应，为后续还原反应提供热量。</p>
                    </div>
                  </div>
                  
                  <div className="step">
                    <div className="step-icon teal"></div>
                    <div className="step-content">
                      <h4>还原</h4>
                      <p>在高温环境下，产生大量可燃气体成分，主要为CO、H₂等。</p>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            
            <Col xs={24} lg={12}>
              <div className="process-diagram">
                <div className="cloud-container">
                  <div className="gas-cloud">
                    <div className="cloud-layer"></div>
                    <div className="cloud-layer"></div>
                    <div className="cloud-layer"></div>
                  </div>
                  <div className="gas-components">
                    <div className="component">H₂ 15-20%</div>
                    <div className="component">CO 18-24%</div>
                    <div className="component">CO₂ 9-15%</div>
                    <div className="component">CH₄ 1-5%</div>
                    <div className="component">N₂ 45-60%</div>
                  </div>
                </div>
                
                <div className="reactor-container">
                  <div className="reactor"></div>
                  <div className="arrows">
                    <div className="arrow down"></div>
                    <div className="arrow up"></div>
                  </div>
                </div>
                
                <div className="output">
                  <div className="output-text">燃气</div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </section>

      {/* 工艺路线 Section */}
      <section className="process-timeline">
        <div className="container">
          <h2 className="section-title">工艺路线</h2>
          <div className="timeline">
            <div className="timeline-path">
              <div className="timeline-item">
                <div className="timeline-icon">
                  <img src="/icons/raw-material.png" alt="原料" />
                </div>
                <div className="timeline-label">原料</div>
                <div className="timeline-desc">生物质废料收集分类</div>
              </div>
              
              <div className="timeline-item">
                <div className="timeline-icon">
                  <img src="/icons/pretreatment.png" alt="预处理" />
                </div>
                <div className="timeline-label">预处理</div>
                <div className="timeline-desc">破碎、干燥、筛分</div>
              </div>
              
              <div className="timeline-item">
                <div className="timeline-icon">
                  <img src="/icons/feeding.png" alt="给料" />
                </div>
                <div className="timeline-label">给料</div>
                <div className="timeline-desc">自动化定量给料系统</div>
              </div>
              
              <div className="timeline-item">
                <div className="timeline-icon">
                  <img src="/icons/gasification.png" alt="气化" />
                </div>
                <div className="timeline-label">气化</div>
                <div className="timeline-desc">高温气化反应器</div>
              </div>
              
              <div className="timeline-item">
                <div className="timeline-icon">
                  <img src="/icons/cleaning.png" alt="净化" />
                </div>
                <div className="timeline-label">净化</div>
                <div className="timeline-desc">燃气除尘脱硫净化</div>
              </div>
              
              <div className="timeline-item">
                <div className="timeline-icon">
                  <img src="/icons/power-generation.png" alt="发电" />
                </div>
                <div className="timeline-label">发电</div>
                <div className="timeline-desc">燃气轮机发电机组</div>
              </div>
              
              <div className="timeline-item">
                <div className="timeline-icon">
                  <img src="/icons/waste-treatment.png" alt="废料处理" />
                </div>
                <div className="timeline-label">废料处理</div>
                <div className="timeline-desc">炉渣综合利用</div>
              </div>
              
              <div className="timeline-item">
                <div className="timeline-icon">
                  <img src="/icons/emission-treatment.png" alt="尾气处理" />
                </div>
                <div className="timeline-label">尾气处理</div>
                <div className="timeline-desc">烟气脱硝除尘达标排放</div>
              </div>
              
              <div className="timeline-item">
                <div className="timeline-icon">
                  <img src="/icons/power-grid.png" alt="并网发电" />
                </div>
                <div className="timeline-label">并网发电</div>
                <div className="timeline-desc">清洁电力输送电网</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 环保优点 Section */}
      <section className="environmental-benefits">
        <div className="container">
          <h2 className="section-title">生物质燃气环保优点</h2>
          <Row gutter={[48, 32]} align="middle">
            <Col xs={24} lg={12}>
              <div className="benefits-list">
                <div className="benefit-item">
                  <div className="benefit-number">01</div>
                  <div className="benefit-content">
                    <h4>碳排放减少</h4>
                    <p>生物质燃烧产生的CO₂与植物生长时吸收的CO₂基本平衡，实现碳中和。</p>
                  </div>
                </div>
                
                <div className="benefit-item">
                  <div className="benefit-number">02</div>
                  <div className="benefit-content">
                    <h4>废物资源化</h4>
                    <p>将农林废弃物转化为清洁能源，变废为宝，解决环境污染问题。</p>
                  </div>
                </div>
                
                <div className="benefit-item">
                  <div className="benefit-number">03</div>
                  <div className="benefit-content">
                    <h4>清洁燃烧</h4>
                    <p>通过先进的气化和净化技术，大幅减少颗粒物、SO₂、NOx等污染物排放。</p>
                  </div>
                </div>
                
                <div className="benefit-item">
                  <div className="benefit-number">04</div>
                  <div className="benefit-content">
                    <h4>资源循环</h4>
                    <p>气化过程产生的炉渣可作为建材，实现资源的最大化利用。</p>
                  </div>
                </div>
                
                <div className="benefit-item">
                  <div className="benefit-number">05</div>
                  <div className="benefit-content">
                    <h4>能源安全</h4>
                    <p>利用本地生物质资源，减少对进口能源的依赖，提高能源安全性。</p>
                  </div>
                </div>
                
                <div className="benefit-item">
                  <div className="benefit-number">06</div>
                  <div className="benefit-content">
                    <h4>生态保护</h4>
                    <p>减少秸秆焚烧，保护大气环境，促进农村生态环境改善。</p>
                  </div>
                </div>
              </div>
            </Col>
            
            <Col xs={24} lg={12}>
              <div className="environmental-images">
                <div className="env-image-container">
                  <img src="/images/forest-environment.jpg" alt="森林环境" className="env-image" />
                </div>
                <div className="env-image-container">
                  <img src="/images/clean-energy.jpg" alt="清洁能源" className="env-image" />
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </section>

      {/* 产品应用 Section */}
      <section className="product-applications">
        <div className="container">
          <h2 className="section-title">生物质废弃物气化发电系统</h2>
          <p className="section-subtitle">
            我们的生物质气化发电系统采用先进的气化技术，能够高效处理各种生物质废料，
            转化为清洁电力，为您提供可持续的能源解决方案。
          </p>
          
          <Row gutter={[32, 32]} className="applications-grid">
            <Col xs={24} md={8}>
              <Card className="application-card" bordered={false}>
                <div className="card-image">
                  <img src="/images/industrial-gasification.jpg" alt="城市生物废气处理利用发电机组" />
                </div>
                <div className="card-content">
                  <h3>城市生物废气处理利用发电机组</h3>
                  <p>
                    专为城市有机废弃物处理设计，能够高效处理厨余垃圾、园林废料等城市生物质废料，
                    转化为清洁电力，同时解决城市垃圾处理难题。
                  </p>
                </div>
              </Card>
            </Col>
            
            <Col xs={24} md={8}>
              <Card className="application-card" bordered={false}>
                <div className="card-image">
                  <img src="/images/agricultural-gasification.jpg" alt="农作物秸秆气化发电机组" />
                </div>
                <div className="card-content">
                  <h3>农作物秸秆气化发电机组</h3>
                  <p>
                    针对农业秸秆废料优化设计，有效处理稻秆、麦秆、玉米秸秆等农作物废料，
                    为农村地区提供分布式清洁能源，促进农业可持续发展。
                  </p>
                </div>
              </Card>
            </Col>
            
            <Col xs={24} md={8}>
              <Card className="application-card" bordered={false}>
                <div className="card-image">
                  <img src="/images/integrated-plant.jpg" alt="智能化生物质气化发电站" />
                </div>
                <div className="card-content">
                  <h3>智能化生物质气化发电站</h3>
                  <p>
                    集成智能控制系统的大型气化发电设施，配备自动化给料、智能监控、
                    远程运维等功能，实现无人值守运行，提高运营效率。
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