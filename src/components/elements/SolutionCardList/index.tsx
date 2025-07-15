"use client";

import React, { useState } from "react";
import SolutionCard from "../SolutionCard";
import { useI18n } from "@/context/I18nContext";
import styles from "./styles.module.css";

type Solution = Partial<{
  id: string;
  imageZh: string;
  imageEn: string;
  imageActiveZh: string;
  imageActiveEn: string;
}>;

const SolutionCardList: React.FC<{ solutions: Solution[] }> = ({
  solutions = [],
}) => {
  const { lang } = useI18n();
  // 设置初始状态为第一个卡片的 id
  const [activeId, setActiveId] = useState<string>(solutions[0]?.id || "");

  const handleMouseEnter = (id: string) => {
    setActiveId(id);
  };

  const handleMouseLeave = () => {
    // 鼠标移开时恢复到第一个卡片
    setActiveId(solutions[0]?.id || "");
  };

  const handleClick = (id: string) => {
    setActiveId(id);
  };

  return (
    <div className={styles.container} onMouseLeave={handleMouseLeave}>
      {solutions.map((solution) => (
        <SolutionCard
          key={solution.id}
          image={
            lang === "zh" ? solution.imageZh || "" : solution.imageEn || ""
          }
          imageActive={
            lang === "zh"
              ? solution.imageActiveZh || ""
              : solution.imageActiveEn || ""
          }
          isActive={activeId === solution.id}
          onMouseEnter={() => handleMouseEnter(solution.id || "")}
          onClick={() => handleClick(solution.id || "")}
        />
      ))}
    </div>
  );
};

export default SolutionCardList;
