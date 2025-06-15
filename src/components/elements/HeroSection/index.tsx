import React from "react";
import classNames from "classnames";
import CustomtBtn from "@/components/elements/CustomtBtn";
import styles from "./style.module.css";

interface HeroSectionProps {
  title: string;
  backgroundImage: string;
  children?: React.ReactNode;
  className?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  backgroundImage,
  className = "",
}) => {
  return (
    <section
      className={classNames(styles.heroSection, className)}
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.4)), url(${backgroundImage})`,
      }}
    >
      <div className={styles.heroOverlay}>
        <div className={styles.heroContainer}>
          <h1 className={styles.heroTitle}>{title}</h1>
          <a href="/contract-us" target="_blank">
            <CustomtBtn>联系我们</CustomtBtn>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
