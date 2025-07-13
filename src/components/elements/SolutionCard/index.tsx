'use client';

import React from 'react';
import styles from './styles.module.css';

interface SolutionCardProps {
  number: string;
  title: string;
  description: string;
  features: string[];
  image: string;
  isActive?: boolean;
  onClick?: () => void;
  onMouseEnter?: () => void;
}

const SolutionCard: React.FC<SolutionCardProps> = ({
  number,
  title,
  description,
  features,
  image,
  isActive = false,
  onClick,
  onMouseEnter
}) => {
  return (
    <div 
      className={`${styles.card} ${isActive ? styles.active : ''}`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
    >
      <div className={styles.number}>{number}</div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.details}>
          <ul className={styles.features}>
            {features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
      <div 
        className={styles.background}
        style={{ backgroundImage: `url(${image})` }}
      />
    </div>
  );
};

export default SolutionCard; 