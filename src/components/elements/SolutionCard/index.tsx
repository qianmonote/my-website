"use client";

import React from "react";
import Image from "next/image";
import styles from "./styles.module.css";

interface SolutionCardProps {
  image?: string;
  imageActive?: string;
  imageWidth?: number;
  imageHeight?: number;
  isActive?: boolean;
  onClick?: () => void;
  onMouseEnter?: () => void;
}

const SolutionCard: React.FC<SolutionCardProps> = ({
  image = '',
  imageActive = '',
  imageWidth = 200,
  imageHeight = 200,
  isActive = false,
  onClick,
  onMouseEnter
}) => {
  return (
    <div 
      className={styles.container} 
      onClick={onClick}
      onMouseEnter={onMouseEnter}
    >
      <div
        className={styles.background}
      >
        <Image 
          src={isActive ? (imageActive || image) : image} 
          width={imageWidth} 
          height={imageHeight} 
          alt="solution"  
          unoptimized={true}
        />
      </div>
    </div>
  );
};

export default SolutionCard;
