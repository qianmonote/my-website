'use client';

import React from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import enUS from 'antd/locale/en_US';
import { useI18n } from '@/context/I18nContext';
import themeConfig from '@/config/theme';

interface AntdLocaleProviderProps {
  children: React.ReactNode;
}

const AntdLocaleProvider: React.FC<AntdLocaleProviderProps> = ({ children }) => {
  const { lang } = useI18n();
  
  // 根据当前语言选择对应的 Antd locale
  const locale = lang === 'zh' ? zhCN : enUS;
  
  return (
    <ConfigProvider 
      theme={themeConfig} 
      locale={locale}
      prefixCls="qm"
    >
      {children}
    </ConfigProvider>
  );
};

export default AntdLocaleProvider;