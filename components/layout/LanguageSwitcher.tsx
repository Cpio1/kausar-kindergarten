"use client";

import { cn } from "@/lib/cn";
import { languages, useI18n } from "@/lib/i18n/LanguageProvider";

/** Переключатель ҚАЗ | РУС: активный язык — лаймовая «таблетка». */
export function LanguageSwitcher({ className }: { className?: string }) {
  const { lang, setLang, t } = useI18n();

  return (
    <div
      role="group"
      aria-label={t.header.language}
      className={cn("flex items-center rounded-full bg-white p-1 shadow-soft ring-1 ring-lime-100", className)}
    >
      {languages.map(({ code, label }) => (
        <button
          key={code}
          type="button"
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          lang={code === "kz" ? "kk" : "ru"}
          className={cn(
            "rounded-full px-2.5 py-2 text-xs font-extrabold tracking-wide transition sm:px-3.5",
            lang === code ? "bg-lime-500 text-white shadow-sm" : "text-ink-soft hover:bg-lime-50 hover:text-ink",
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
