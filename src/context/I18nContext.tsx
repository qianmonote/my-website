'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import zh from "../config/locales/zh/common.json";
import en from "../config/locales/en/common.json";

type Lang = "zh" | "en";
type Dict = typeof zh;

const dictMap: Record<Lang, Dict> = { zh, en };

const I18nContext = createContext<{
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: keyof Dict) => string;
}>({
  lang: "zh",
  setLang: () => {},
  t: (key) => key as string,
});

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>("en");
  
  // 从localStorage读取用户之前的语言选择
  useEffect(() => {
    const savedLang = localStorage.getItem('preferred-language') as Lang;
    if (savedLang && (savedLang === 'zh' || savedLang === 'en')) {
      setLang(savedLang);
    }
  }, []);
  
  // 包装setLang函数，在设置语言的同时保存到localStorage
  const handleSetLang = (newLang: Lang) => {
    setLang(newLang);
    localStorage.setItem('preferred-language', newLang);
  };
  
  const t = (key: keyof Dict) => dictMap[lang][key] || key;
  return (
    <I18nContext.Provider value={{ lang, setLang: handleSetLang, t }}>
      {children}
    </I18nContext.Provider>
  );
  };

export const useI18n = () => useContext(I18nContext);