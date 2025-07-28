// 分布式光储充一体化系统产品介绍页面
"use client";

import React from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import styles from "./styles.module.css";
import HeroSection from "@/components/elements/HeroSection";
import SolutionCardList from "@/components/elements/SolutionCardList";
import PartSection, {
  PartSectionImageBox,
} from "@/components/elements/PartSection";
import PartSectionCardList from "@/components/elements/PartSectionCardList";
import { useI18n } from "@/context/I18nContext";

const PowerStorageIntegrationPage = () => {
  const { lang } = useI18n();
  const applicationList = [
    {
      image: "/product/p2/part3/01.jpg",
      titleZh: "居民小区/社区",
      titleEn: "Residential area/community",
      description: "",
    },
    {
      image: "/product/p2/part3/02.jpg",
      titleZh: "商业综合体（商场、超市、写字楼）",
      titleEn:
        "Commercial complex (shopping mall, supermarket, office building)",
      description: "",
    },
    {
      image: "/product/p2/part3/03.jpg",
      titleZh: "工业园区/企业园区",
      titleEn: "Industrial park/enterprise park",
      description: "",
    },
    {
      image: "/product/p2/part3/04.jpg",
      titleZh: "公共停车场/交通枢纽（机场、火车站、长途汽车站）",
      titleEn:
        "Public parking lots/transportation hubs (airports, train stations, long-distance bus stations)",
      description: "",
    },
    {
      image: "/product/p2/part3/05.jpg",
      titleZh: "公交场站/物流转运中心",
      titleEn: "Bus station/logistics transfer center",
      description: "",
    },
    {
      image: "/product/p2/part3/06.jpg",
      titleZh: "高速公路服务区",
      titleEn: "highway service area",
      description: "",
    },
    {
      image: "/product/p2/part3/07.jpg",
      titleZh: "独立/离网型充电站（海岛、偏远地区）",
      titleEn: "Independent/off-grid charging stations (islands, remote areas)",
      description: "",
    },
    {
      image: "/product/p2/part3/08.jpg",
      titleZh: "光储充职能微网/虚拟电厂节点",
      titleEn:
        "Photovoltaic storage and charging function microgrid/virtual power plant node",
      description: "",
    },
  ];
  const caseList = [
    {
      image: "/product/p2/part4/01.jpg",
      titleZh: "浙江峰仔食品有限公司",
      titleEn: "Zhejiang Fengzi Food Co., Ltd.",
      descriptionZh: "彩锅瓦结构电站",
      descriptionEn: "Colored pot tile structure power station",
    },
    {
      image: "/product/p2/part4/02.jpg",
      titleZh: "农杭州富通通讯技术股份有限公司",
      titleEn: "Hangzhou Futong Communication Technology Co., Ltd.",
      descriptionZh: "水泥墩支架结构电站",
      descriptionEn: "Cement pier support structure power station",
    },
    {
      image: "/product/p2/part4/03.jpg",
      titleZh: "衡州城东污水厂",
      titleEn: "Hengzhou Chengdong Wastewater Treatment Plant",
      descriptionZh: "钢架结构电站",
      descriptionEn: "Steel frame power station",
    },
    {
      image: "/product/p2/part4/04.jpg",
      titleZh: "浙江阮二小食品有限公司",
      titleEn: "Zhejiang Ruan'er Small Food Co., Ltd.",
      descriptionZh: "双T板屋面结构电站",
      descriptionEn: "Double T-plate roof structure power station",
    },
    {
      image: "/product/p2/part4/05.jpg",
      titleZh: "浙江仙鹤纸业",
      titleEn: "Zhejiang Xianhe Paper",
      descriptionZh: "大雁板屋面结构电站",
      descriptionEn: "Dayan board roof structure power station",
    },
    {
      image: "/product/p2/part4/06.jpg",
      titleZh: "柯城区口腔医院",
      titleEn: "Kecheng District Stomatological Hospital",
      descriptionZh: "琉璃瓦屋面结构电站",
      descriptionEn: "Glazed tile roof structure power station",
    },
  ];

  const solutionsList = [
    {
      id: "1",
      imageZh: "/product/p2/part1/01-zh.png",
      imageEn: "/product/p2/part1/01-en.png",
      imageActiveZh: "/product/p2/part1/01-active-zh.png",
      imageActiveEn: "/product/p2/part1/01-active-en.png",
    },
    {
      id: "2",
      imageZh: "/product/p2/part1/02-zh.png",
      imageEn: "/product/p2/part1/02-en.png",
      imageActiveZh: "/product/p2/part1/02-active-zh.png",
      imageActiveEn: "/product/p2/part1/02-active-en.png",
    },
    {
      id: "3",
      imageZh: "/product/p2/part1/03-zh.png",
      imageEn: "/product/p2/part1/03-en.png",
      imageActiveZh: "/product/p2/part1/03-active-zh.png",
      imageActiveEn: "/product/p2/part1/03-active-en.png",
    },
    {
      id: "4",
      imageZh: "/product/p2/part1/04-zh.png",
      imageEn: "/product/p2/part1/04-en.png",
      imageActiveZh: "/product/p2/part1/04-active-zh.png",
      imageActiveEn: "/product/p2/part1/04-active-en.png",
    },
  ];

  return (
    <div className={styles.powerStoragePage}>
      <Navbar />
      {/* 头图区 */}
      <HeroSection
        title={
          lang === "zh"
            ? "分布式光储充一体化系统"
            : "Distributed Solar Photovoltaic Power Systems".toLocaleUpperCase()
        }
        backgroundImage="/product/p2/bn/01.png"
      />

      {/* Part 1 */}
      <PartSection
        title={
          lang === "zh"
            ? "光、储、柴、充一体化智慧能源解决方案"
            : "Integrated Smart Energy Solution for Photovoltaic, <br/> Storageand Charging"
        }
      >
        <SolutionCardList solutions={solutionsList} />
      </PartSection>

      {/* Part 2 */}
      <PartSection title="">
        {lang === "zh" ? (
          <PartSectionImageBox>
            <Image
              src="/product/p2/part2/01-zh.png"
              alt=""
              width={1000}
              height={640}
               unoptimized
              style={{ marginLeft: -24, marginRight: 24 }}
            />
          </PartSectionImageBox>
        ) : (
          <PartSectionImageBox>
            <Image
              src="/product/p2/part2/01-en.png"
              alt=""
              width={1000}
              height={815}
              unoptimized
            />
          </PartSectionImageBox>
        )}
      </PartSection>

      {/* Part 3 */}
      <PartSectionCardList
        title={
          lang === "zh"
            ? "应用场景"
            : "Application Scenarios".toLocaleUpperCase()
        }
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
          minHeight: lang === "zh" ? 80 : 140,
        }}
      />

      {/* Part 4 */}
      <PartSectionCardList
        title={
          lang === "zh"
            ? "光伏电站案例"
            : "Photovoltaic power station cases".toLocaleUpperCase()
        }
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
        contentStyle={{
          minHeight: lang === "zh" ? 100 : 120,
        }}
      />
      <Footer inviteShow={false} />
    </div>
  );
};

export default PowerStorageIntegrationPage;
