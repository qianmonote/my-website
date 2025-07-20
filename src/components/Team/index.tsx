"use client";

import React, { useState, useEffect, useRef } from "react";
import { Card, Avatar } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { useI18n } from "@/context/I18nContext";
import "swiper/css";
import "swiper/css/pagination";
import "./index.css";

const Team: React.FC = () => {
  const { t } = useI18n();
  const [isMobile, setIsMobile] = useState(false);
  const swiperRef = useRef<SwiperType | null>(null);

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
      key: 0,
      name: "Lim Chor Seng",
      title: "Managing Director <br/> AgriTech & <br/> Green Energy Innovator",
      desc: "",
      avatar: "/team/avatar/01.png",
      role: "company side",
    },
    {
      key: 1,
      name: "GONG CHUNQIN",
      title: "Chief Technical Engineer <br/> PhD in Environmental Engineering",
      desc: "",
      avatar: "/team/avatar/02-r.png",
      role: "company side",
    },
    {
      key: 2,
      name: "Te Kwan Wai",
      title: "Head of PR <br/> Over 6 years of industry experience",
      desc: "",
      avatar: "/team/avatar/03.png",
      role: "company side",
    },
    {
      key: 3,
      name: "Ts. Dr. Wong Ling Yong",
      title: "Principle Investigator <br/> Engineering and Green Technology",
      desc: "",
      avatar: "/team/avatar/04-r.png",
      role: "UTAR",
    },
    {
      key: 4,
      name: "Ir. Ts. Dr. Leong Kah Hon",
      title: "Team Member <br/> Engineering and Green Technology",
      desc: "",
      avatar: "/team/avatar/05-r.png",
      role: "UTAR",
    },
    {
      key: 5,
      name: "Prof. Ir. Dr. Ng Choon Aun",
      title: "Team Member <br/> Engineering and Green Technology",
      desc: "",
      avatar: "/team/avatar/06-r.png",
      role: "UTAR",
    },
    {
      key: 6,
      name: "Ts. Dr. Nor Faiza binti Abd Rahman",
      title: "Team Member <br/> Engineering and Green Technology",
      desc: "",
      avatar: "/team/avatar/07-r.png",
      role: "UTAR",
    },
    {
      key: 7,
      name: "Dr. Leong Siew Yoong",
      title: "Team Member <br/> Engineering and Green Technology",
      desc: "",
      avatar: "/team/avatar/08-r.png",
      role: "UTAR",
    },
    {
      key: 8,
      name: "Dr. Chai Meei Tyng",
      title: "Team Member <br/> Information and Communication <br/>Technology",
      desc: "",
      avatar: "/team/avatar/09-r.png",
      role: "UTAR",
    },
    {
      key: 9,
      name: "Dr. Goh Chuan Meng",
      title: "Team Member <br/> Information and Communication <br/>Technology",
      desc: "",
      avatar: "/team/avatar/10-r.png",
      role: "UTAR",
    },
  ];

  // 处理卡片点击事件
  const handleCardClick = (index: number) => {
    if (swiperRef.current) {
      // 使用 slideToLoop 方法，专门用于 loop 模式下的跳转
      swiperRef.current.slideToLoop(index);
      // 然后重新开始自动播放，从当前卡片开始
      swiperRef.current.autoplay.start();
    }
  };

  return (
    <section className="c-team-section-wrap">
      <div className="team-section-content">
        <div className="team-section-title">{t("missionTitle")}</div>
        <div className="team-swiper-container">
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={isMobile ? 1 : 5}
            spaceBetween={isMobile ? 0 : 10}
            loop={true}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            autoplay={{
              delay: 3000000000000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            speed={800}
            modules={[Pagination, Autoplay]}
            className={`team-swiper ${isMobile ? "mobile-swiper" : ""}`}
          >
            {team.map((member, idx) => (
              <SwiperSlide key={member.key}>
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
                    onClick={() => handleCardClick(idx)}
                  >
                    <Card
                      className="team-member-card"
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
