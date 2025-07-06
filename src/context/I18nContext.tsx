'use client';

import React, { createContext, useContext, useState, ReactNode } from "react";
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
  const t = (key: keyof Dict) => dictMap[lang][key] || key;
  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => useContext(I18nContext); 