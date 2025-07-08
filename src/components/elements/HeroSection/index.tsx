import React from "react";
import classNames from "classnames";
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
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className={styles.heroOverlay}>
        <div className={styles.heroOverlayContainer}>
          <h1 className={styles.heroTitle}>{title}</h1>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
