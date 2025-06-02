"use client";

import React from "react";
import Image from "next/image";
import { Typography, Tooltip } from "antd";
import { useI18n } from "@/context/I18nContext";
import "./index.css";

const { Paragraph } = Typography;

const AboutUs: React.FC = () => {
  const { t } = useI18n();

  const renderDescWithTooltip = (content: string) => {
    return (
      <div style={{ position: "relative" }}>
          <Paragraph
            className="about-image-text-desc"
            ellipsis={{ rows: 3 }}
            style={{ color: "inherit", marginBottom: 0 }}
          >
            {content}
          </Paragraph>
      </div>
    );
  };

  return (
    <section className="c-about-section-wrap">
      <div className="about-container">
        <h2 className="about-title">{t("aboutTitle")}</h2>
        <div className="about-content">
          <div className="about-image-container">
            <Image
              src="/images/about.png"
              alt="about"
              width={1000}
              height={524}
              className="about-image"
            />
            <div className="about-image-text-wrap">
              <div className="about-image-text-item">
                <div className="about-image-text-item-content">
                  <div className="about-image-text-title">
                    {t("aboutEcoTitle")}
                  </div>
                  {renderDescWithTooltip(t("aboutEcoDesc"))}
                </div>
              </div>
              <div className="about-image-text-item">
                <div className="about-image-text-item-content">
                  <div className="about-image-text-title">
                    {t("aboutCircularTitle")}
                  </div>
                  {renderDescWithTooltip(t("aboutCircularDesc"))}
                </div>
              </div>
              <div className="about-image-text-item">
                <div className="about-image-text-item-content">
                  <div className="about-image-text-title">
                    {t("aboutInnovationTitle")}
                  </div>
                  {renderDescWithTooltip(t("aboutInnovationDesc"))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
