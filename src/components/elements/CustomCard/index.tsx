import React from "react";
import Image from "next/image";
import classnames from "classnames";
import { Space } from "antd";
import { useI18n } from "@/context/I18nContext";
import styles from "./styles.module.css";

interface CornerBorders {
  topLeft?: boolean;
  topRight?: boolean;
  bottomLeft?: boolean;
  bottomRight?: boolean;
}

interface CardProps {
  // 显示模式
  mode?: "imageText" | "textOnly"; // 图文模式 | 纯文字模式，默认图文模式

  // 图片相关
  image?: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    style?: React.CSSProperties;
  };

  // 背景图片
  backgroundImage?: {
    src: string;
    width?: number;
    height?: number;
    style?: React.CSSProperties;
  };

  // 文本内容
  titleZh?: string;
  titleEn?: string;
  subtitle?: string;
  descriptionZh?: string;
  descriptionEn?: string;
  // 自定义内容
  customContent?: React.ReactNode;

  // 样式配置
  className?: string;
  style?: React.CSSProperties; // 卡片整体样式
  contentStyle?: React.CSSProperties;
  borderRadius?: number | string; // 圆角设置

  // 角标配置
  cornerBorders?: CornerBorders;

  // 点击事件
  onClick?: () => void;

  // 更多按钮
  moreButton?: {
    text: string;
    onClick?: () => void;
    icon?: string;
  };
}

/**
 * 通用卡片组件
 * 支持图片、标题、副标题、角标配置和自定义内容
 * 支持图文模式和纯文字模式
 *
 * @param mode - 显示模式：'imageText'（图文模式，默认）| 'textOnly'（纯文字模式）
 * @param image - 图片配置（仅在图文模式下有效）
 * @param backgroundImage - 背景图片配置（两种模式都支持）
 * @param title - 标题文本
 * @param subtitle - 副标题文本
 * @param description - 描述文本
 * @param customContent - 自定义内容
 * @param className - CSS类名
 * @param style - 卡片整体样式
 * @param contentStyle - 内容区域样式
 * @param borderRadius - 圆角设置（number | string）
 * @param cornerBorders - 角标配置（仅在图文模式下显示）
 * @param onClick - 点击事件
 * @param moreButton - 更多按钮配置
 *
 * @example
 * // 图文模式（默认）
 * <CustomCard
 *   image={{ src: "/image.jpg", alt: "示例图片", width: 400, height: 300 }}
 *   title="卡片标题"
 *   description="卡片描述"
 *   borderRadius="12px"
 *   moreButton={{ text: "View>>", onClick: () => {} }}
 * />
 *
 * @example
 * // 纯文字模式
 * <CustomCard
 *   mode="textOnly"
 *   title="纯文字卡片"
 *   description="这是一个纯文字卡片，不显示图片和角标"
 *   backgroundImage={{ src: "/bg.jpg", width: 400, height: 200 }}
 *   style={{ background: 'linear-gradient(135deg, #1677ff, #4096ff)' }}
 * />
 */
const CustomCard: React.FC<CardProps> = ({
  mode = "imageText", // 默认图文模式
  image,
  backgroundImage,
  titleZh,
  titleEn,
  subtitle,
  descriptionZh,
  descriptionEn,
  customContent,
  className,
  style,
  contentStyle,
  borderRadius,
  cornerBorders = {
    topLeft: true,
    topRight: true,
    bottomLeft: true,
    bottomRight: true,
  },
  onClick,
  moreButton,
}) => {
  const { lang } = useI18n();
  // 组合卡片样式
  const cardStyle: React.CSSProperties = {
    ...style,
    ...(borderRadius && { borderRadius }),
  };

  const title = lang === "zh" ? titleZh : titleEn;
  const description = lang === "zh" ? descriptionZh : descriptionEn;

  return (
    <div
      className={classnames(styles.card, className, {
        [styles.textOnly]: mode === "textOnly",
      })}
      onClick={onClick}
      style={cardStyle}
      data-mode={mode}
    >
      {/* 图片区域 - 仅在图文模式下显示 */}
      {mode === "imageText" && image && (
        <div className={styles.imageContainer}>
          <Image
            alt={image.alt}
            src={image.src}
            width={image.width}
            height={image.height}
            className={styles.cardImage}
            style={image.style}
            unoptimized
          />
        </div>
      )}

      {/* 内容区域 */}
      <div className={styles.cardContent} style={contentStyle}>
        {/* 背景图片 - 两种模式都支持 */}
        {backgroundImage && (
          <Image
            alt=""
            src={backgroundImage.src}
            width={backgroundImage.width || 422}
            height={backgroundImage.height || 574}
            className={styles.cardContentBgImage}
            style={backgroundImage.style}
            unoptimized
          />
        )}

        <div className={styles.cardContentInner}>
          {/* 标题 */}
          {title && (
            <div
              className={styles.cardTitle}
              dangerouslySetInnerHTML={{
                __html: title.replace(/\r?\n/g, "<br />"),
              }}
            />
          )}

          {/* 副标题 */}
          {subtitle && <div className={styles.cardSubtitle}>{subtitle}</div>}
          <Space
            style={{
              width: "100%",
              justifyContent: "space-between",
              alignItems: "baseline",
            }}
          >
            {/* 描述 */}
            {description && (
              <div className={styles.cardDescription}>{description}</div>
            )}
            {/* 更多按钮 */}
            {moreButton && (
              <div className={styles.cardMoreContainer}>
                <a className={styles.cardMore} onClick={moreButton.onClick}>
                  {moreButton.icon && (
                    <Image
                      src={moreButton.icon}
                      alt=""
                      width={200}
                      height={48}
                      unoptimized
                    />
                  )}
                  <span className={styles.cardMoreText}>{moreButton.text}</span>
                </a>
              </div>
            )}
          </Space>

          {/* 自定义内容 */}
          {customContent && (
            <div className={styles.customContent}>{customContent}</div>
          )}
        </div>
      </div>
      {cornerBorders.topLeft && <div className={styles.borderTopLeft}></div>}
      {cornerBorders.topRight && <div className={styles.borderTopRight}></div>}
      {cornerBorders.bottomRight && (
        <div className={styles.borderBottomRight}></div>
      )}
      {cornerBorders.bottomLeft && (
        <div className={styles.borderBottomLeft}></div>
      )}
    </div>
  );
};

export default CustomCard;
