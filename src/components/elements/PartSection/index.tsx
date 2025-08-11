"use client";
/**
 * 产品介绍页面的子模块
 */
import React from "react";
import classNames from "classnames";
import styles from "./style.module.css";

interface PartSectionProps {
  title?: React.ReactNode;
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
    <section
      className={classNames(styles.partSection, className)}
      style={style}
    >
      {title ? (
        typeof title === "string" ? (
          <h2
            className={styles.sectionTitle}
            dangerouslySetInnerHTML={{ __html: title }}
          />
        ) : (
          <h2 className={styles.sectionTitle}>{title}</h2>
        )
      ) : null}
      <div className={styles.container}>{children}</div>
    </section>
  );
};

export const PartSectionImageBox = ({
  children,
  maxWidth,
}: {
  children: React.ReactNode;
  maxWidth?: number;
}) => {
  return (
    <div
      className={styles.partSectionImage}
      style={maxWidth ? { maxWidth, margin: "0 auto" } : {}}
    >
      {children}
    </div>
  );
};

export default PartSection;
