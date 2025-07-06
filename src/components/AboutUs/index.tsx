"use client";

import React from "react";
import Image from "next/image";
import "./index.css";

const AboutUs: React.FC = () => {
  return (
    <section className="c-about-section-wrap">
      <div className="about-container">
        <h2 className="about-title">
          <Image src="/home/ab-tit.png" alt="about" width={654} height={96} />
        </h2>
        <div className="about-content">
          <div className="about-image-container">
            <Image
              src="/home/ab-des.png"
              alt="about"
              width={1000}
              height={667}
              className="about-image"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
