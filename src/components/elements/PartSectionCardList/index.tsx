/**
 * 产品介绍页面的子模块，卡片列表
 */
import React from "react";
import { Row, Col } from "antd";
import Image from "next/image";
import PartSection from "@/components/elements/PartSection";
import styles from "./style.module.css";

type PartSectionCardListProps = Partial<{
  /** 标题 */
  title: string;
  /** 介绍文本 */
  introText: string;
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  /** 数据列表 */
  dataList: Partial<{
    image: string;
    imageWidth: number;
    imageHeight: number;
    title: string;
    description: string;
    colSpan: number;
  }>[];
  gutter?: number;
}>;

const PartSectionCardList: React.FC<PartSectionCardListProps> = ({
  title,
  introText,
  className = "",
  style,
  gutter = 16,
  dataList = [],
}) => {
  return (
    <PartSection title={title} className={className} style={style}>
      <div className={styles.partSectionIntroText}>{introText}</div>
      <Row gutter={gutter}>
        {dataList.map((item, index) => (
          <Col key={index} span={item.colSpan || 8}>
            <div className={styles.commonCard}>
              <div className={styles.commonImage}>
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.title || ''}
                    width={item.imageWidth || 0}
                    height={item.imageHeight || 0}
                  />
                )}
              </div>
              <div className={styles.commonContent}>
                {item.title && (
                  <h3>
                    <div className={styles.commonContentTitle}>
                      {item.title}
                      <div className={styles.commonTitleUnderline} />
                    </div>
                  </h3>
                )}
                {item.description && <p>{item.description}</p>}
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </PartSection>
  );
};

export default PartSectionCardList;
