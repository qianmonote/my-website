'use client';

import React from "react";
import { Card, Avatar, Button } from "antd";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { useI18n } from "@/context/I18nContext";
import 'swiper/css';
import 'swiper/css/pagination';
import "./index.css";

const Team: React.FC = () => {
  const { t } = useI18n();
  const team = [
    {
      name: "李明",
      title: t("manager"),
      desc: t("managerDesc"),
      avatar: "/team/avatar1.png",
      role: "TEAM MEMBER",
      company: "AgriTech & Green Energy Innovator",
    },
    {
      name: "Lim Chor Seng",
      title: "MANAGING DIRECTOR",
      desc: "AgriTech & Green Energy Innovator",
      avatar: "/team/avatar2.png",
      role: "INDUSTRY EXPERTS",
      company: "AgriTech & Green Energy Innovator",
      isMain: true,
    },
    {
      name: "王芳",
      title: "CHIEF TECHNICAL ENGINEER",
      desc: t("techDirectorDesc"),
      avatar: "/team/avatar3.png",
      role: "TEAM MEMBER",
      company: "XXXXXXXXXXXXXX",
    },
    {
      name: "Dr Wong Ling Yong",
      title: "PRINCIPLE INVESTIGATOR",
      desc: "UNIVERSITI TUNKU ABDUL RAHMAN",
      avatar: "/team/avatar1.png",
      role: "TEAM MEMBER",
      company: "XXXXXXXXXXXXXX",
    },
    {
      name: "Jong Chunmin",
      title: t("marketDirector"),
      desc: t("marketDirectorDesc"),
      avatar: "/team/avatar3.png",
      role: "TEAM MEMBER",
      company: "XXXXXXXXXXXXXX",
    },{
      name: "Dr Wong Ling Yong",
      title: "PRINCIPLE INVESTIGATOR",
      desc: "UNIVERSITI TUNKU ABDUL RAHMAN",
      avatar: "/team/avatar1.png",
      role: "TEAM MEMBER",
      company: "XXXXXXXXXXXXXX",
    },
    {
      name: "Jong Chunmin",
      title: t("marketDirector"),
      desc: t("marketDirectorDesc"),
      avatar: "/team/avatar3.png",
      role: "TEAM MEMBER",
      company: "XXXXXXXXXXXXXX",
    },
  ];

  return (
    <section className="c-team-section-wrap">
      <div className="team-section-content">
        <div className="team-section-title">
          {t("missionTitle")}
        </div>
        <div className="team-swiper-container">
          <Swiper
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={7}
            spaceBetween={20}
            loop={true}
            pagination={{
              clickable: true,
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            speed={400}
            modules={[Pagination, Autoplay]}
            className="team-swiper"
            initialSlide={1}
          >
            {team.map((member, idx) => (
              <SwiperSlide key={idx}>
                <div className={`team-card ${member.isMain ? 'team-card-main' : ''}`}>
                  <Card
                    className="team-member-card"
                    styles={{ body: { padding: '32px 24px' } }}
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
                        size={120} 
                        className="member-avatar"
                      />
                    </div>
                    
                    <div className="member-info">
                      <h3 className="member-name">{member.name}</h3>
                      <div className="member-title">{member.title}</div>
                      <div className="member-company">{member.company}</div>
                    </div>
                  </Card>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Team; 