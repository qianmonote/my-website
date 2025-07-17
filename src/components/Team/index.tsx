"use client";

import React, { useState } from "react";
import { Card, Avatar, Button } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { useI18n } from "@/context/I18nContext";
import TeamDetailModal from "./TeamDetailModal";
import "swiper/css";
import "swiper/css/pagination";
import "./index.css";

interface TeamMember {
  name: string;
  title: string;
  desc: string;
  avatar: string;
  role: string;
  fullBio?: string;
  expertise?: string[];
  experience?: string[];
  education?: string[];
  contact?: {
    email?: string;
    linkedin?: string;
    phone?: string;
  };
}

const Team: React.FC = () => {
  const { t } = useI18n();
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const team = [
    {
      name: "Ts Dr Wong Ling Yang",
      title: "PRINCIPLE INVESTIGATOR",
      desc: "UNIVERSITI TUNKU ABDUL RAHMAN",
      avatar: "/team/avatar1.png",
      role: "TEAM MEMBER",
      fullBio: "Dr. Wong Ling Yang 是能源系统领域的资深专家，拥有超过15年的研究和开发经验。他在可再生能源技术、智能电网和能源存储系统方面具有深厚的专业知识。",
      expertise: ["可再生能源技术", "智能电网", "能源存储系统", "系统集成"],
      experience: [
        "马来西亚理工大学能源研究中心主任 (2018-至今)",
        "新加坡国立大学能源研究所高级研究员 (2015-2018)",
        "马来西亚能源委员会技术顾问 (2012-2015)"
      ],
      education: [
        "新加坡国立大学 - 能源系统工程博士",
        "马来西亚理工大学 - 电气工程硕士",
        "马来西亚理工大学 - 电气工程学士"
      ],
      contact: {
        email: "wong.lingyang@utar.edu.my",
        linkedin: "linkedin.com/in/wong-ling-yang",
        phone: "+60 12-345 6789"
      }
    },
    {
      name: "Lim Chor Seng",
      title: "MANAGING DIRECTOR",
      desc: "AgriTech & Green Energy Innovator",
      avatar: "/team/avatar2.png",
      role: "INDUSTRY EXPERTS",
      fullBio: "Lim Chor Seng 是农业科技和绿色能源领域的创新企业家，致力于将先进技术与可持续发展理念相结合。他在农业废弃物处理和生物能源转化方面拥有丰富的实践经验。",
      expertise: ["农业科技", "生物能源", "废弃物处理", "项目管理"],
      experience: [
        "绿色能源创新公司创始人兼CEO (2020-至今)",
        "马来西亚农业科技协会技术总监 (2018-2020)",
        "新加坡生物能源公司运营经理 (2015-2018)"
      ],
      education: [
        "新加坡南洋理工大学 - 环境工程硕士",
        "马来西亚国民大学 - 农业工程学士"
      ],
      contact: {
        email: "lim.chorseng@greenenergy.com",
        linkedin: "linkedin.com/in/lim-chor-seng",
        phone: "+60 11-234 5678"
      }
    },
    {
      name: "Gong Chunpin",
      title: "CHIEF TECHNICAL ENGINEER",
      desc: "Power Systems Integration",
      avatar: "/team/avatar3.png",
      role: "TEAM MEMBER",
      fullBio: "Gong Chunpin 是电力系统集成领域的首席技术工程师，专注于智能电网技术和分布式能源系统的设计与实施。他在大型能源项目的技术架构和系统优化方面具有卓越的专业能力。",
      expertise: ["电力系统集成", "智能电网", "分布式能源", "系统架构"],
      experience: [
        "国家电网公司技术总监 (2019-至今)",
        "华为技术有限公司能源解决方案专家 (2016-2019)",
        "中国电力科学研究院高级工程师 (2013-2016)"
      ],
      education: [
        "清华大学 - 电力系统及其自动化博士",
        "华北电力大学 - 电气工程硕士",
        "华北电力大学 - 电气工程学士"
      ],
      contact: {
        email: "gong.chunpin@powersystems.com",
        linkedin: "linkedin.com/in/gong-chunpin",
        phone: "+86 138-0013-8000"
      }
    },
    {
      name: "Dr. Sarah Chen",
      title: "RESEARCH DIRECTOR",
      desc: "Sustainable Energy Research",
      avatar: "/team/avatar1.png",
      role: "TEAM MEMBER",
      fullBio: "Dr. Sarah Chen 是可持续能源研究领域的知名专家，专注于新能源技术开发和环境友好型能源解决方案的研究。她在太阳能、风能和氢能技术方面具有深厚的学术背景。",
      expertise: ["可持续能源", "太阳能技术", "风能系统", "氢能技术"],
      experience: [
        "新加坡南洋理工大学能源研究所研究主任 (2020-至今)",
        "美国斯坦福大学能源研究中心博士后研究员 (2018-2020)",
        "澳大利亚墨尔本大学能源系统研究员 (2016-2018)"
      ],
      education: [
        "美国麻省理工学院 - 能源科学与工程博士",
        "美国加州大学伯克利分校 - 环境工程硕士",
        "新加坡国立大学 - 机械工程学士"
      ],
      contact: {
        email: "sarah.chen@ntu.edu.sg",
        linkedin: "linkedin.com/in/sarah-chen-phd",
        phone: "+65 9123 4567"
      }
    },
    {
      name: "Michael Zhang",
      title: "SENIOR ENGINEER",
      desc: "Power Systems Integration",
      avatar: "/team/avatar2.png",
      role: "TEAM MEMBER",
      fullBio: "Michael Zhang 是电力系统集成领域的高级工程师，专注于智能电网技术和能源管理系统的开发。他在电力电子技术和控制系统设计方面具有丰富的实践经验。",
      expertise: ["电力电子", "控制系统", "智能电网", "能源管理"],
      experience: [
        "西门子能源公司高级系统工程师 (2021-至今)",
        "通用电气电力系统部门技术专家 (2018-2021)",
        "ABB集团电力电子工程师 (2015-2018)"
      ],
      education: [
        "美国佐治亚理工学院 - 电气工程硕士",
        "中国上海交通大学 - 电气工程学士"
      ],
      contact: {
        email: "michael.zhang@siemens-energy.com",
        linkedin: "linkedin.com/in/michael-zhang-eng",
        phone: "+1 555-0123"
      }
    }
  ];

  const handleCardClick = (member: TeamMember) => {
    setSelectedMember(member);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

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
                    onClick={() => handleCardClick(member)}
                    style={{ cursor: "pointer" }}
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
                          查看详情
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
      
      {/* 团队详情模态框 */}
      <TeamDetailModal
        member={selectedMember}
        visible={modalVisible}
        onClose={handleCloseModal}
      />
    </section>
  );
};

export default Team;
