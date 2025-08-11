"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomTimeline from "@/components/elements/CustomTimeline";
import CustomCard from "@/components/elements/CustomCard";
import DetailModal from "@/components/elements/DetailModal";
import { Carousel } from "antd";
import type { CarouselRef } from "antd/es/carousel";
import { useI18n } from "@/context/I18nContext";
import styles from "./style.module.css";

export default function About() {
  const { lang } = useI18n();
  const carouselRef = useRef<CarouselRef>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState<{
    titleZh: string;
    titleEn: string;
    descriptionZh: string;
    descriptionEn: string;
    image?: {
      src: string;
      alt: string;
      width?: number;
      height?: number;
    };
    content?: React.ReactNode;
  }>({
    titleZh: "",
    titleEn: "",
    descriptionZh: "",
    descriptionEn: "",
  });

  // 处理查看详情
  const handleViewDetails = (data: typeof modalData) => {
    setModalData(data);
    setModalVisible(true);
  };

  const carouselItems = [
    {
      imageZh: "/about/carousel/01-zh.png",
      imageEn: "/about/carousel/01-en.png",
      alt: "",
      width: 1000,
      height: 400,
    },
    {
      imageZh: "/about/carousel/02-zh.png",
      imageEn: "/about/carousel/02-en.png",
      alt: "",
      width: 1000,
      height: 400,
    },
  ];

  return (
    <>
      <Navbar />
      <main className={styles.aboutPage}>
        <section className={styles.heroSection}>
          <div className={styles.heroImage}>
            <Image
              src="/about/about-banner.png"
              alt=""
              width={1000}
              height={297}
              unoptimized
            />
          </div>
          <div className={styles.scrollIndicator}>
            <div className={styles.arrow}>
              <Image
                src="/about/arrow-down.png"
                alt=""
                width={45}
                height={73}
              />
            </div>
          </div>
        </section>

        {/* Strategic Cooperation Section */}
        <section className={styles.cooperationSection}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>
              {lang === "zh"
                ? "战略合作与里程碑"
                : "Strategic Cooperation and Milestones"}
            </h2>
            <CustomTimeline
              items={[
                {
                  label: (
                    <Image
                      src="/about/part-1.png"
                      alt=""
                      width={120}
                      height={180}
                    />
                  ),
                  children: (
                    <CustomCard
                      mode="textOnly"
                      titleEn="Company Strategic Partnerships and Milestones"
                      titleZh="战略合作与里程碑"
                      descriptionEn="Founded on August 11, 2021, in Penang, Malaysia"
                      descriptionZh="成立于 2021 年 8 月 11 日，位于马来西亚槟城"
                    />
                  ),
                },
                {
                  label: (
                    <Image
                      src="/about/part-2.png"
                      alt=""
                      width={120}
                      height={180}
                    />
                  ),
                  children: (
                    <CustomCard
                      image={{
                        src: "/about/part-2-cont.jpg",
                        alt: "",
                        width: 756,
                        height: 442,
                      }}
                      titleZh="2024 年与拉曼大学签署《生物质气化技术研究合作协议》（MOA）"
                      titleEn="And the words change to Signed a MoA with UTAR University Kampar Campus"
                      descriptionZh="深化棕榈废弃物全链条能源化技术研发构建标准化技术模块并纳入国家可再生能源认证体系，形成可复制的棕榈生物质能解决方案，推动其在智能电网协同、区域能源替代及碳交易机制中的规模化应用。"
                      descriptionEn="Deepen the research and development of palm waste energy technology, build standardized technical modules, form replicable palm biomass energy solutions, and promote its large-scale application in smart grid coordination, regional energy substitution and carbon trading mechanisms."
                      moreButton={{
                        text: "View>>",
                        onClick: () =>
                          handleViewDetails({
                            titleZh: "2024 年与拉曼大学签署《生物质气化技术研究合作协议》（MOA）",
                            titleEn: "And the words change to Signed a MoA with UTAR University Kampar Campus",
                            descriptionZh: "深化棕榈废弃物全链条能源化技术研发构建标准化技术模块并纳入国家可再生能源认证体系，形成可复制的棕榈生物质能解决方案，推动其在智能电网协同、区域能源替代及碳交易机制中的规模化应用。",
                            descriptionEn: "Deepen the research and development of palm waste energy technology, build standardized technical modules, form replicable palm biomass energy solutions, and promote its large-scale application in smart grid coordination, regional energy substitution and carbon trading mechanisms.",
                            image: {
                              src: "/about/part-2-cont.jpg",
                              alt: "",
                              width: 756,
                              height: 442,
                            },
                          }),
                      }}
                    />
                  ),
                },
                {
                  label: (
                    <Image
                      src="/about/part-3.png"
                      alt="合作历程第三阶段"
                      width={120}
                      height={180}
                    />
                  ),
                  children: (
                    <CustomCard
                      image={{
                        src: "/about/part-3-cont.jpg",
                        alt: "",
                        width: 756,
                        height: 442,
                      }}
                      titleZh="在马尔代夫推进太阳能驱动&apos;型电动汽车充电站"
                      titleEn="Promoting solar-powered electric vehicle charging stations in the Maldives"
                      descriptionEn="The waste-to-energy system will be deployed in resorts and urban centers, demonstrating Malaysia’s green technology export capabilities"
                      descriptionZh="与废物能源化系统部署，涵盖度假区与城市中心，彰显马来西亚绿色技术输出能力"
                      moreButton={{
                        text: "View>>",
                        onClick: () =>
                          handleViewDetails({
                            titleZh: "在马尔代夫推进太阳能驱动型电动汽车充电站",
                            titleEn: "Promoting solar-powered electric vehicle charging stations in the Maldives",
                            descriptionZh: "与废物能源化系统部署，涵盖度假区与城市中心，彰显马来西亚绿色技术输出能力",
                            descriptionEn: "The waste-to-energy system will be deployed in resorts and urban centers, demonstrating Malaysia's green technology export capabilities",
                            image: {
                              src: "/about/part-3-cont.jpg",
                              alt: "",
                              width: 756,
                              height: 442,
                            },
                          }),
                      }}
                    />
                  ),
                },
              ]}
            />
          </div>
        </section>

        {/* Mission and Vision Section */}
        <section className={styles.missionSection}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>
              {lang === "zh"
                ? "ONETOUCH使命愿景"
                : "ONETOUCH Mission and Vision"}
            </h2>

            <div className={styles.missionContent}>
              <div
                className={styles.turnLeft}
                onClick={() => carouselRef?.current?.prev()}
              />
              <div
                className={styles.turnRight}
                onClick={() => carouselRef?.current?.next()}
              />
              <Carousel autoplay ref={carouselRef} dots={false}>
                {carouselItems.map((item, index) => (
                  <div className={styles.carouselItem} key={index}>
                    <Image
                      src={lang === "zh" ? item.imageZh : item.imageEn}
                      alt=""
                      width={item.width}
                      height={item.height}
                      unoptimized
                      className={styles.carouselImage}
                    />
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        </section>

        {/* English Mission Section */}
        <section className={styles.englishMissionSection}>
          <div className={styles.container}>
          </div>
          <Image
            src={
              lang === "zh"
                ? "/about/mission-desc-zh.png"
                : "/about/mission-desc-en.png"
            }
            alt=""
            width={1400}
            height={529}
            unoptimized
            style={{ width: "100%", height: "auto" }}
          />
        </section>

        {/* D&D Communication Section */}
        <section className={styles.communicationSection}>
          <div className={styles.container}>
            <Image
              src="/about/divider.png"
              alt=""
              width={1000}
              height={32}
              style={{ width: "100%", height: "auto" }}
            />
            <div className={styles.communicationContent}>
              {lang === "zh" && (
                <p>
                  马来西亚槟城——亚太绿色枢纽，ONETOUCH以技术融合创新驱动热带碳中和革命。整合光伏、储能、生物质转化与智能农机核心板块，构建&lsquo;能源生产-充电优化-资源再生&rsquo;全链闭环，赋能工农业低碳转型。依托区域政策红利与全球创新资源，转化农林废弃物为清洁能源，系统性降低能耗、碳排与运营成本。作为东南亚绿色经济崛起的战略引擎，我们持续拓展新能源应用场景与商业边界。
                </p>
              )}
              {lang === "en" && (
                <p>
                  Based in Penang, Malaysia, the Asia-Pacific green hub,
                  ONETOUCH drives the tropical carbon neutrality revolution with
                  technology integration and innovation. Integrating the core
                  sectors of photovoltaics, energy storage, biomass conversion
                  and intelligent agricultural machinery, we build a full-chain
                  closed loop of &quot;energy production-charging
                  optimization-resource regeneration&quot; to enable the low-carbon
                  transformation of industry and agriculture. Relying on
                  regional policy dividends and global innovation resources, we
                  transform agricultural and forestry waste into clean energy,
                  systematically reducing energy consumption, carbon emissions
                  and operating costs. As a strategic engine for the rise of
                  Southeast Asia&apos;s green economy, we continue to expand new
                  energy application scenarios and business boundaries.
                </p>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* 详情弹窗 */}
      <DetailModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title={lang === "zh" ? modalData.titleZh : modalData.titleEn}
        description={lang === "zh" ? modalData.descriptionZh : modalData.descriptionEn}
        image={modalData.image}
        content={modalData.content}
      />

      <Footer />
    </>
  );
}
