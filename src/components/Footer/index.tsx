"use client";

import React from "react";
import { useI18n } from "@/context/I18nContext";
import ContractBtn from '@/components/elements/ContractBtn'
import "./index.css";

const Footer: React.FC = () => {
  const { t } = useI18n();
  return (
    <footer className="c-footer-section-wrap">
      <div className="footer-invite">
        <div dangerouslySetInnerHTML={{ __html: t("footerInvite") }} />
      </div>
      <ContractBtn />
      <div className="footer-address">{t("address")}</div>
    </footer>
  );
};

export default Footer;
