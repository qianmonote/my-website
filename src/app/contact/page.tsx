'use client';

import React from 'react';
import ContactForm from '@/components/ContactForm';
import styles from './styles.module.css';

export default function ContactPage() {
  const handleSuccess = () => {
    // 提交成功后的回调处理
    console.log('表单提交成功');
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* 页面标题 */}
        <div className={styles.header}>
          <h1 className={styles.title}>联系我们</h1>
          <p className={styles.subtitle}>
            我们致力于为您提供最专业的解决方案，请填写以下信息，我们会尽快与您联系
          </p>
        </div>

        {/* 联系表单 */}
        <div className={styles.formSection}>
          <ContactForm 
            title="提交您的需求"
            onSuccess={handleSuccess}
          />
        </div>

        {/* 其他联系方式 */}
        <div className={styles.contactInfo}>
          <div className={styles.infoGrid}>
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>📧</div>
              <h3>邮箱联系</h3>
              <p>contact@company.com</p>
              <p>support@company.com</p>
            </div>
            
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>📞</div>
              <h3>电话咨询</h3>
              <p>客服热线：400-xxx-xxxx</p>
              <p>工作时间：9:00-18:00</p>
            </div>
            
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>📍</div>
              <h3>公司地址</h3>
              <p>北京市朝阳区xxx路xxx号</p>
              <p>xxx大厦xx层</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 