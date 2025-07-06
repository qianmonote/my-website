"use client";

import React from "react";
import { Card, Avatar, Button } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { useI18n } from "@/context/I18nContext";
import "swiper/css";
import "swiper/css/pagination";
import "./index.css";

const Team: React.FC = () => {
  const { t } = useI18n();
  const team = [
    {
      name: "Ts Dr Wong Ling Yang",
      title: "PRINCIPLE INVESTIGATOR",
      desc: "UNIVERSITI TUNKU ABDUL RAHMAN",
      avatar: "/team/avatar1.png",
      role: "TEAM MEMBER",
    },
    {
      name: "Lim Chor Seng",
      title: "MANAGING DIRECTOR",
      desc: "AgriTech & Green Energy Innovator",
      avatar: "/team/avatar2.png",
      role: "INDUSTRY EXPERTS",
    },
    {
      name: "Gong Chunpin",
      title: "CHIEF TECHNICAL ENGINEER",
      desc: "XXXXXXXXXXXXXX",
      avatar: "/team/avatar3.png",
      role: "TEAM MEMBER",
    },
    {
      name: "Dr. Sarah Chen",
      title: "RESEARCH DIRECTOR",
      desc: "Sustainable Energy Research",
      avatar: "/team/avatar1.png",
      role: "TEAM MEMBER",
    },
    {
      name: "Michael Zhang",
      title: "SENIOR ENGINEER",
      desc: "Power Systems Integration",
      avatar: "/team/avatar2.png",
      role: "TEAM MEMBER",
    },
    {
      name: "Dr. Lisa Wang",
      title: "PROJECT MANAGER",
      desc: "Green Technology Solutions",
      avatar: "/team/avatar3.png",
      role: "TEAM MEMBER",
    },
    {
      name: "James Lee",
      title: "DEVELOPMENT LEAD",
      desc: "Smart Grid Technologies",
      avatar: "/team/avatar1.png",
      role: "TEAM MEMBER",
    },
    {
      name: "Emma Chen",
      title: "SYSTEM ARCHITECT",
      desc: "Energy Storage Solutions",
      avatar: "/team/avatar2.png",
      role: "TEAM MEMBER",
    },
    {
      name: "Dr. David Liu",
      title: "TECHNICAL ADVISOR",
      desc: "Renewable Energy Systems",
      avatar: "/team/avatar3.png",
      role: "INDUSTRY EXPERTS",
    },
    {
      name: "Sophie Wu",
      title: "OPERATIONS DIRECTOR",
      desc: "Process Optimization",
      avatar: "/team/avatar1.png",
      role: "TEAM MEMBER",
    },
    {
      name: "Robert Tan",
      title: "INNOVATION LEAD",
      desc: "Future Energy Technologies",
      avatar: "/team/avatar2.png",
      role: "TEAM MEMBER",
    },
    {
      name: "Dr. Helen Zhang",
      title: "RESEARCH FELLOW",
      desc: "Energy Efficiency Research",
      avatar: "/team/avatar3.png",
      role: "TEAM MEMBER",
    },
    {
      name: "Kevin Wang",
      title: "PRODUCT MANAGER",
      desc: "Smart Energy Solutions",
      avatar: "/team/avatar1.png",
      role: "TEAM MEMBER",
    },
    {
      name: "Anna Lin",
      title: "QUALITY DIRECTOR",
      desc: "System Integration",
      avatar: "/team/avatar2.png",
      role: "TEAM MEMBER",
    },
    {
      name: "Dr. Mark Chen",
      title: "STRATEGY ADVISOR",
      desc: "Energy Market Analysis",
      avatar: "/team/avatar3.png",
      role: "INDUSTRY EXPERTS",
    }
  ];

  return (
    <section className="c-team-section-wrap">
      <div className="team-section-content">
        <div className="team-section-title">{t("missionTitle")}</div>
        <div className="team-swiper-container">
          <Swiper
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={5}
            spaceBetween={-20}
            loop={true}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            speed={800}
            modules={[Pagination, Autoplay]}
            className="team-swiper"
          >
            {team.map((member, idx) => (
              <SwiperSlide key={idx}>
                {({ isActive, isPrev, isNext }) => (
                  <div 
                    className={`team-card ${
                      isActive ? "swiper-slide-active" : 
                      isPrev || isNext ? "swiper-slide-adjacent" : ""
                    }`}
                  >
                    <Card
                      className="team-member-card"
                      styles={{
                        body: {
                          padding: "24px 20px",
                          background: isActive ? "#1677FF" : "#1B2B65",
                          borderRadius: "16px",
                        },
                      }}
                    >
                      <div className="card-header">
                        <div className="member-role">{member.role}</div>
                        <Button className="view-btn" type="primary">
                          View
                        </Button>
                      </div>

                      <div className="member-avatar-section">
                        <Avatar
                          src={member.avatar}
                          className="member-avatar"
                        />
                      </div>

                      <div className="member-info">
                        <h3 className="member-name">{member.name}</h3>
                        <div className="member-title">{member.title}</div>
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
