"use client";

import React, { useState, useEffect } from "react";
import { Card, Avatar } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { useI18n } from "@/context/I18nContext";
import "swiper/css";
import "swiper/css/pagination";
import "./index.css";

const Team: React.FC = () => {
  const { t } = useI18n();
  const [isMobile, setIsMobile] = useState(false);

  // 检测屏幕尺寸
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1000);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  const team = [
    {
      name: "Lim Chor Seng",
      title: "Managing Director <br/> AgriTech & <br/> Green Energy Innovator",
      desc: "",
      avatar: "/team/avatar/01.png",
      role: "company side",
    },
    {
      name: "GONG CHUNQIN",
      title: "Chief Technical Engineer <br/> PhD in Environmental Engineering",
      desc: "",
      avatar: "/team/avatar/02.png",
      role: "company side",
    },
    {
      name: "Te Kwan Wai",
      title: "Head of PR <br/> Over 6 years of industry experience",
      desc: "",
      avatar: "/team/avatar/03.png",
      role: "company side",
    },
    {
      name: "Ts. Dr. Wong Ling Yong",
      title: "Principle Investigator <br/> Engineering and Green Technology",
      desc: "",
      avatar: "/team/avatar/04.png",
      role: "UTAR",
    },
    {
      name: "Ir. Ts. Dr. Leong Kah Hon",
      title: "Team Member <br/> Engineering and Green Technology",
      desc: "",
      avatar: "/team/avatar/05.png",
      role: "UTAR",
    },
    {
      name: "Prof. Ir. Dr. Ng Choon Aun",
      title: "Team Member <br/> Engineering and Green Technology",
      desc: "",
      avatar: "/team/avatar/06.png",
      role: "UTAR",
    },
    {
      name: "Ts. Dr. Nor Faiza binti Abd Rahman",
      title: "Team Member <br/> Engineering and Green Technology",
      desc: "",
      avatar: "/team/avatar/07.png",
      role: "UTAR",
    },
    {
      name: "Dr. Leong Siew Yoong",
      title: "Team Member <br/> Engineering and Green Technology",
      desc: "",
      avatar: "/team/avatar/08.png",
      role: "UTAR",
    },
    {
      name: "Dr. Chai Meei Tyng",
      title: "Team Member <br/> Information and Communication <br/>Technology",
      desc: "",
      avatar: "/team/avatar/09.png",
      role: "UTAR",
    },
    {
      name: "Dr. Goh Chuan Meng",
      title: "Team Member <br/> Information and Communication <br/>Technology",
      desc: "",
      avatar: "/team/avatar/10.png",
      role: "UTAR",
    },
  ];

  return (
    <section className="c-team-section-wrap">
      <div className="team-section-content">
        <div className="team-section-title">{t("missionTitle")}</div>
        <div className="team-swiper-container">
          <Swiper
            grabCursor={true}
            centeredSlides={!isMobile}
            slidesPerView={isMobile ? 1 : 5}
            spaceBetween={isMobile ? 0 : -20}
            loop={true}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            autoplay={{
              delay: 4000000000000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            speed={800}
            modules={[Pagination, Autoplay]}
            className={`team-swiper ${isMobile ? "mobile-swiper" : ""}`}
          >
            {team.map((member, idx) => (
              <SwiperSlide key={idx}>
                {({ isActive, isPrev, isNext }) => (
                  <div
                    className={`team-card ${
                      isMobile
                        ? "mobile-card"
                        : isActive
                        ? "swiper-slide-active"
                        : isPrev || isNext
                        ? "swiper-slide-adjacent"
                        : ""
                    }`}
                    style={{ cursor: "pointer" }}
                  >
                    <Card
                      className="team-member-card"
                      styles={{
                        body: {
                          padding: "24px 10px",
                          background:
                            isMobile || isActive ? "#1677FF" : "#1B2B65",
                          borderRadius: "10px",
                        },
                      }}
                    >
                      <div className="card-header">
                        <div className="member-role">{member.role}</div>
                      </div>

                      <div className="member-avatar-section">
                        <Avatar src={member.avatar} className="member-avatar" />
                      </div>

                      <div className="member-info">
                        <h3 className="member-name">{member.name}</h3>
                        <div className="member-title">
                          <div
                            dangerouslySetInnerHTML={{ __html: member.title }}
                          />
                        </div>
                        <div className="member-desc">{member.desc}</div>
                      </div>
                    </Card>
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Team;
