"use client";

import React, { useEffect, useState } from "react";
import { Modal, Drawer, Avatar, Divider } from "antd";
import { CloseOutlined, LinkedinOutlined, MailOutlined } from "@ant-design/icons";
import { useMobileOptimization } from "@/hooks/useMobileOptimization";
import "./TeamDetailModal.module.css";

interface TeamMember {
  name: string;
  title: string;
  desc: string;
  avatar: string;
  role: string;
  // 扩展的详情信息
  fullBio?: string;
  experience?: string[];
  education?: string[];
  expertise?: string[];
  contact?: {
    email?: string;
    linkedin?: string;
    phone?: string;
  };
}

interface TeamDetailModalProps {
  member: TeamMember | null;
  visible: boolean;
  onClose: () => void;
}

const TeamDetailModal: React.FC<TeamDetailModalProps> = ({
  member,
  visible,
  onClose,
}) => {
  const { screenSize } = useMobileOptimization();
  const isMobileView = screenSize.width <= 738;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (visible) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!member || !isVisible) return null;

  const renderContent = () => (
    <div className="team-detail-content">
      {/* 头部信息 */}
      <div className="detail-header">
        <div className="detail-avatar-section">
          <Avatar
            src={member.avatar}
            className="detail-avatar"
            size={120}
          />
        </div>
        <div className="detail-basic-info">
          <h2 className="detail-name">{member.name}</h2>
          <div className="detail-title">{member.title}</div>
          <div className="detail-role">{member.role}</div>
          <div className="detail-company">{member.desc}</div>
        </div>
      </div>

      <Divider className="detail-divider" />

      {/* 详细描述 */}
      {member.fullBio && (
        <div className="detail-section">
          <h3 className="section-title">个人简介</h3>
          <p className="section-content">{member.fullBio}</p>
        </div>
      )}

      {/* 专业领域 */}
      {member.expertise && member.expertise.length > 0 && (
        <div className="detail-section">
          <h3 className="section-title">专业领域</h3>
          <div className="expertise-tags">
            {member.expertise.map((skill, index) => (
              <span key={index} className="expertise-tag">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 工作经验 */}
      {member.experience && member.experience.length > 0 && (
        <div className="detail-section">
          <h3 className="section-title">工作经验</h3>
          <ul className="experience-list">
            {member.experience.map((exp, index) => (
              <li key={index} className="experience-item">
                {exp}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 教育背景 */}
      {member.education && member.education.length > 0 && (
        <div className="detail-section">
          <h3 className="section-title">教育背景</h3>
          <ul className="education-list">
            {member.education.map((edu, index) => (
              <li key={index} className="education-item">
                {edu}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 联系方式 */}
      {member.contact && (
        <div className="detail-section">
          <h3 className="section-title">联系方式</h3>
          <div className="contact-info">
            {member.contact.email && (
              <div className="contact-item">
                <MailOutlined className="contact-icon" />
                <span>{member.contact.email}</span>
              </div>
            )}
            {member.contact.linkedin && (
              <div className="contact-item">
                <LinkedinOutlined className="contact-icon" />
                <span>{member.contact.linkedin}</span>
              </div>
            )}
            {member.contact.phone && (
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <span>{member.contact.phone}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );

  // 移动端使用底部侧滑
  if (isMobileView) {
    return (
      <Drawer
        title="团队成员详情"
        placement="bottom"
        height="85%"
        open={visible}
        onClose={onClose}
        className="team-detail-drawer"
        maskClosable={true}
        closeIcon={<CloseOutlined />}
        bodyStyle={{ padding: "20px" }}
      >
        {renderContent()}
      </Drawer>
    );
  }

  // 桌面端使用弹窗
  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      width={600}
      centered
      className="team-detail-modal"
      maskClosable={true}
      destroyOnHidden
    >
      {renderContent()}
    </Modal>
  );
};

export default TeamDetailModal; 