"use client";

import React from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useI18n } from "@/context/I18nContext";
import HeroSection from "@/components/elements/HeroSection";
import PartSection, {
  PartSectionImageBox,
} from "@/components/elements/PartSection";
import styles from "./styles.module.css";
import PartSectionCardList from "@/components/elements/PartSectionCardList";

const BiomassGasificationPage = () => {
  const { lang } = useI18n();
  const commonCardList = [
    {
      image: "/product/p1/part3/01.png",
      titleZh: "偏远地区/离网能源供应",
      titleEn: "Remote Area/Off-Grid Energy Supply",
      descriptionZh:
        "1.岛屿、偏远乡村、山区：替代柴油发电，提供稳定电;<br/>2.微电网系统：与储能、太阳能、风能结合，形成独立供电系统",
      descriptionEn:
        "1. Islands, remote villages, and mountainous areas: Replace diesel power generation and provide stable electricity;<br/>2. Microgrid system: Combine with energy storage, solar energy, and wind energy to form an independent power supply system",
    },
    {
      image: "/product/p1/part3/02.png",
      titleZh: "农业废弃物资源化",
      titleEn: "Agricultural waste resource utilization",
      descriptionZh:
        "1.油棕叶、椰壳、稻壳、玉米秸秆、果树枝条等农废，通过气化转化为电力和热能；<br/>2.实现农业废弃物减量化、资源化、无害化处理",
      descriptionEn:
        "1. Oil palm leaves, coconut shells, rice husks, corn stalks, fruit tree branches and other agricultural waste are converted into electricity and heat energy through gasification;<br/>2. Achieve the reduction, resource utilization and harmless treatment of agricultural waste",
    },
    {
      image: "/product/p1/part3/03.png",
      titleZh: "工业热能与动力供应",
      titleEn: "Industrial heat and power supply",
      descriptionZh:
        "1.中小型工厂、食品加工厂、木材加工厂等：提供蒸汽、热水、热风；<br/>2.也可直接驱动内燃机发电或生产动力",
      descriptionEn:
        "1. Small and medium-sized factories, food processing plants, wood processing plants, etc.: Provide steam, hot water, and hot air;<br/>2. Can also directly drive internal combustion engines to generate electricity or produce power",
    },
    {
      image: "/product/p1/part3/04.png",
      titleZh: "商业综合体与旅游景区能源",
      titleEn: "Commercial complexes and tourist attractions energy",
      descriptionZh:
        "度假村、生态园区、旅游小镇：<br/>1.利用本地生物质（如椰壳、树枝）自给自足供能；<br/>2.配套电动汽车充电、照明、冷热水系统",
      descriptionEn:
        "1. Resorts, eco-parks, tourist towns: Use local biomass (such as coconut shells and branches) for self-sufficiency in energy supply;<br/>2. Provide electric vehicle charging, lighting, hot and cold water systems",
    },
    {
      image: "/product/p1/part3/05.png",
      titleZh: "碳资产与碳信用交易",
      titleEn: "Carbon assets and carbon credit trading",
      descriptionZh:
        "1.气化炉生产生物质炭（Biochar），用于土壤改良，同时实现碳封存；<br/>2.可参与国际碳信用交易市场，获取额外收益",
      descriptionEn:
        "1. The gasifier produces biochar, which is used for soil improvement and carbon sequestration;<br/>2. Participate in the international carbon credit trading market to obtain additional income",
    },
    {
      image: "/product/p1/part3/06.png",
      titleZh: "新能源车辆与移动能源",
      titleEn: "New Energy Vehicles and Mobile Energy",
      descriptionZh:
        "气化炉+内燃机系统可为：<br/>1.电动三轮车、电动船、电动农业机械提供发电支持。<br/>2.充当小型移动能源站",
      descriptionEn:
        "The gasifier+internal combustion engine system can provide power generation support for:<br/>1. Electric tricycles, electric boats, and electric agricultural machinery.<br/>2. Serves as a small mobile energy station",
    },
  ];
  const applicationCardList = [
    {
      image: "/product/p1/part5/01.png",
      titleZh: "油棕废弃物气化发电集成系统",
      titleEn: "Oil palm waste gasification power generation integrated system",
      descriptionZh: "（气化效率75%，单次连续发电运行 达500小时）",
      descriptionEn:
        "Gasification efficiency 75%, single continuous power generation operation up to 500 hours",
    },
    {
      image: "/product/p1/part5/02.png",
      titleZh: "首个商业化生物质综合解决方案",
      titleEn: "The first commercial integrated <br/> biomass solution",
      descriptionZh:
        "（纯干法燃气净化工艺确保气体洁净且无二次污染废水产生，发电稳定）",
      descriptionEn:
        "（Pure dry gas purification ensures clean gas and no secondary pollution wastewater, stable power generation）",
    },
    {
      image: "/product/p1/part5/03.png",
      titleZh: "联合研发二代低焦油气化系统",
      titleEn:
        "Jointly develop the second generation <br/> low tar gasification system",
      descriptionZh:
        "（单炉30~60吨/日，气化率提升至80%，尾部余热烘干原料，降低30%能耗）",
      descriptionEn:
        "Single furnace 30~60 tons/day, gasification rate increased to 80%, tail waste heat drying raw materials, reducing energy consumption by 30%",
    },
  ];

  return (
    <div className={styles.biomassPage}>
      <Navbar />

      <HeroSection
        title={
          lang === "zh"
            ? "生物质气化发电系统"
            : "Biomass Gasification Power Generation Systems".toLocaleUpperCase()
        }
        backgroundImage="/product/p1/bn/01.png"
      />

      {/* 气化原理 Section */}
      <PartSection>
        {lang === "zh" ? (
          <PartSectionImageBox>
            <Image
              src="/product/p1/part1/01-zh.png"
              alt=""
              width={1000}
              height={760.24}
              unoptimized
            />
          </PartSectionImageBox>
        ) : (
          <PartSectionImageBox>
            <Image
              src="/product/p1/part1/01-en.png"
              alt=""
              width={1000}
              height={760.24}
              unoptimized
            />
          </PartSectionImageBox>
        )}
      </PartSection>

      {/* 工艺路线 Section */}
      <PartSection>
        {lang === "zh" ? (
          <PartSectionImageBox>
            <Image
              src="/product/p1/part2/01-zh.png"
              alt=""
              width={1000}
              height={609.11}
              unoptimized
            />
          </PartSectionImageBox>
        ) : (
          <PartSectionImageBox>
            <Image
              src="/product/p1/part2/01-en.png"
              alt=""
              width={1000}
              height={603.84}
              unoptimized
            />
          </PartSectionImageBox>
        )}
      </PartSection>

      {/* 生物质热解气化炉主要使用场景 Section */}
      <PartSectionCardList
        title={
          lang === "zh"
            ? "生物质热解气化炉主要使用场景"
            : "Primary Use Cases for Biomass<br/> pyrolysis and Gasification Technologies"
        }
        dataList={commonCardList}
        defaultColSpan={8}
        defaultRowGutter={4}
        defaultImageSize={{
          imageWidth: 318,
          imageHeight: 280,
          style: {
            marginTop: 16,
          },
        }}
        contentStyle={{
          minHeight: lang === "zh" ? 150 : 210,
        }}
      />

      {/* 环保优点 Section */}
      <PartSection>
        {lang === "zh" ? (
          <PartSectionImageBox>
            <Image
              src="/product/p1/part4/01-zh.png"
              alt="生物质燃气环保优点"
              width={1000}
              height={750}
              unoptimized
            />
          </PartSectionImageBox>
        ) : (
          <PartSectionImageBox>
            <Image
              src="/product/p1/part4/01-en.png"
              alt="生物质燃气环保优点"
              width={1000}
              height={750}
              unoptimized
            />
          </PartSectionImageBox>
        )}
      </PartSection>

      {/* 应用案例 · ONETOUCH与拉曼大学联合研发 Section */}
      <PartSectionCardList
        title={
          lang === "zh"
            ? "应用案例 · ONETOUCH与拉曼大学联合研发"
            : "Application Cases · Joint research and <br/> development by ONETOUCH and UTAR".toLocaleUpperCase()
        }
        introText={
          lang === "zh"
            ? "该项目标志着我司在可再生能源领域取得双重突破：技术上完成气化效率与系统稳定发性的行业革新，战略上构建&ldquo;废弃物-绿电-碳汇&rdquo;的循环经济范式，深度契合《巴黎协定》全球控温1.5℃目标"
            : 'This project marks a double breakthrough for our company in the field of renewable energy: technically completing the industry innovation of gasification efficiency and system stability, and strategically building a circular economy paradigm of "waste-green electricity-carbon sink", which is deeply in line with the global temperature control target of 1.5℃ in the Paris Agreement.'
        }
        dataList={applicationCardList}
        defaultColSpan={8}
        defaultRowGutter={4}
        defaultImageSize={{
          imageWidth: 318,
          imageHeight: 280,
           style: {
            marginTop: 16,
          },
          unoptimized: true
        }}
        contentStyle={{
          minHeight: lang === "zh" ? 120 : 150,
        }}
      />
      <Footer inviteShow={false} />
    </div>
  );
};

export default BiomassGasificationPage;
