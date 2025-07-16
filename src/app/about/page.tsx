"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomTimeline from "@/components/elements/CustomTimeline";
import CustomCard from "@/components/elements/CustomCard";
import { Carousel } from "antd";
import type { CarouselRef } from "antd/es/carousel";
import styles from "./style.module.css";

export default function About() {
  const carouselRef = useRef<CarouselRef>(null);
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
                        onClick: () => console.log("查看详情"),
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
                      title="Promoting solar-powered electric vehicle charging stations in the Maldives"
                      description="Deepen the research and development of palm waste energy technology, build..."
                      moreButton={{
                        text: "View>>",
                        onClick: () => console.log("查看详情"),
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
                <Image
                  src="/about/mission-carousel-1.png"
                  alt=""
                  width={1000}
                  height={400}
                  priority
                />
              </Carousel>
            </div>
          </div>
        </section>

        {/* English Mission Section */}
        <section className={styles.englishMissionSection}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>
              ONETOUCH &ldquo;MISSION AND VISION&rdquo;
            </h2>
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
      <Footer />
    </>
  );
}
