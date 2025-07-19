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
    title: string;
    description: string;
    image?: {
      src: string;
      alt: string;
      width?: number;
      height?: number;
    };
    content?: React.ReactNode;
  }>({
    title: "",
    description: "",
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
      width: 1344,
      height: 400,
    },
    {
      imageZh: "/about/carousel/02-zh.png",
      imageEn: "/about/carousel/02-en.png",
      alt: "",
      width: 1344,
      height: 400,
    },
  ];

  return (
    <>
      <Navbar />
      <main className={styles.aboutPage}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.heroImage}>
            <Image
              src="/about/about-banner.png"
              alt=""
              width={1280}
              height={662}
              style={{ objectFit: "cover" }}
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
              STRATEGIC COOPERATION AND MILESTONES
            </h2>
            <CustomTimeline
              items={[
                {
                  label: (
                    <Image
                      src="/about/part-1.png"
                      alt="合作历程第一阶段"
                      width={120}
                      height={180}
                    />
                  ),
                  children: (
                    <CustomCard
                      mode="textOnly"
                      title="Company Establishment"
                      description="Founded on August 11, 2021, located in Penang, Malaysia"
                    />
                  ),
                },
                {
                  label: (
                    <Image
                      src="/about/part-2.png"
                      alt="合作历程第一阶段"
                      width={120}
                      height={180}
                    />
                  ),
                  children: (
                    <CustomCard
                      image={{
                        src: "/about/part-2-cont.png",
                        alt: "第二阶段详情",
                        width: 756,
                        height: 442,
                      }}
                      title='Signed a "Biomass Gasification Technology Research Cooperation Agreement" with the University of Raman in 2024'
                      description="The waste-to-energy system will be deployed in resort areas and urban centers..."
                      moreButton={{
                        text: "View>>",
                        onClick: () =>
                          handleViewDetails({
                            title:
                              "Biomass Gasification Technology Research Cooperation Agreement",
                            description: `The waste-to-energy system will be deployed in resort areas and urban centers, providing sustainable energy solutions for high-energy-consuming industries. This innovative technology converts biomass waste into clean energy, reducing carbon emissions and promoting environmental sustainability.

Key Features:
• Advanced gasification technology for efficient waste conversion
• Integration with existing energy infrastructure
• Scalable solution for various industrial applications
• Real-time monitoring and control systems
• Compliance with international environmental standards

The partnership with the University of Raman represents a significant milestone in our commitment to sustainable energy development and technological innovation.`,
                            image: {
                              src: "/about/part-2-cont.png",
                              alt: "生物质气化技术研究合作",
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
                        src: "/about/part-3-cont.png",
                        alt: "第三阶段详情",
                        width: 756,
                        height: 442,
                      }}
                      title="Promoting solar-powered electric vehicle charging stations in the Maldives"
                      description="Deepen the research and development of palm waste energy technology, build..."
                      moreButton={{
                        text: "View>>",
                        onClick: () =>
                          handleViewDetails({
                            title:
                              "Solar-Powered EV Charging Stations in the Maldives",
                            description: `We are deepening the research and development of palm waste energy technology, building a comprehensive renewable energy ecosystem in the Maldives. This project focuses on establishing solar-powered electric vehicle charging infrastructure across the island nation.

Project Highlights:
• Solar energy integration with EV charging infrastructure
• Palm waste biomass energy conversion systems
• Smart grid technology for optimal energy distribution
• Carbon-neutral transportation solutions
• Sustainable tourism infrastructure development

The Maldives project demonstrates our commitment to creating sustainable energy solutions for island nations and promoting the adoption of clean transportation technologies. This initiative will serve as a model for similar projects in other coastal and island regions.`,
                            image: {
                              src: "/about/part-3-cont.png",
                              alt: "马尔代夫太阳能充电站项目",
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
              ONETOUCH &ldquo;MISSION AND VISION&rdquo;
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
              <Carousel autoplay ref={carouselRef}>
                {carouselItems.map((item, index) => (
                  <div className={styles.carouselItem} key={index}>
                    <Image
                      src={lang === "zh" ? item.imageZh : item.imageEn}
                      alt={item.alt}
                      width={item.width}
                      height={item.height}
                      priority
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
            {/* <h2 className={styles.sectionTitle}>
              ONETOUCH &ldquo;MISSION AND VISION&rdquo;
            </h2> */}
          </div>
          <Image
            src="/about/mission-desc.png"
            alt=""
            width={1400}
            height={513}
            style={{ width: "100%", height: "auto" }}
          />
        </section>

        {/* D&D Communication Section */}
        <section className={styles.communicationSection}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>DAO COMMUNICATION</h2>
            <Image
              src="/about/divider.png"
              alt=""
              width={1000}
              height={32}
              style={{ width: "100%", height: "auto" }}
            />
            <div className={styles.communicationContent}>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* 详情弹窗 */}
      <DetailModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title={modalData.title}
        description={modalData.description}
        image={modalData.image}
        content={modalData.content}
      />

      <Footer />
    </>
  );
}
