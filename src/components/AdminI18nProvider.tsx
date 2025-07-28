'use client';

import React, { useState, useEffect, ReactNode } from 'react';
import { AdminI18nContext, getInitialLang } from '@/hooks/useAdminI18n';

type Lang = 'zh' | 'en';

interface AdminI18nProviderProps {
  children: ReactNode;
}

export function AdminI18nProvider({ children }: AdminI18nProviderProps) {
  const [lang, setLang] = useState<Lang>('zh');
  const [mounted, setMounted] = useState(false);

  // 组件挂载后获取初始语言设置
  useEffect(() => {
    setLang(getInitialLang());
    setMounted(true);
  }, []);

  // 防止hydration不匹配，在挂载前使用默认语言
  const contextValue = {
    lang: mounted ? lang : 'zh' as Lang,
    setLang,
    t: (key: string) => key, // 这个会被useAdminI18n重写
  };

  return (
    <AdminI18nContext.Provider value={contextValue}>
      {children}
    </AdminI18nContext.Provider>
  );
}