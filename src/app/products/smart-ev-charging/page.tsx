"use client";

import React from "react";
import { Row, Col } from "antd";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/elements/HeroSection";
import PartSection, {
  PartSectionImageBox,
} from "@/components/elements/PartSection";
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
      titleZh: "灵活补能，随需而动",
      titleEn: "Flexible Charging, Meet Your Needs",
      descriptionZh:
        "无需电网、基建审批，自动驾驶精准响应高需求区域，适配老旧小区、景区等电容不足场景。90-150kWh储能容量，可单日服务20+ 辆新能源车，充电效率提升30%",
      descriptionEn:
        "No grid or infrastructure approval is required, and autonomous driving can accurately respond to high-demand areas, adapting to old residential areas, scenic spots and other scenes with insufficient capacitance. 90-150kWh energy storage capacity, can serve 20+ new energy vehicles per day, and charging efficiency is increased by 30%.",
    },
    {
      image: "/product/p4/part4/02.png",
      imageWidth: 280,
      imageHeight: 280,
      titleZh: "智能调度，降本增效",
      titleEn:
        "Intelligent scheduling, cost reduction <br/> and efficiency improvement",
      descriptionZh:
        "桩找车”模式减少30%用户等待时间，单台机器人替代4-5个固定桩，空间利用率提升50%。手机APP一键召唤，充电桩直达车位",
      descriptionEn:
        "The 'pile-find-car' mode reduces user waiting time by 30%. A single robot replaces 4-5 fixed piles, increasing space utilization by 50%.One-click call on the mobile APP allows the charging pile to reach the parking space directly.",
    },
    {
      image: "/product/p4/part4/03.png",
      imageWidth: 280,
      imageHeight: 280,
      titleZh: "峰谷套利，能源增值",
      titleEn: "Peak-valley arbitrage, <br/> energy value-added",
      descriptionZh:
        "利用电价差实现储能系统经济循环，单次充放电收益达0.3元/kWh（中国江苏案例），降低电网负荷的同时创造额外收益",
      descriptionEn:
        "The economic cycle of energy storage system is realized by using the price difference of electricity. The profit of a single charge and discharge is 0.3 yuan/kWh (China Jiangsu case), which reduces the load on the power grid and creates additional income.",
    },
    {
      image: "/product/p4/part4/04.png",
      imageWidth: 280,
      imageHeight: 280,
      colSpan: 12,
      titleZh: "应急护航，全域覆盖",
      titleEn: "Emergency escort, full coverage",
      descriptionZh:
        "台风、暴雪等极端天气下，可同时为2~4台车提供DC快充（30分钟补电至80%），可日均应急服务14+小时",
      descriptionEn:
        "In extreme weather conditions such as typhoons and blizzards, it can provide DC fast charging for 2 to 4 vehicles at the same time (recharging to 80% in 30 minutes), providing emergency service for 14+ hours per day",
    },
    {
      image: "/product/p4/part4/05.png",
      imageWidth: 280,
      imageHeight: 280,
      colSpan: 12,
      titleZh: "全链无人化，体验升级",
      titleEn: "Unmanned whole chain, upgraded experience",
      descriptionZh:
        "自动导航、插枪、结算全流程无人化，适配高速、商场、老旧社区、服务区等高频场景，充电完成即自动返航，用户行程零干扰",
      descriptionEn:
        "The whole process of automatic navigation, gun insertion and settlement is unmanned, which is suitable for high-frequency scenes such as highways, shopping malls, old communities, and service areas. It will automatically return to the destination after charging is completed, and the user's journey will not be disturbed.",
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
      title: "下载与注册",
      description: "收集各种电桩设施数据作为初始资料",
      defaultImageZh: "/product/p4/part3/01-zh.png",
      defaultImageEn: "/product/p4/part3/01-en.png",
      imageActive: "/product/p4/part3/01-active.png",
    },
    {
      step: 2,
      title: "选择充电模式",
      description: "将收集的原料数据转换为小的颗粒",
      defaultImageZh: "/product/p4/part3/02-zh.png",
      defaultImageEn: "/product/p4/part3/02-en.png",
      imageActive: "/product/p4/part3/02-active.png",
    },
    {
      step: 3,
      title: "查找充电桩",
      description: "地图查找附近充电桩",
      defaultImageZh: "/product/p4/part3/03-zh.png",
      defaultImageEn: "/product/p4/part3/03-en.png",
      imageActive: "/product/p4/part3/03-active.png",
    },
    {
      step: 4,
      title: "预约上门服务/导航",
      description: "输入位置，选择时间/导航至固定位置",
      defaultImageZh: "/product/p4/part3/04-zh.png",
      defaultImageEn: "/product/p4/part3/04-en.png",
      imageActive: "/product/p4/part3/04-active.png",
    },
    {
      step: 5,
      title: "服务确认",
      description: "查看路线，接收确认信息",
      defaultImageZh: "/product/p4/part3/05-zh.png",
      defaultImageEn: "/product/p4/part3/05-en.png",
      imageActive: "/product/p4/part3/05-active.png",
    },
    {
      step: 6,
      title: "启动充电",
      description: "现场扫码/APP远程启动",
      defaultImageZh: "/product/p4/part3/06-zh.png",
      defaultImageEn: "/product/p4/part3/06-en.png",
      imageActive: "/product/p4/part3/06-active.png",
    },
    {
      step: 7,
      title: "充电进行中",
      description: "用户连接设备，在线同步数据",
      defaultImageZh: "/product/p4/part3/07-zh.png",
      defaultImageEn: "/product/p4/part3/07-en.png",
      imageActive: "/product/p4/part3/07-active.png",
    },
    {
      step: 8,
      title: "支付与完成",
      description: "自动结算，评价服务",
      defaultImageZh: "/product/p4/part3/08-zh.png",
      defaultImageEn: "/product/p4/part3/08-en.png",
      imageActive: "/product/p4/part3/08-active.png",
    },
  ];

  return (
    <div className={styles.smartEvPage}>
      <Navbar />

      <HeroSection
        title={
          lang === "zh"
            ? "智慧EV充电生态体系"
            : "Distributed Solar Photovoltaic Power Systems".toLocaleUpperCase()
        }
        backgroundImage="/product/p4/bn/01.png"
        backgroundSize="cover"
      />
      {/* Part1 */}
      <PartSection>
        {lang === "zh" ? (
          <PartSectionImageBox>
            <Image
              src="/product/p4/part1/01-zh.png"
              alt=""
              unoptimized={true}  
              width={1000}
              height={667}
            />
          </PartSectionImageBox>
        ) : (
          <PartSectionImageBox>
            <Image
              src="/product/p4/part1/01-en.png"
              alt=""
              width={1000}
              height={779}
            />
          </PartSectionImageBox>
        )}
      </PartSection>
      {/* Part2 移动充电机器人六大黄金场景*/}
      <PartSection
        title={
          lang === "zh"
            ? "移动充电机器人六大黄金场景"
            : "Six golden scenarios for mobile charging robots".toLocaleUpperCase()
        }
      >
        {lang === "zh" ? (
          <PartSectionImageBox>
            <Image
              src="/product/p4/part2/01-zh.png"
              alt=""
              unoptimized={true}  
              width={1000}
              height={400}
            />
          </PartSectionImageBox>
        ) : (
          <PartSectionImageBox>
            <Image
              src="/product/p4/part2/01-en.png"
              alt=""
              unoptimized={true}  
              width={1000}
              height={400}
            />
          </PartSectionImageBox>
        )}
      </PartSection>
      {/* Part3 */}
      <PartSection
        title={
          <div className={styles.part3SectionTitle}>
            {lang === "zh"
              ? "EV充电专用APP——DC-CAT"
              : "EV Charging Special APP——DC-CAT".toLocaleUpperCase()}
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
        title={
          lang === "zh"
            ? "移动充电机器人核心优势"
            : "Core advantages of mobile charging robots".toLocaleUpperCase()
        }
        dataList={coreAdvantageDataList}
        contentStyle={{
          minHeight: lang === "zh" ? 140 : 180,
        }}
      />
      {/* Part5 */}
      <PartSection
        title={
          lang === "zh" ? (
            "应用案例-拉曼大学3*60KW绿电快充项目"
          ) : (
            <div className={styles.part5SectionTitle}>
              {"Application Case-Laman University".toLocaleUpperCase()} <br />
              <div className={styles.part5SectionSubTitle}>
                3*60KW Green Power Fast Charging Project
              </div>
            </div>
          )
        }
      >
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
