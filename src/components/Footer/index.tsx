"use client";

import React from "react";
import { useI18n } from "@/context/I18nContext";
import ContractBtn from "@/components/elements/CustomtBtn";
import Image from "next/image";
import styles from "./style.module.css";

type TProps = Partial<{
  inviteShow: boolean;
}>;

const Footer: React.FC<TProps> = ({ inviteShow = true }) => {
  const { t } = useI18n();
  return (
    <footer className={styles.cFooterSectionWrap}>
      {inviteShow ? (
        <>
          <Image
            src="/footer/footer-invite-bg.png"
            alt="footer-bg"
            width={1000}
            height={400}
            style={{ width: "100%", height: "auto" }}
            className={styles.footerBg}
          />
          <div className={styles.footerInvite}>
            <div
              dangerouslySetInnerHTML={{
                __html: t("footerInvite")?.replace(/\r?\n/g, "<br />"),
              }}
            />
            <ContractBtn>联系我们</ContractBtn>
          </div>
        </>
      ) : null}
      <div className={styles.footerAddress}>{t("address")}</div>
    </footer>
  );
};

export default Footer;
