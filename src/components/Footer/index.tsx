"use client";

import React, { useState } from "react";
import ContractBtn from "@/components/elements/CustomtBtn";
import MobileOptimizedWrapper from "@/components/MobileOptimizedWrapper";
import ContactModal from "@/components/elements/ContactModal";
import Image from "next/image";
import styles from "./style.module.css";

type TProps = Partial<{
  inviteShow: boolean;
}>;

// 合作伙伴数据
const partners = [
  {
    id: "partner1",
    name: "拉曼大学合作伙伴",
    image: "/home/hz/lmdx.png",
    alt: "",
    width: 352,
    height: 80,
  },
  {
    id: "partner2",
    name: "隆基乐业合作伙伴",
    image: "/home/hz/ljly.png",
    alt: "",
    width: 363,
    height: 80,
  },
];

// 社交媒体联系方式数据
const socialLinks = [
  {
    id: "facebook",
    name: "Facebook",
    url: "https://www.facebook.com/profile.php?id=61578615476150",
    image: "/home/ctw/facebook.png",
    alt: "Facebook",
    width: 150,
    height: 107,
    ariaLabel: "访问我们的Facebook页面",
  },
  {
    id: "tiktok",
    name: "TikTok",
    url: "https://www.tiktok.com/@ailinlee80?_t=ZS-8y7aMsEk3Np&_r=1",
    image: "/home/ctw/tiktok.png",
    alt: "TikTok",
    width: 150,
    height: 107,
    ariaLabel: "访问我们的TikTok页面",
  },
  {
    id: "youtube",
    name: "YouTube",
    url: "https://www.youtube.com/@OnetouchMedia-p5k",
    image: "/home/ctw/youtube.png",
    alt: "YouTube",
    width: 150,
    height: 107,
    ariaLabel: "访问我们的YouTube频道",
  },
  {
    id: "xiaohongshu",
    name: "小红书",
    url: "#",
    image: "/home/ctw/xiaohongshu.png",
    alt: "小红书",
    width: 150,
    height: 107,
    ariaLabel: "访问我们的小红书页面",
  },
  {
    id: "x",
    name: "X",
    url: "https://x.com/1TouchM",
    image: "/home/ctw/x.png",
    alt: "X",
    width: 150,
    height: 107,
    ariaLabel: "访问我们的X页面",
  },
];

const Footer: React.FC<TProps> = ({ inviteShow = true }) => {
  const [isHovered, setIsHovered] = useState<string | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // 处理触摸反馈
  const handleTouchStart = (elementId: string) => {
    setIsHovered(elementId);
  };

  const handleTouchEnd = () => {
    setIsHovered(null);
  };

  // 处理联系我们弹窗
  const handleOpenContactModal = () => {
    setIsContactModalOpen(true);
  };

  const handleCloseContactModal = () => {
    setIsContactModalOpen(false);
  };

  return (
    <MobileOptimizedWrapper
      className={styles.cFooterSectionWrap}
      enableTouchFeedback={true}
      enableSmoothScroll={true}
      enablePerformanceOptimization={true}
      touchFeedbackScale={0.98}
      touchFeedbackDuration={200}
    >
      {inviteShow ? (
        <>
          <Image
            src="/home/ft-invite-bg.png"
            alt="footer background"
            width={1200}
            height={850}
            style={{ width: "100%", height: "auto" }}
            className={styles.footerBg}
            priority
          />
          {/* 邀请 */}
          <div className={styles.footerInvite}>
            <div className={styles.footerInviteText}>
              We sincerely invite visionaries
              <span className={styles.spanStrong}> individuals</span> to join
              hands, share
              <span className={styles.spanStrong}> blue</span>
              <span className={styles.spanStrong}> ocean</span> opportunities,
              and create a sustainable future together!
              <div className={styles.footerInviteTextZn}>
                诚邀远见者<span className={styles.spanStrong}>携手</span>
                ，共享<span className={styles.spanStrong}>蓝海</span>
                机遇，共塑永续未来！
              </div>
            </div>
          </div>

          {/* 战略合作伙伴 */}
          <div className={styles.footerPartnerWrap}>
            <div className={styles.footerPartnerTitle}>战略合作伙伴</div>
            <div className={styles.footerPartnerList}>
              {partners.map((partner) => (
                <MobileOptimizedWrapper
                  key={partner.id}
                  className="partner-item"
                  touchFeedbackScale={1.05}
                  touchFeedbackDuration={150}
                >
                  <div
                    onTouchStart={() => handleTouchStart(partner.id)}
                    onTouchEnd={handleTouchEnd}
                    onMouseEnter={() => setIsHovered(partner.id)}
                    onMouseLeave={() => setIsHovered(null)}
                    style={{
                      transform:
                        isHovered === partner.id ? "scale(1.05)" : "scale(1)",
                      transition: "transform 0.3s ease",
                    }}
                  >
                    <Image
                      src={partner.image}
                      alt={partner.alt}
                      width={partner.width}
                      height={partner.height}
                      style={{ width: "auto", height: "80px" }}
                      unoptimized
                    />
                  </div>
                </MobileOptimizedWrapper>
              ))}
            </div>
          </div>

          {/* 联系我们 */}
          <div className={styles.footerContactWrap}>
            <div className={styles.footerContactList}>
              {/* 社交媒体图标容器 */}
              <div className={styles.socialLinksContainer}>
                {socialLinks.map((social) => (
                  <div key={social.id} className={styles.socialLink}>
                    <MobileOptimizedWrapper
                      className="social-link"
                      touchFeedbackScale={1.05}
                      touchFeedbackDuration={150}
                    >
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onTouchStart={() => handleTouchStart(social.id)}
                        onTouchEnd={handleTouchEnd}
                        onMouseEnter={() => setIsHovered(social.id)}
                        onMouseLeave={() => setIsHovered(null)}
                        style={{
                          transform:
                            isHovered === social.id
                              ? "scale(1.05)"
                              : "scale(1)",
                          transition: "transform 0.3s ease",
                        }}
                        aria-label={social.ariaLabel}
                      >
                        <Image
                          src={social.image}
                          alt={social.alt}
                          width={social.width}
                          height={social.height}
                          style={{ width: "100%", height: "auto" }}
                        />
                      </a>
                    </MobileOptimizedWrapper>
                  </div>
                ))}
              </div>

              {/* Contact Us按钮容器 */}
              <div className={styles.footerContactInfo}>
                <MobileOptimizedWrapper
                  className="contact-btn-wrapper"
                  touchFeedbackScale={0.95}
                  touchFeedbackDuration={200}
                >
                  <a
                    onClick={handleOpenContactModal}
                    onTouchStart={() => handleTouchStart("contact")}
                    onTouchEnd={handleTouchEnd}
                    onMouseEnter={() => setIsHovered("contact")}
                    onMouseLeave={() => setIsHovered(null)}
                    style={{
                      transform:
                        isHovered === "contact" ? "scale(1.05)" : "scale(1)",
                      transition: "transform 0.3s ease",
                      cursor: "pointer",
                    }}
                  >
                    <ContractBtn type="contactEn">Contact Us</ContractBtn>
                  </a>
                </MobileOptimizedWrapper>
              </div>
            </div>
          </div>
        </>
      ) : null}
      {/* 地址 */}
      <div className={styles.footerAddress}>
        HEADQUARTER ADDRESS: Unit 9, 06, Menara Boustead Penang, 39 Jln <br />
        Sultan Ahmad Shah,10050 George Town, Pulau Pinang.
      </div>

      {/* 联系我们弹窗 */}
      <ContactModal
        open={isContactModalOpen}
        onClose={handleCloseContactModal}
      />
    </MobileOptimizedWrapper>
  );
};

export default Footer;
