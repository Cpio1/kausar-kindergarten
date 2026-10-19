"use client";

import { dailyActivityIcons } from "@/lib/content";
import { useI18n } from "@/lib/i18n/LanguageProvider";
import type { Photo } from "@/lib/images";
import { Cloud, Leaf, Sun } from "@/components/ui/Decor";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { Reveal } from "@/components/ui/Reveal";

const activityTones = ["bg-lemon-200", "bg-white", "bg-white", "bg-lemon-200"];

export function DailyLife({ photos }: { photos: Photo[] }) {
  const { t } = useI18n();
  const activities = t.daily.activities.map((title, i) => ({ title, icon: dailyActivityIcons[i] }));

  return (
    <section className="px-3 pt-6 sm:px-5 sm:pt-14">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] rounded-tr-[3.5rem] bg-linear-to-br from-lime-200 via-lime-100 to-lemon-100 px-5 py-9 sm:rounded-[3.5rem] sm:px-10 sm:py-20 lg:px-14 lg:py-16">
        <Sun className="absolute -top-8 -right-8 w-24 text-lemon-300/70 sm:-top-12 sm:-right-12 sm:w-44 lg:w-32" />
        <Cloud className="absolute bottom-8 left-[45%] hidden w-24 text-white/60 lg:block" />
        <Leaf className="absolute top-10 left-6 hidden w-10 rotate-12 text-lime-400/50 sm:block" />

        <div className="relative grid items-center gap-6 sm:gap-12 lg:grid-cols-[1fr_1fr] lg:gap-14">
          <div>
            <Reveal>
              <span className="inline-flex rounded-full bg-white/70 px-3 py-1 text-[0.8125rem] font-bold text-lime-700 sm:px-4 sm:py-1.5 sm:text-sm">
                {t.daily.eyebrow}
              </span>
              <h2 className="mt-3 font-display text-[1.8rem] leading-tight font-bold text-balance text-ink sm:mt-4 sm:text-4xl lg:text-[2.6rem]">
                {t.daily.title}
              </h2>
            </Reveal>
            <Reveal delay={100} className="mt-3 space-y-2 text-[0.95rem] leading-relaxed text-pretty text-ink/80 sm:mt-6 sm:space-y-4 sm:text-lg">
              {t.daily.paragraphs.map((text) => (
                <p key={text}>{text}</p>
              ))}
            </Reveal>

            <ul className="mt-5 grid grid-cols-2 gap-2 sm:mt-8 sm:gap-3">
              {activities.map(({ icon: Icon, title }, i) => (
                <Reveal as="li" key={title} delay={150 + i * 80}>
                  <div className="flex h-full items-center gap-2 max-[374px]:flex-col max-[374px]:items-start rounded-2xl bg-white/85 p-2 pr-2.5 shadow-soft backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:bg-white sm:gap-3 sm:rounded-3xl sm:p-3 sm:pr-4">
                    <span className={`grid size-8 shrink-0 place-items-center rounded-xl text-lime-700 sm:size-11 sm:rounded-2xl ${activityTones[i]} ring-1 ring-lime-200`}>
                      <Icon className="size-4 sm:size-5" />
                    </span>
                    <span className="text-[0.8125rem] leading-snug font-extrabold text-ink sm:text-[0.95rem]">{title}</span>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>

          {/* Коллаж из трёх фото */}
          <Reveal delay={150} className="grid grid-cols-2 gap-2.5 sm:gap-4">
            <PhotoFrame
              photo={photos[0] ?? null}
              tone="lemon"
              sizes="(min-width: 1024px) 300px, 45vw"
              alt={t.daily.photoAlt}
              placeholderLabel={t.daily.photoPlaceholders[0]}
              className="row-span-2 min-h-52 rounded-[1.5rem] rounded-tl-[3rem] ring-4 ring-white/70 sm:min-h-[26rem] sm:rounded-[2rem] lg:min-h-[21rem]"
            />
            <PhotoFrame
              photo={photos[1] ?? null}
              tone="mint"
              sizes="(min-width: 1024px) 300px, 45vw"
              alt={t.daily.photoAlt}
              placeholderLabel={t.daily.photoPlaceholders[1]}
              className="aspect-[5/4] rounded-[1.5rem] rounded-tr-[2.75rem] ring-4 ring-white/70 sm:aspect-square sm:rounded-[2rem] sm:rounded-tr-[4rem]"
            />
            <PhotoFrame
              photo={photos[2] ?? null}
              tone="lime"
              sizes="(min-width: 1024px) 300px, 45vw"
              alt={t.daily.photoAlt}
              placeholderLabel={t.daily.photoPlaceholders[2]}
              className="aspect-[5/4] rounded-[1.5rem] rounded-br-[2.75rem] ring-4 ring-white/70 sm:aspect-square sm:rounded-[2rem] sm:rounded-br-[4rem]"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
