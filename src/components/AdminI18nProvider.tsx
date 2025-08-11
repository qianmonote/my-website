'use client';

import React, { useState, useEffect, ReactNode } from 'react';
import { AdminI18nContext, getInitialLang } from '@/hooks/useAdminI18n';

type Lang = 'zh' | 'en';

interface AdminI18nProviderProps {
  children: ReactNode;
}

export function AdminI18nProvider({ children }: AdminI18nProviderProps) {
  // 服务端和客户端都使用相同的默认值，避免hydration不匹配
  const [lang, setLang] = useState<Lang>('zh');
  const [isHydrated, setIsHydrated] = useState(false);

  // 客户端挂载后立即设置正确的语言
  useEffect(() => {
    const initialLang = getInitialLang();
    setLang(initialLang);
    setIsHydrated(true);
  }, []);

  // 包装setLang函数，在设置语言的同时保存到localStorage
  const handleSetLang = (newLang: Lang) => {
    setLang(newLang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('admin-lang', newLang);
    }
  };

  const contextValue = {
    lang,
    setLang: handleSetLang,
    t: (key: string) => key, // 这个会被useAdminI18n重写
  };

  // 在hydration完成前，使用透明度来隐藏内容，避免闪烁
  const wrapperStyle = {
    opacity: isHydrated ? 1 : 0,
    transition: 'opacity 0.1s ease-in-out'
  };

  return (
    <AdminI18nContext.Provider value={contextValue}>
      <div style={wrapperStyle}>
        {children}
      </div>
    </AdminI18nContext.Provider>
  );
}