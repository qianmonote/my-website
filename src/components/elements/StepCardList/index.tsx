"use client";

import React from "react";
import styles from "./styles.module.css";
import StepCard from "../StepCard";
import { useI18n } from "@/context/I18nContext";

interface StepCardListProps {
  className?: string;
  steps: StepCardProps[];
}

type StepCardProps = Partial<{
  step: number;
  title: string;
  description: string;
  defaultImageZh: string;
  defaultImageEn: string;
  imageActive: string;
}>;

const StepCardList: React.FC<StepCardListProps> = ({
  className,
  steps = [],
}) => {
  const { lang } = useI18n();
  return (
    <div className={`${styles.container} ${className || ""}`}>
      <div className={styles.grid}>
        {steps.map((step) => (
          <StepCard
            key={step.step}
            step={step.step || 0}
            title={step.title || ""}
            description={step.description}
            defaultImage={
              lang === "zh" ? step.defaultImageZh || "" : step.defaultImageEn || ""
            }
            imageActive={step.imageActive || ""}
          />
        ))}
      </div>
    </div>
  );
};

export default StepCardList;
