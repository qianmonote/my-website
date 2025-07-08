"use client";

import React from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/elements/HeroSection";
import PartSection from "@/components/elements/PartSection";
import PartSectionCardList from "@/components/elements/PartSectionCardList";
import styles from "./styles.module.css";

const SmartEVChargingPage = () => {
  const coreAdvantageDataList = [
    {
      image: "/product/p4/part4-1.png",
      imageWidth: 280,
      imageHeight: 280,
      title: "灵活补能，随需而动",
      description:
        "无需电网、基建审批，自动驾驶精准响应高需求区域，适配老旧小区、景区等电容不足场景。90-150kWh储能容量，可单日服务20+ 辆新能源车，充电效率提升30%",
    },
    {
      image: "/product/p4/part4-2.png",
      imageWidth: 280,
      imageHeight: 280,
      title: "智能调度，降本增效",
      description:
        "桩找车”模式减少30%用户等待时间，单台机器人替代4-5个固定桩，空间利用率提升50%。手机APP一键召唤，充电桩直达车位",
    },
    {
      image: "/product/p4/part4-3.png",
      imageWidth: 280,
      imageHeight: 280,
      title: "峰谷套利，能源增值",
      description:
        "利用电价差实现储能系统经济循环，单次充放电收益达0.3元/kWh（中国江苏案例），降低电网负荷的同时创造额外收益",
    },
    {
      image: "/product/p4/part4-4.png",
      imageWidth: 280,
      imageHeight: 280,
      title: "应急护航，全域覆盖",
      colSpan: 12,
      description:
        "台风、暴雪等极端天气下，可同时为2~4台车提供DC快充（30分钟补电至80%），可日均应急服务14+小时",
    },
    {
      image: "/product/p4/part4-5.png",
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
      image: "/product/p4/part5-1.png",
      imageWidth: 394,
      imageHeight: 400,
      colSpan: 10,
    },
    {
      image: "/product/p4/part5-2.png",
      imageWidth: 590,
      imageHeight: 400,
      colSpan: 14,
    },
  ];

  return (
    <div className={styles.smartEvPage}>
      <Navbar />

      <HeroSection
        title="智慧EV充电生态体系"
        backgroundImage="/product/p4/bn.png"
      />

      <PartSection>
        <Image
          src="/product/p4/part1.png"
          alt="三位一体"
          width={1000}
          height={667}
        />
      </PartSection>
      <PartSection title="移动充电机器人六大黄金场景">
        <Image
          src="/product/p4/part2-des.png"
          alt="移动充电机器人六大黄金场景"
          width={1000}
          height={400}
        />
      </PartSection>
      <PartSectionCardList
        title="移动充电机器人核心优势"
        dataList={coreAdvantageDataList}
      />

      <PartSectionCardList
        title="应用案例-拉曼大学3*60KW绿电快充项目"
        dataList={applicationCaseDataList}
        gutter={0}
      />

      <Footer inviteShow={false} />
    </div>
  );
};

export default SmartEVChargingPage;
