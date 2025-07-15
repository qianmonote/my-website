"use client";

import React from "react";
import { Row, Col } from "antd";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/elements/HeroSection";
import PartSection from "@/components/elements/PartSection";
import PartSectionCardList from "@/components/elements/PartSectionCardList";
import StepCardList from "@/components/elements/StepCardList";
import styles from "./styles.module.css";
import { useI18n } from "@/context/I18nContext";

const SmartEVChargingPage = () => {
  const { lang } = useI18n();
  const coreAdvantageDataList = [
    {
      image: "/product/p4/part4/01.png",
      imageWidth: 280,
      imageHeight: 280,
      title: "灵活补能，随需而动",
      description:
        "无需电网、基建审批，自动驾驶精准响应高需求区域，适配老旧小区、景区等电容不足场景。90-150kWh储能容量，可单日服务20+ 辆新能源车，充电效率提升30%",
    },
    {
      image: "/product/p4/part4/02.png",
      imageWidth: 280,
      imageHeight: 280,
      title: "智能调度，降本增效",
      description:
        "桩找车”模式减少30%用户等待时间，单台机器人替代4-5个固定桩，空间利用率提升50%。手机APP一键召唤，充电桩直达车位",
    },
    {
      image: "/product/p4/part4/03.png",
      imageWidth: 280,
      imageHeight: 280,
      title: "峰谷套利，能源增值",
      description:
        "利用电价差实现储能系统经济循环，单次充放电收益达0.3元/kWh（中国江苏案例），降低电网负荷的同时创造额外收益",
    },
    {
      image: "/product/p4/part4/04.png",
      imageWidth: 280,
      imageHeight: 280,
      title: "应急护航，全域覆盖",
      colSpan: 12,
      description:
        "台风、暴雪等极端天气下，可同时为2~4台车提供DC快充（30分钟补电至80%），可日均应急服务14+小时",
    },
    {
      image: "/product/p4/part4/05.png",
      imageWidth: 280,
      imageHeight: 280,
      colSpan: 12,
      title: "全链无人化，体验升级",
      description:
        "自动导航、插枪、结算全流程无人化，适配高速、商场、老旧社区、服务区等高频场景，充电完成即自动返航，用户行程零干扰",
    },
  ];

  const applicationCaseDataList = [
    {
      image: "/product/p4/part5/01.png",
      imageWidth: 394,
      imageHeight: 400,
      colSpan: 10,
    },
    {
      image: "/product/p4/part5/02.png",
      imageWidth: 590,
      imageHeight: 400,
      colSpan: 14,
    },
  ];

  const steps = [
    {
      step: 1,
      title: '下载与注册',
      description: '收集各种电桩设施数据作为初始资料',
      defaultImageZh: '/product/p4/part3/01-zh.png',
      defaultImageEn: '/product/p4/part3/01-en.png',
      imageActive: '/product/p4/part3/01-active.png',
    },
    {
      step: 2,
      title: '选择充电模式',
      description: '将收集的原料数据转换为小的颗粒',
      defaultImageZh: '/product/p4/part3/02-zh.png',
      defaultImageEn: '/product/p4/part3/02-en.png',
      imageActive: '/product/p4/part3/02-active.png',
    },
    {
      step: 3,
      title: '查找充电桩',
      description: '地图查找附近充电桩',
      defaultImageZh: '/product/p4/part3/03-zh.png',
      defaultImageEn: '/product/p4/part3/03-en.png',
      imageActive: '/product/p4/part3/03-active.png',
    },
    {
      step: 4,
      title: '预约上门服务/导航',
      description: '输入位置，选择时间/导航至固定位置',
      defaultImageZh: '/product/p4/part3/04-zh.png',
      defaultImageEn: '/product/p4/part3/04-en.png',
      imageActive: '/product/p4/part3/04-active.png',
    },
    {
      step: 5,
      title: '服务确认',
      description: '查看路线，接收确认信息',
      defaultImageZh: '/product/p4/part3/05-zh.png',
      defaultImageEn: '/product/p4/part3/05-en.png',
      imageActive: '/product/p4/part3/05-active.png',
    },
    {
      step: 6,
      title: '启动充电',
      description: '现场扫码/APP远程启动',
      defaultImageZh: '/product/p4/part3/06-zh.png',
      defaultImageEn: '/product/p4/part3/06-en.png',
      imageActive: '/product/p4/part3/06-active.png',
    },
    {
      step: 7,
      title: '充电进行中',
      description: '用户连接设备，在线同步数据',
      defaultImageZh: '/product/p4/part3/07-zh.png',
      defaultImageEn: '/product/p4/part3/07-en.png',
      imageActive: '/product/p4/part3/07-active.png',
    },
    {
      step: 8,
      title: '支付与完成',
      description: '自动结算，评价服务',
      defaultImageZh: '/product/p4/part3/08-zh.png',
      defaultImageEn: '/product/p4/part3/08-en.png',
      imageActive: '/product/p4/part3/08-active.png',
    },
  ];

  return (
    <div className={styles.smartEvPage}>
      <Navbar />

      <HeroSection
        title="智慧EV充电生态体系"
        backgroundImage="/product/p4/bn/01.png"
      />
      {/* Part1 */}
      <PartSection>
        {lang === "zh" ? (
          <Image
            src="/product/p4/part1/01-zh.png"
            alt="三位一体"
            width={1000}
            height={667}
          />
        ) : (
          <Image
            src="/product/p4/part1/01-en.png"
            alt="三位一体"
            width={1000}
            height={779}
          />
        )}
      </PartSection>
      {/* Part2 移动充电机器人六大黄金场景*/}
      <PartSection title="移动充电机器人六大黄金场景">
        {lang === "zh" ? (
          <Image
            src="/product/p4/part2/01-zh.png"
            alt="移动充电机器人六大黄金场景"
            width={1000}
            height={400}
          />
        ) : (
          <Image
            src="/product/p4/part2/01-en.png"
            alt="移动充电机器人六大黄金场景"
            width={1000}
            height={400}
          />
        )}
      </PartSection>
      {/* Part3 */}
      <PartSection
        title={
          <div className={styles.part3SectionTitle}>
            EV充电专用APP——DC-CAT{" "}
            <Image
              src="/product/p4/part3/tit-icon.png"
              alt=""
              width={80}
              height={80}
              className={styles.part3SectionTitleIcon}
            />
            <Image
              src="/product/p4/part3/tit-bg.png"
              alt=""
              width={305}
              height={305}
              className={styles.part3SectionTitleBg}
            />
          </div>
        }
      >
        <StepCardList steps={steps} />
      </PartSection>
      {/* Part4 */}
      <PartSectionCardList
        title="移动充电机器人核心优势"
        dataList={coreAdvantageDataList}
      />
      {/* Part5 */}
      <PartSection title="应用案例-拉曼大学3*60KW绿电快充项目">
        <Row>
          {applicationCaseDataList.map((item, index) => (
            <Col span={item.colSpan} key={index}>
              <Image
                src={item.image}
                alt="移动充电机器人六大黄金场景"
                width={item.imageWidth}
                height={item.imageHeight}
              />
            </Col>
          ))}
        </Row>
      </PartSection>

      <Footer inviteShow={false} />
    </div>
  );
};

export default SmartEVChargingPage;
