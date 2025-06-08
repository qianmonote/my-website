"use client";

import React from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomTimeline from "@/components/elements/CustomTimeline";
import CustomCard from "@/components/elements/CustomCard";
import styles from "./style.module.css";

export default function About() {
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
              <div className={styles.quote}>
                <blockquote>
                  以科技为支撑推动农业发展，打造高效自、高稳定性、
                  <span className={styles.highlight}>更符合可持续发展</span>
                  ，满足全社会的需求。
                  <br />
                  技术可持续循环发展及优势经营，赋能农业企业共同繁荣。
                </blockquote>
                <cite>——全员宣言</cite>
              </div>
            </div>
          </div>
        </section>

        {/* English Mission Section */}
        <section className={styles.englishMissionSection}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>
              ONETOUCH &ldquo;MISSION AND VISION&rdquo;
            </h2>

            <div className={styles.missionGrid}>
              <div className={styles.missionCard}>
                <h3>JOIN HANDS ONETOUCH</h3>
                <h4>LEADING THE WAY TO A CARBON-NEUTRAL FUTURE</h4>

                <div className={styles.pillars}>
                  <div className={styles.pillar}>
                    <h5>SMART FARMING</h5>
                  </div>
                  <div className={styles.pillar}>
                    <h5>RENEWABLE</h5>
                    <h5>INTEGRATION</h5>
                  </div>
                  <div className={styles.pillar}>
                    <h5>CARBON</h5>
                    <h5>NEUTRALITY</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* D&D Communication Section */}
        <section className={styles.communicationSection}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>D&D COMMUNICATION</h2>

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

        {/* Join Us Section */}
        <section className={styles.joinSection}>
          <div className={styles.container}>
            <div className={styles.joinContent}>
              <p>
                We sincerely <span className={styles.highlight}>invite</span>{" "}
                visionaries to join hands,
                <br />
                share blue ocean{" "}
                <span className={styles.highlight}>opportunities</span>,
                <br />
                and create a sustainable future together!
              </p>
              <button className={styles.joinButton}>联系我们</button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
