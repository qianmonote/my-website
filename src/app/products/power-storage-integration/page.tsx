// 分布式光储充一体化系统产品介绍页面
"use client";

import React from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import styles from "./styles.module.css";
import HeroSection from "@/components/elements/HeroSection";
import SolutionCardList from "@/components/elements/SolutionCardList";
import PartSection from "@/components/elements/PartSection";
import PartSectionCardList from "@/components/elements/PartSectionCardList";

const PowerStorageIntegrationPage = () => {
  const applicationList = [
    {
      image: "/product/p2/part3/01.jpg",
      title: "居民小区/社区",
      description: "",
    },
    {
      image: "/product/p2/part3/02.jpg",
      title: "商业综合体（商场、超市、写字楼）",
      description: "",
    },
    {
      image: "/product/p2/part3/03.jpg",
      title: "工业园区/企业园区",
      description: "",
    },
    {
      image: "/product/p2/part3/04.jpg",
      title: "公共停车场/交通枢纽（机场、火车站、长途汽车站）",
      description: "",
    },
    {
      image: "/product/p2/part3/05.jpg",
      title: "公交场站/物流转运中心",
      description: "",
    },
    {
      image: "/product/p2/part3/06.jpg",
      title: "高速公路服务区",
      description: "",
    },
    {
      image: "/product/p2/part3/07.jpg",
      title: "独立/离网型充电站（海岛、偏远地区）",
      description: "",
    },
    {
      image: "/product/p2/part3/08.jpg",
      title: "光储充职能微网/虚拟电厂节点",
      description: "",
    },
  ];
  const caseList = [
    {
      image: "/product/p2/part4/01.jpg",
      title: "浙江峰仔食品有限公司",
      description: "彩锅瓦结构电站",
    },
    {
      image: "/product/p2/part4/02.jpg",
      title: "农杭州富通通讯技术股份有限公司",
      description: "水泥墩支架结构电站",
    },
    {
      image: "/product/p2/part4/03.jpg",
      title: "衡州城东污水厂",
      description: "钢架结构电站",
    },
    {
      image: "/product/p2/part4/04.jpg",
      title: "浙江阮二小食品有限公司",
      description: "双T板屋面结构电站",
    },
    {
      image: "/product/p2/part4/05.jpg",
      title: "浙江仙鹤纸业",
      description: "大雁板屋面结构电站",
    },
    {
      image: "/product/p2/part4/06.jpg",
      title: "柯城区口腔医院",
      description: "琉璃瓦屋面结构电站",
    },
  ];

  return (
    <div className={styles.powerStoragePage}>
      <Navbar />
      {/* 头图区 */}
      <HeroSection
        title="分布式光储充一体化系统"
        backgroundImage="/product/p2/bn.jpg"
      />

      {/* Part 1 */}
      <PartSection title="光、储、柴、充一体化智慧能源解决方案">
        <SolutionCardList />
      </PartSection>

      {/* Part 2 */}
      <PartSection title="">
        <Image
          src="/product/p2/part2/01.png"
          alt="分布式光储充一体化系统"
          width={500}
          height={640}
          style={{ marginLeft: -24, marginRight: 24 }}
        />
        <Image
          src="/product/p2/part2/02.png"
          alt="分布式光储充一体化系统"
          width={500}
          height={640}
        />
      </PartSection>

      {/* Part 3 */}
      <PartSectionCardList
        title="应用场景"
        dataList={applicationList}
        defaultColSpan={6}
        defaultRowGutter={4}
        defaultImageSize={{
          imageWidth: 238,
          imageHeight: 280,
          style: {
            marginTop: 16,
          },
        }}
        titleUnderlinePlacement="top"
        contentStyle={{
          minHeight: 90,
        }}
      />

      {/* Part 4 */}
      <PartSectionCardList
        title="光伏电站案例"
        dataList={caseList}
        defaultColSpan={8}
        defaultRowGutter={4}
        defaultImageSize={{
          imageWidth: 328,
          imageHeight: 280,
          style: {
            marginTop: 16,
          },
        }}
      />
      <Footer inviteShow={false} />
    </div>
  );
};

export default PowerStorageIntegrationPage;
