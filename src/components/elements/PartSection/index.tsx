"use client";
/**
 * 产品介绍页面的子模块
 */
import React from "react";
import classNames from "classnames";
import styles from "./style.module.css";

interface PartSectionProps {
  title?: string;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const PartSection: React.FC<PartSectionProps> = ({
  title,
  children,
  className = "",
  style,
}) => {
  return (
    <section className={classNames(styles.partSection, className)} style={style}>
      {
        title && <h2 className={styles.sectionTitle}>{title}</h2>
      }
      <div className={styles.container}>
        {children}
      </div>
    </section>
  );
};

export default PartSection;
