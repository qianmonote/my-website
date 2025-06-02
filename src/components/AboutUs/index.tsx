'use client';

import React from "react";
import Image from "next/image";
import { useI18n } from "@/context/I18nContext";
import "./index.css";

const AboutUs: React.FC = () => {
  const { t } = useI18n();
  return (
    <section className="c-about-section-wrap">
      <div className="about-container">
        <h2 className="about-title">
          {t("aboutTitle")}
        </h2>
        <div className="about-content">
          <div className="about-image-container">
            <Image
              src="/images/about.png"
              alt="about"
              width={1000}
              height={524}
              className="about-image"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs; 