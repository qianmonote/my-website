"use client";

import React, { useState, useEffect } from "react";
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
  const [activeId, setActiveId] = useState<string>(solutions[0]?.id || "");
  const [isMobile, setIsMobile] = useState(false);

  // 检测屏幕宽度
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1000);
    };

    // 初始检查
    checkScreenSize();

    // 监听窗口大小变化
    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  const handleMouseEnter = (id: string) => {
    // 在移动端不处理鼠标悬停
    if (!isMobile) {
      setActiveId(id);
    }
  };

  const handleMouseLeave = () => {
    // 在移动端不处理鼠标离开
    if (!isMobile) {
      setActiveId(solutions[0]?.id || "");
    }
  };

  const handleClick = (id: string) => {
    setActiveId(id);
  };

  return (
    <div className={`${styles.container} ${isMobile ? styles.mobileContainer : ''}`} onMouseLeave={handleMouseLeave}>
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
          isActive={isMobile || activeId === solution.id}
          onMouseEnter={() => handleMouseEnter(solution.id || "")}
          onClick={() => handleClick(solution.id || "")}
        />
      ))}
    </div>
  );
};

export default SolutionCardList;
