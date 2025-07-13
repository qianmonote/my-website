'use client';

import React, { useState } from 'react';
import SolutionCard from '../SolutionCard';
import styles from './styles.module.css';

const solutions = [
  {
    id: '1',
    number: '1',
    title: '光伏矩阵',
    description: '定制化屋顶/地面光伏系统，年均发电效率提升18%',
    features: [
      '清洁能源:零碳排放，减少化石燃料依赖',
      '可再生:太阳能取之不尽',
      '低维护:无机械运动部件，寿命长达25-30年',
      '灵活部署:可大规模电站也可小型化应用'
    ],
    image: '/home/banner/bn-1.jpg'
  },
  {
    id: '2',
    number: '2',
    title: '智慧储能',
    description: '梯次电池+智能EMS管理系统，削峰填谷节省30%电费',
    features: [
      '自发自用:优先使用光伏电力，多余部分储储或上网',
      '削峰填谷:在电价低谷时充电，高峰时放电以节省电费',
      '备用电源:电网断电时提供应急电力',
      '灵活部署:可大规模电站也可小型化应用'
    ],
    image: '/home/banner/bn-2.jpg'
  },
  {
    id: '3',
    number: '3',
    title: '柴油备用',
    description: '无缝切换应急电源，保障关键负载24小时不间断运行',
    features: [
      '可靠性高:启动快(10-30秒内供电)，适合应急场景',
      '功率范围广:从几千瓦到数兆瓦，满足不同需求',
      '燃料易获取:柴油储存方便，适合偏远地区',
      '寿命长:维护得当可使用10-20年'
    ],
    image: '/home/banner/bn-3.jpg'
  },
  {
    id: '4',
    number: '4',
    title: '充电生态',
    description: '智能充电管理系统，支持多种充电模式和计费方式',
    features: [
      '快速充电:支持直流快充和交流慢充',
      '智能调度:根据用电负荷自动调节充电功率',
      '多重保护:过压、过流、短路等多重安全保护',
      '便捷支付:支持多种支付方式和计费模式'
    ],
    image: '/home/banner/bn-4.jpg'
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
          number={solution.number}
          title={solution.title}
          description={solution.description}
          features={solution.features}
          image={solution.image}
          isActive={activeId === solution.id}
          onMouseEnter={() => handleMouseEnter(solution.id)}
          onClick={() => handleClick(solution.id)}
        />
      ))}
    </div>
  );
};

export default SolutionCardList; 