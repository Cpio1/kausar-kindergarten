"use client";

import { ArrowRight, Clock, Heart, Phone } from "lucide-react";
import { useI18n } from "@/lib/i18n/LanguageProvider";
import type { Photo } from "@/lib/images";
import { site } from "@/lib/site";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Blob, Cloud, Leaf, Star, Sun } from "@/components/ui/Decor";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { Reveal } from "@/components/ui/Reveal";

export function Hero({ photo }: { photo: Photo | null }) {
  const { t } = useI18n();

  return (
    <section id="home" className="relative overflow-hidden bg-linear-to-b from-cream via-milk to-milk pt-[5.5rem] pb-12 sm:pt-32 sm:pb-16 lg:pt-28 lg:pb-16">
      {/* Декор фона */}
      <Blob className="absolute -top-20 -left-24 w-[16rem] text-lemon-100/80 sm:-top-32 sm:-left-40 sm:w-[28rem] lg:w-[21rem]" />
      <Blob className="absolute top-1/2 -right-28 w-[18rem] rotate-90 text-lime-100/70 sm:top-1/3 sm:-right-48 sm:w-[32rem] lg:-right-40 lg:w-[24rem]" />
      <Cloud className="absolute top-24 left-[44%] hidden w-20 animate-float text-white lg:block" />
      <Star className="absolute bottom-16 left-[6%] hidden w-7 animate-float text-lemon-300 sm:block lg:w-5" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 sm:gap-12 sm:px-6 lg:grid-cols-[1.25fr_1fr] lg:gap-12 lg:px-8">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1.5 text-[0.8125rem] font-bold text-lime-700 shadow-soft ring-1 ring-lime-100 sm:gap-2 sm:px-4 sm:py-2 sm:text-sm">
              <Heart className="size-3.5 fill-lime-300 text-lime-500 sm:size-4" />
              {t.site.name}
            </span>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="mt-4 font-display text-[2.35rem] leading-[1.12] font-bold text-balance text-ink sm:mt-6 sm:text-5xl lg:text-[3.6rem]">
              {t.hero.titleStart}{" "}
              <span className="relative z-0 inline-block whitespace-nowrap text-lime-600">
                {t.hero.titleAccent}
                <svg viewBox="0 0 200 14" aria-hidden className="absolute top-full left-0 -mt-[0.02em] h-[0.22em] w-full text-lemon-300" preserveAspectRatio="none">
                  <path d="M3 9c40-6 110-8 194-3" stroke="currentColor" strokeWidth="6" strokeLinecap="round" fill="none" />
                </svg>
              </span>
              {t.hero.titleEnd && <> {t.hero.titleEnd}</>}
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-4 max-w-xl text-[1rem] leading-relaxed text-pretty text-ink-soft sm:mt-6 sm:text-xl">
              {t.hero.text}
            </p>
          </Reveal>

          <Reveal delay={300} className="mt-6 flex flex-wrap gap-2.5 sm:mt-8 sm:flex-nowrap sm:gap-3">
            <ButtonLink href="#about" className="grow sm:grow-0">
              {t.hero.aboutButton}
              <ArrowRight className="size-4" />
            </ButtonLink>
            <ButtonLink href="#contacts" variant="secondary" className="grow sm:grow-0">
              <Phone className="size-4 text-lime-600" />
              {t.hero.contactButton}
            </ButtonLink>
          </Reveal>

          <Reveal delay={400}>
            <ul className="mt-6 grid grid-cols-2 gap-2 sm:mt-10 sm:flex sm:flex-wrap sm:gap-3 lg:mt-8 lg:gap-2.5">
              {t.hero.facts.map((fact, i) => (
                <li
                  key={fact}
                  className="flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-[0.8125rem] font-extrabold text-ink shadow-soft ring-1 ring-lime-100/70 sm:gap-2.5 sm:rounded-2xl sm:px-4 sm:py-3 sm:text-sm lg:py-2.5"
                >
                  <span className={i % 2 ? "size-2 shrink-0 rounded-full bg-lemon-400 sm:size-2.5" : "size-2 shrink-0 rounded-full bg-lime-400 sm:size-2.5"} />
                  {fact}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Фото */}
        <Reveal delay={150} className="relative mx-auto w-[80%] max-w-md sm:w-full sm:max-w-lg lg:max-w-none">
          <Sun className="absolute -top-7 -right-5 z-10 w-16 text-lemon-300 sm:-top-10 sm:-right-4 sm:w-28 lg:-top-8 lg:w-20" />
          <Leaf className="absolute -bottom-4 -left-4 z-10 w-9 -rotate-12 text-lime-400 sm:-bottom-6 sm:w-16 lg:-bottom-5 lg:w-12" />
          <div className="absolute inset-0 translate-x-2.5 translate-y-2.5 rounded-[2rem] rounded-tl-[5rem] bg-lime-200/70 sm:translate-x-4 sm:translate-y-4 sm:rounded-[3rem] sm:rounded-tl-[8rem] lg:translate-x-3 lg:translate-y-3 lg:rounded-[2.5rem] lg:rounded-tl-[6.5rem]" aria-hidden />
          <PhotoFrame
            photo={photo}
            alt={t.hero.photoAlt}
            priority
            sizes="(min-width: 1024px) 500px, (min-width: 640px) 512px, 80vw"
            placeholderLabel={t.hero.photoPlaceholder}
            className="aspect-square rounded-[2rem] rounded-tl-[5rem] shadow-lift ring-[6px] ring-white sm:aspect-[4/5] sm:rounded-[3rem] sm:rounded-tl-[8rem] sm:ring-8 lg:aspect-square lg:rounded-[2.5rem] lg:rounded-tl-[6.5rem] lg:ring-[6px]"
          />

          <div className="absolute -bottom-5 -right-3 z-10 flex items-center gap-2.5 rounded-2xl bg-white/95 px-3 py-2 shadow-lift backdrop-blur sm:-bottom-6 sm:right-8 sm:gap-3 sm:rounded-3xl sm:px-4 sm:py-3">
            <span className="grid size-9 place-items-center rounded-xl bg-lemon-100 text-lime-700 sm:size-11 sm:rounded-2xl">
              <Clock className="size-4 sm:size-5" />
            </span>
            <span className="leading-tight">
              <span className="block text-xs font-bold text-ink-soft">{t.site.workdays}</span>
              <span className="block font-display text-[0.95rem] font-bold text-ink sm:text-base">{site.hours.time}</span>
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
