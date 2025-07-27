import React, { useEffect, useState } from 'react';
import { Modal, Drawer } from 'antd';
import Image from 'next/image';
import styles from './styles.module.css';

interface DetailModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  description: string;
  image?: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  };
  content?: React.ReactNode;
}

/**
 * 详情弹窗组件
 * 大屏幕下显示模态框，小屏幕下显示底部侧滑
 */
const DetailModal: React.FC<DetailModalProps> = ({
  visible,
  onClose,
  title,
  description,
  image,
  content,
}) => {
  const [isMobile, setIsMobile] = useState(false);

  // 检测屏幕尺寸
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 730);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  // 移动端底部侧滑
  if (isMobile) {
    return (
      <Drawer
        title={title}
        placement="bottom"
        onClose={onClose}
        open={visible}
        height="80vh"
        className={styles.mobileDrawer}
        styles={{
          body: {
            padding: '20px',
            background: '#ffffff',
            color: '#333',
          },
          header: {
            background: '#ffffff',
            borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
            color: '#333',
          },
          mask: {
            background: 'rgba(0, 0, 0, 0.5)',
          },
        }}
      >
        <div className={styles.mobileContent}>
          {image && (
            <div className={styles.mobileImageContainer}>
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width || 400}
                height={image.height || 300}
                className={styles.mobileImage}
              />
            </div>
          )}
          <div className={styles.mobileDescription}>
            {description}
          </div>
          {content && (
            <div className={styles.mobileCustomContent}>
              {content}
            </div>
          )}
        </div>
      </Drawer>
    );
  }

  // 桌面端模态框
  return (
    <Modal
      title={title}
      open={visible}
      onCancel={onClose}
      footer={null}
      width={800}
      className={styles.desktopModal}
      styles={{
        content: {
          background: '#ffffff',
          color: '#333',
        },
        header: {
          background: '#ffffff',
          borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
          color: '#333',
        },
        mask: {
          background: 'rgba(0, 0, 0, 0.5)',
        },
      }}
    >
      <div className={styles.desktopContent}>
        {image && (
          <div className={styles.desktopImageContainer}>
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width || 600}
              height={image.height || 400}
              className={styles.desktopImage}
            />
          </div>
        )}
        <div className={styles.desktopDescription}>
          {description}
        </div>
        {content && (
          <div className={styles.desktopCustomContent}>
            {content}
          </div>
        )}
      </div>
    </Modal>
  );
};

export default DetailModal;