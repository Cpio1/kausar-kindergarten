"use client";

import { nutritionIcons } from "@/lib/content";
import { useI18n } from "@/lib/i18n/LanguageProvider";
import type { Photo } from "@/lib/images";
import { cn } from "@/lib/cn";
import { Leaf } from "@/components/ui/Decor";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Раскладка плиток зависит от количества фото: первое всегда крупное. */
function tileClass(index: number, total: number) {
  if (total === 1) return "col-span-2 aspect-[16/10]";
  if (index === 0) return total === 2 ? "aspect-[3/4]" : "col-span-2 aspect-[16/9]";
  if (total === 2) return "aspect-[3/4] mt-10";
  return "aspect-square";
}

export function Nutrition({ photos }: { photos: Photo[] }) {
  const { t } = useI18n();
  const highlights = t.nutrition.highlights.map((text, i) => ({ text, icon: nutritionIcons[i] }));
  // Пока фото еды нет — показываем три аккуратные заглушки
  const tiles = photos.length ? photos : [null, null, null];

  return (
    <section id="nutrition" className="relative overflow-hidden py-12 sm:py-28 lg:py-20">
      <div className="relative mx-auto grid max-w-7xl items-center gap-5 px-5 sm:gap-12 sm:px-6 lg:grid-cols-[1fr_1fr] lg:gap-14 lg:px-8">
        <div>
          <SectionHeading eyebrow={t.nutrition.eyebrow} title={t.nutrition.title} align="left" />
          <Reveal delay={100}>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-pretty text-ink-soft sm:mt-6 sm:text-lg">
              {t.nutrition.text}
            </p>
          </Reveal>

          <Reveal delay={200} className="mt-4 sm:mt-8">
            <div className="relative overflow-hidden sm:rounded-[2rem] sm:bg-lemon-100 sm:p-7 lg:p-6">
              <Leaf className="absolute -right-3 -bottom-3 hidden w-20 -rotate-12 text-lemon-200 sm:block" />
              <div className="relative hidden items-center gap-5 sm:flex">
                <span className="font-display text-6xl leading-none font-bold text-lime-600">5</span>
                <div>
                  <p className="font-display text-lg font-bold text-ink">{t.nutrition.countLabel}</p>
                  <div className="mt-2 flex gap-1.5" aria-hidden>
                    {Array.from({ length: 5 }, (_, i) => (
                      <span key={i} className="size-3 rounded-full bg-lime-400" style={{ opacity: 0.45 + i * 0.13 }} />
                    ))}
                  </div>
                </div>
              </div>
              <ul className="relative flex flex-wrap gap-2 sm:mt-6 sm:grid sm:gap-2.5">
                {highlights.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-center gap-2 rounded-full bg-lemon-100 py-1 pr-3 pl-1 text-[0.8125rem] font-bold text-ink sm:gap-3 sm:rounded-none sm:bg-transparent sm:p-0 sm:text-base">
                    <span className="grid size-7 place-items-center rounded-full bg-white text-lime-600 sm:size-9 sm:rounded-xl">
                      <Icon className="size-3.5 sm:size-4.5" />
                    </span>
                    {text}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal delay={150} className="relative grid grid-cols-2 gap-2.5 sm:gap-4">
          {tiles.map((photo, i) => (
            <PhotoFrame
              key={photo?.src ?? i}
              photo={photo}
              alt={t.nutrition.photoAlt}
              tone={i % 2 ? "lemon" : "mint"}
              sizes={i === 0 && tiles.length !== 2 ? "(min-width: 1024px) 640px, 92vw" : "(min-width: 1024px) 320px, 46vw"}
              placeholderLabel={t.nutrition.photoPlaceholder}
              className={cn("group rounded-[1.5rem] rounded-tr-[3rem] shadow-soft sm:rounded-[2rem]", tileClass(i, tiles.length))}
              imageClassName="transition duration-700 group-hover:scale-105"
            />
          ))}
          {/* На телефоне «5 рет тамақтану» — компактный бейдж поверх фото */}
          <div className="absolute bottom-3 left-3 z-10 flex items-center gap-2 rounded-2xl bg-white/95 py-1.5 pr-3 pl-2.5 shadow-lift backdrop-blur sm:hidden">
            <span className="font-display text-2xl leading-none font-bold text-lime-600">5</span>
            <span className="text-[0.8125rem] leading-tight font-bold text-ink">{t.nutrition.countLabel}</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
