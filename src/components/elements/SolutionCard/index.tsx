"use client";

import React from "react";
import Image from "next/image";
import styles from "./styles.module.css";

type SolutionCardProps = Partial<{
  number: string;
  title: string;
  description: string;
  features: string[];
  image: string;
  imageActive: string;
  isActive?: boolean;
  onClick?: () => void;
  onMouseEnter?: () => void;
}>;

const SolutionCard: React.FC<SolutionCardProps> = ({
  image = '',
  isActive = false,
  imageActive = '',
  onClick,
  onMouseEnter,
}) => {
  const imageWidth = isActive ? 595 : 119;
  const imageHeight = isActive ? 440 : 440;
  return (
    <div
      className={`${styles.card} ${isActive ? styles.active : ""}`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
    >
      <div
        className={styles.background}
      >
        <Image src={isActive ? imageActive : image} width={imageWidth} height={imageHeight} alt="solution"  unoptimized={true}/>
      </div>
    </div>
  );
};

export default SolutionCard;
