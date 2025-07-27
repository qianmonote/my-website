"use client";

import React from "react";
import Image from "next/image";
import PartSection, {
  PartSectionImageBox,
} from "@/components/elements/PartSection";
import "./index.css";

const AboutUs: React.FC = () => {
  return (
    <PartSection
      title={
        <div className="about-title-container">
          <Image 
            src="/home/ab-tit-all.png" 
            alt="about" 
            width={1000} 
            height={96}
            className="about-title-image"
            style={{
              width: '100%',
              height: 'auto',
            }}
          />
        </div>
      }
    >
      <PartSectionImageBox>
        <Image
          src="/home/ab-des.png"
          alt="about"
          width={1000}
          height={667}
          className="about-image"
        />
      </PartSectionImageBox>
    </PartSection>
  );
};

export default AboutUs;
