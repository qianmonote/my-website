'use client';

import React, { useState } from 'react';
import SolutionCard from '../SolutionCard';
import styles from './styles.module.css';

const solutions = [
  {
    id: '1',
    image: '/product/p2/part1/01.png',
    imageActive: '/product/p2/part1/01-active.png'
  },
  {
    id: '2',
    image: '/product/p2/part1/02.png',
    imageActive: '/product/p2/part1/02-active.png'
  },
  {
    id: '3',
    image: '/product/p2/part1/03.png',
    imageActive: '/product/p2/part1/03-active.png'
  },
  {
    id: '4',
    image: '/product/p2/part1/04.png',
    imageActive: '/product/p2/part1/04-active.png'
  }
];

const SolutionCardList: React.FC = () => {
  // 设置初始状态为第一个卡片的 id
  const [activeId, setActiveId] = useState<string>(solutions[0].id);

  const handleMouseEnter = (id: string) => {
    setActiveId(id);
  };

  const handleMouseLeave = () => {
    // 鼠标移开时恢复到第一个卡片
    setActiveId(solutions[0].id);
  };

  const handleClick = (id: string) => {
    setActiveId(id);
  };

  return (
    <div 
      className={styles.container}
      onMouseLeave={handleMouseLeave}
    >
      {solutions.map((solution) => (
        <SolutionCard
          key={solution.id}
          image={solution.image}
          imageActive={solution.imageActive}
          isActive={activeId === solution.id}
          onMouseEnter={() => handleMouseEnter(solution.id)}
          onClick={() => handleClick(solution.id)}
        />
      ))}
    </div>
  );
};

export default SolutionCardList; 