"use client";

import React from "react";
import ContractBtn from "@/components/elements/CustomtBtn";
import Image from "next/image";
import Link from "next/link";
import styles from "./style.module.css";

type TProps = Partial<{
  inviteShow: boolean;
}>;

const Footer: React.FC<TProps> = ({ inviteShow = true }) => {
  return (
    <footer className={styles.cFooterSectionWrap}>
      {inviteShow ? (
        <>
          <Image
            src="/home/ft-invite-bg.png"
            alt="footer"
            width={1200}
            height={850}
            style={{ width: "100%", height: "auto" }}
            className={styles.footerBg}
          />
          {/* 邀请 */}
          <div className={styles.footerInvite}>
            <div className={styles.footerInviteText}>
              We sincerely invite visionaries
              <span className={styles.spanStrong}> individuals</span> to join
              hands,share
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
              <Image
                src="/home/hz-lm.png"
                alt="hz-lm"
                width={202}
                height={100}
              />
              <Image
                src="/home/hz-lj.png"
                alt="hz-lm"
                width={202}
                height={100}
              />
            </div>
          </div>
          {/* 联系我们 */}
          <div className={styles.footerContactWrap}>
            <div className={styles.footerContactList}>
              <a href="">
                <Image
                  src="/home/ctw-facebook.png"
                  alt="facebook"
                  width={150}
                  height={107}
                />
              </a>
              <a href="">
                <Image
                  src="/home/ctw-tiktok.png"
                  alt="tiktok"
                  width={150}
                  height={107}
                />
              </a>
              <a href="">
                <Image
                  src="/home/ctw-youtube.png"
                  alt="youtube"
                  width={150}
                  height={107}
                />
              </a>
              <a href="">
                <Image
                  src="/home/ctw-xiaohongshu.png"
                  alt="xiaohongshu"
                  width={150}
                  height={107}
                />
              </a>
            </div>
            <div className={styles.footerContactInfo}>
              <Link href="/contact">
                <ContractBtn type="contactEn">Contact Us</ContractBtn>
              </Link>
            </div>
          </div>
        </>
      ) : null}
      {/* 地址 */}
      <div className={styles.footerAddress}>
        Headquarters Address：5-33B JALAN PAHANG, 10400 GEORGETOWN, PULAU
        PINANG.
      </div>
    </footer>
  );
};

export default Footer;
