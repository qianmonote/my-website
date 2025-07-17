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
              <MobileOptimizedWrapper
                className="partner-item"
                touchFeedbackScale={1.05}
                touchFeedbackDuration={150}
              >
                <div
                  onTouchStart={() => handleTouchStart('partner1')}
                  onTouchEnd={handleTouchEnd}
                  onMouseEnter={() => setIsHovered('partner1')}
                  onMouseLeave={() => setIsHovered(null)}
                  style={{
                    transform: isHovered === 'partner1' ? 'scale(1.05)' : 'scale(1)',
                    transition: 'transform 0.3s ease'
                  }}
                >
                  <Image
                    src="/home/hz-lm.png"
                    alt="拉曼大学合作伙伴"
                    width={202}
                    height={100}
                    style={{ width: '100%', height: 'auto' }}
                  />
                </div>
              </MobileOptimizedWrapper>
              <MobileOptimizedWrapper
                className="partner-item"
                touchFeedbackScale={1.05}
                touchFeedbackDuration={150}
              >
                <div
                  onTouchStart={() => handleTouchStart('partner2')}
                  onTouchEnd={handleTouchEnd}
                  onMouseEnter={() => setIsHovered('partner2')}
                  onMouseLeave={() => setIsHovered(null)}
                  style={{
                    transform: isHovered === 'partner2' ? 'scale(1.05)' : 'scale(1)',
                    transition: 'transform 0.3s ease'
                  }}
                >
                  <Image
                    src="/home/hz-lj.png"
                    alt="隆基乐业合作伙伴"
                    width={202}
                    height={100}
                    style={{ width: '100%', height: 'auto' }}
                  />
                </div>
              </MobileOptimizedWrapper>
            </div>
          </div>
          
          {/* 联系我们 */}
          <div className={styles.footerContactWrap}>
            <div className={styles.footerContactList}>
              <MobileOptimizedWrapper
                className="social-link"
                touchFeedbackScale={1.05}
                touchFeedbackDuration={150}
              >
                <a 
                  href="#"
                  onTouchStart={() => handleTouchStart('facebook')}
                  onTouchEnd={handleTouchEnd}
                  onMouseEnter={() => setIsHovered('facebook')}
                  onMouseLeave={() => setIsHovered(null)}
                  style={{
                    transform: isHovered === 'facebook' ? 'scale(1.05)' : 'scale(1)',
                    transition: 'transform 0.3s ease'
                  }}
                  aria-label="访问我们的Facebook页面"
                >
                  <Image
                    src="/home/ctw-facebook.png"
                    alt="Facebook"
                    width={150}
                    height={107}
                    style={{ width: '100%', height: 'auto' }}
                  />
                </a>
              </MobileOptimizedWrapper>
              <MobileOptimizedWrapper
                className="social-link"
                touchFeedbackScale={1.05}
                touchFeedbackDuration={150}
              >
                <a 
                  href="#"
                  onTouchStart={() => handleTouchStart('tiktok')}
                  onTouchEnd={handleTouchEnd}
                  onMouseEnter={() => setIsHovered('tiktok')}
                  onMouseLeave={() => setIsHovered(null)}
                  style={{
                    transform: isHovered === 'tiktok' ? 'scale(1.05)' : 'scale(1)',
                    transition: 'transform 0.3s ease'
                  }}
                  aria-label="访问我们的TikTok页面"
                >
                  <Image
                    src="/home/ctw-tiktok.png"
                    alt="TikTok"
                    width={150}
                    height={107}
                    style={{ width: '100%', height: 'auto' }}
                  />
                </a>
              </MobileOptimizedWrapper>
              <MobileOptimizedWrapper
                className="social-link"
                touchFeedbackScale={1.05}
                touchFeedbackDuration={150}
              >
                <a 
                  href="#"
                  onTouchStart={() => handleTouchStart('youtube')}
                  onTouchEnd={handleTouchEnd}
                  onMouseEnter={() => setIsHovered('youtube')}
                  onMouseLeave={() => setIsHovered(null)}
                  style={{
                    transform: isHovered === 'youtube' ? 'scale(1.05)' : 'scale(1)',
                    transition: 'transform 0.3s ease'
                  }}
                  aria-label="访问我们的YouTube频道"
                >
                  <Image
                    src="/home/ctw-youtube.png"
                    alt="YouTube"
                    width={150}
                    height={107}
                    style={{ width: '100%', height: 'auto' }}
                  />
                </a>
              </MobileOptimizedWrapper>
              <MobileOptimizedWrapper
                className="social-link"
                touchFeedbackScale={1.05}
                touchFeedbackDuration={150}
              >
                <a 
                  href="#"
                  onTouchStart={() => handleTouchStart('xiaohongshu')}
                  onTouchEnd={handleTouchEnd}
                  onMouseEnter={() => setIsHovered('xiaohongshu')}
                  onMouseLeave={() => setIsHovered(null)}
                  style={{
                    transform: isHovered === 'xiaohongshu' ? 'scale(1.05)' : 'scale(1)',
                    transition: 'transform 0.3s ease'
                  }}
                  aria-label="访问我们的小红书页面"
                >
                  <Image
                    src="/home/ctw-xiaohongshu.png"
                    alt="小红书"
                    width={150}
                    height={107}
                    style={{ width: '100%', height: 'auto' }}
                  />
                </a>
              </MobileOptimizedWrapper>
              <div className={styles.footerContactInfo}>
                <MobileOptimizedWrapper
                  className="contact-btn-wrapper"
                  touchFeedbackScale={0.95}
                  touchFeedbackDuration={200}
                >
                  <a 
                    onClick={handleOpenContactModal}
                    onTouchStart={() => handleTouchStart('contact')}
                    onTouchEnd={handleTouchEnd}
                    onMouseEnter={() => setIsHovered('contact')}
                    onMouseLeave={() => setIsHovered(null)}
                    style={{
                      transform: isHovered === 'contact' ? 'scale(1.05)' : 'scale(1)',
                      transition: 'transform 0.3s ease',
                      cursor: 'pointer'
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
        Headquarters Address：5-33B JALAN PAHANG, 10400 GEORGETOWN, PULAU
        PINANG.
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
