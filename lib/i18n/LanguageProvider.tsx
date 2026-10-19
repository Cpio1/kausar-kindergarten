"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { kz, type Dictionary } from "./kz";
import { ru } from "./ru";

export type Lang = "kz" | "ru";

export const languages: { code: Lang; label: string }[] = [
  { code: "kz", label: "ҚАЗ" },
  { code: "ru", label: "РУС" },
];

const dictionaries: Record<Lang, Dictionary> = { kz, ru };
const STORAGE_KEY = "kausar-lang";

type LanguageContextValue = { lang: Lang; setLang: (lang: Lang) => void; t: Dictionary };

const LanguageContext = createContext<LanguageContextValue>({ lang: "kz", setLang: () => {}, t: kz });

/** Язык переключается без перезагрузки; выбор сохраняется в localStorage. По умолчанию — казахский. */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("kz");

  // Сервер всегда отдаёт казахскую версию, сохранённый выбор применяем после загрузки
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "kz" || saved === "ru") setLangState(saved);
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "kz" ? "kk" : "ru";
    const title = dictionaries[lang].meta.title;
    const applyTitle = () => {
      if (document.title !== title) document.title = title;
    };
    applyTitle();
    // Next.js выставляет <title> из metadata уже после гидрации — возвращаем заголовок на выбранном языке
    const observer = new MutationObserver(applyTitle);
    observer.observe(document.head, { childList: true, subtree: true, characterData: true });
    return () => observer.disconnect();
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {}
  }, []);

  return <LanguageContext.Provider value={{ lang, setLang, t: dictionaries[lang] }}>{children}</LanguageContext.Provider>;
}

export const useI18n = () => useContext(LanguageContext);
