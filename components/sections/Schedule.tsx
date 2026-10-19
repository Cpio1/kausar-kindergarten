"use client";

import { CalendarDays, Clock, Coffee } from "lucide-react";
import { useI18n } from "@/lib/i18n/LanguageProvider";
import { site } from "@/lib/site";
import { Cloud, Star, Sun } from "@/components/ui/Decor";
import { Reveal } from "@/components/ui/Reveal";

export function Schedule() {
  const { t } = useI18n();

  return (
    <section id="schedule" className="relative py-10 sm:py-28 lg:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] rounded-tl-[3.5rem] bg-white p-4 shadow-lift ring-1 ring-lime-100 sm:rounded-[3rem] sm:p-12 lg:p-12">
            <Sun className="absolute -top-9 -left-9 w-24 text-lemon-200 sm:-top-14 sm:-left-14 sm:w-48 lg:w-36" />
            <Cloud className="absolute right-10 bottom-6 hidden w-28 text-mint-50 md:block" />
            <Star className="absolute top-10 right-[12%] hidden w-7 text-lime-300 sm:block" />

            <div className="relative grid items-center gap-4 sm:gap-10 lg:grid-cols-[1fr_1.6fr]">
              <div className="pt-2 text-center sm:pt-0 lg:text-left">
                <span className="inline-flex rounded-full bg-lime-100 px-3 py-1 text-[0.8125rem] font-bold text-lime-700 sm:px-4 sm:py-1.5 sm:text-sm">
                  {t.schedule.eyebrow}
                </span>
                <h2 className="mt-2.5 font-display text-[1.8rem] leading-tight font-bold text-balance text-ink sm:mt-4 sm:text-4xl lg:text-[2.6rem]">
                  {t.schedule.title}
                </h2>
              </div>

              <div className="grid gap-2.5 sm:grid-cols-2 sm:gap-4">
                <div className="flex flex-col rounded-[1.5rem] bg-linear-to-br from-lime-300 to-lime-200 p-3.5 sm:block sm:rounded-[2rem] sm:p-7 lg:p-6">
                  <span className="hidden size-12 place-items-center rounded-2xl bg-white/70 text-lime-700 sm:grid">
                    <CalendarDays className="size-6" />
                  </span>
                  <p className="hidden text-sm font-bold text-ink/70 sm:mt-5 sm:block">{t.schedule.workdaysLabel}</p>
                  <p className="order-2 mt-2 px-1 font-display text-base font-bold text-ink sm:order-none sm:mt-1 sm:px-0 sm:text-xl">{t.site.workdays}</p>
                  <p className="order-1 flex items-center gap-2 rounded-2xl bg-white/70 px-3.5 py-2.5 font-display text-xl font-bold whitespace-nowrap text-ink sm:order-none sm:mt-4 sm:px-4 sm:py-3 sm:text-2xl">
                    <Clock className="size-5 shrink-0 text-lime-700" />
                    {site.hours.time}
                  </p>
                </div>
                <div className="flex items-center justify-between gap-3 rounded-[1.5rem] bg-lemon-100 px-4 py-3 sm:block sm:rounded-[2rem] sm:p-7 lg:p-6">
                  <span className="hidden size-12 place-items-center rounded-2xl bg-white/70 text-lime-700 sm:grid">
                    <Coffee className="size-6" />
                  </span>
                  <p className="order-2 text-sm font-bold text-ink/70 sm:mt-5">{t.schedule.weekendLabel}</p>
                  <p className="order-1 font-display text-base font-bold text-ink sm:mt-1 sm:text-xl">{t.site.weekend}</p>
                  <p className="mt-4 hidden rounded-2xl bg-white/70 px-4 py-3 font-bold text-ink-soft sm:block">{t.schedule.weekendNote}</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
