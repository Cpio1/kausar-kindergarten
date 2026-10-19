"use client";

import { cn } from "@/lib/cn";
import { useI18n } from "@/lib/i18n/LanguageProvider";

/** Логотип: солнце-листок + название. */
export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  const { t } = useI18n();
  return (
    <span className={cn("flex items-center gap-2.5 sm:gap-3", className)}>
      <span className="relative grid size-10 shrink-0 place-items-center rounded-[0.9rem] bg-lemon-200 shadow-soft sm:size-11 sm:rounded-2xl">
        <svg viewBox="0 0 40 40" aria-hidden className="size-6 sm:size-7">
          <circle cx="20" cy="17" r="8" fill="#f2cf45" />
          <path d="M8 34c0-8 6-13 12-13s12 5 12 13" fill="#a5cc4c" />
          <path d="M20 34c0-6 3-10 8-12-1 6-3 10-8 12Z" fill="#6f962a" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-lg font-bold tracking-tight text-ink sm:text-xl">«Кәусар»</span>
        {!compact && (
          <span className="mt-0.5 text-[0.65rem] font-bold tracking-wide text-ink-soft sm:mt-1 sm:text-[0.7rem]">{t.site.logoSubtitle}</span>
        )}
      </span>
    </span>
  );
}
