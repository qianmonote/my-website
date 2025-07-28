'use client';

import { createContext, useContext } from 'react';
import zhAdmin from '../config/locales/zh/admin.json';
import enAdmin from '../config/locales/en/admin.json';

type Lang = 'zh' | 'en';
type AdminDict = typeof zhAdmin;

const adminDictMap: Record<Lang, AdminDict> = {
  zh: zhAdmin,
  en: enAdmin,
};

interface AdminI18nContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}

export const AdminI18nContext = createContext<AdminI18nContextType>({
  lang: 'zh',
  setLang: () => {},
  t: (key) => key,
});

// 获取嵌套对象的值
function getNestedValue(obj: Record<string, unknown>, path: string): string {
  return path.split('.').reduce((current, key) => {
    return current && typeof current === 'object' && current !== null && key in current 
      ? (current as Record<string, unknown>)[key] 
      : path;
  }, obj as unknown) as string;
}

// 替换模板字符串中的变量
function interpolate(template: string, variables: Record<string, string | number> = {}): string {
  return template.replace(/\{(\w+)\}/g, (match, key) => {
    return variables[key] !== undefined ? String(variables[key]) : match;
  });
}

export function useAdminI18n() {
  const context = useContext(AdminI18nContext);
  if (!context) {
    throw new Error('useAdminI18n must be used within AdminI18nProvider');
  }

  const { lang, setLang } = context;

  // 翻译函数，支持嵌套键和变量插值
  const t = (key: string, variables?: Record<string, string | number>): string => {
    const dict = adminDictMap[lang] as Record<string, unknown>;
    const value = getNestedValue(dict, key);
    
    if (typeof value === 'string' && variables) {
      return interpolate(value, variables);
    }
    
    return typeof value === 'string' ? value : key;
  };

  // 切换语言并保存到localStorage
  const switchLang = (newLang: Lang) => {
    setLang(newLang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('admin-lang', newLang);
    }
  };

  return {
    lang,
    setLang: switchLang,
    t,
  };
}

// 获取初始语言设置
export function getInitialLang(): Lang {
  if (typeof window === 'undefined') {
    return 'zh'; // 服务端默认中文
  }
  
  // 从localStorage获取保存的语言设置
  const savedLang = localStorage.getItem('admin-lang') as Lang;
  if (savedLang && ['zh', 'en'].includes(savedLang)) {
    return savedLang;
  }
  
  // 从浏览器语言设置推断
  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith('zh')) {
    return 'zh';
  }
  
  return 'en'; // 默认英文
}