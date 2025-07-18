"use client";

import React from "react";
import Image from "next/image";
import PartSection, { PartSectionImageBox } from "@/components/elements/PartSection";
import "./index.css";

const AboutUs: React.FC = () => {

  return (
    <PartSection
      title={
        <Image src="/home/ab-tit.png" alt="about" width={654} height={96} />
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
