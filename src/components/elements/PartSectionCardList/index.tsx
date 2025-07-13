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
  title: React.ReactNode;
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
  defaultImageSize?: {
    imageWidth?: number;
    imageHeight?: number;
    style?: React.CSSProperties;
  };
  defaultColSpan?: number;
  defaultRowGutter?: number;
  titleUnderlinePlacement?: "bottom" | "top";
  descriptionStyle?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
}>;

const PartSectionCardList: React.FC<PartSectionCardListProps> = ({
  title,
  introText,
  className = "",
  style,
  defaultRowGutter = 16,
  dataList = [],
  defaultColSpan = 8,
  defaultImageSize = {
    imageWidth: 0,
    imageHeight: 0,
    style: {},
  },
  titleUnderlinePlacement = "bottom",
  descriptionStyle = {},
  contentStyle = {},
}) => {
  return (
    <PartSection title={title} className={className} style={style}>
      <div className={styles.partSectionIntroText}>{introText}</div>
      <Row gutter={defaultRowGutter}>
        {dataList.map((item, index) => (
          <Col key={index} span={item.colSpan || defaultColSpan}>
            <div className={styles.commonCard}>
              <div
                className={styles.commonImage}
                style={{ ...defaultImageSize.style }}
              >
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.title || ""}
                    width={item.imageWidth || defaultImageSize.imageWidth}
                    height={item.imageHeight || defaultImageSize.imageHeight}
                  />
                )}
              </div>
              <div className={styles.commonContent} style={contentStyle}>
                {item.title && (
                  <h3>
                    <div className={styles.commonContentTitle}>
                      {titleUnderlinePlacement === "top" && (
                        <div className={styles.commonTitleUnderlineTop} />
                      )}
                      {item.title}
                      {titleUnderlinePlacement === "bottom" && (
                        <div className={styles.commonTitleUnderlineBottom} />
                      )}
                    </div>
                  </h3>
                )}
                {item.description && <p style={descriptionStyle}>{item.description}</p>}
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </PartSection>
  );
};

export default PartSectionCardList;
