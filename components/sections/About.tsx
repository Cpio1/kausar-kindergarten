"use client";

import { aboutStatIcons } from "@/lib/content";
import { useI18n } from "@/lib/i18n/LanguageProvider";
import type { Photo } from "@/lib/images";
import { Leaf, Star } from "@/components/ui/Decor";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const statTones = [
  "bg-lime-100 text-lime-700",
  "bg-lemon-100 text-lime-700",
  "bg-mint-100 text-lime-700",
  "bg-lemon-50 text-lime-700 ring-1 ring-lemon-200",
];

/** photo — main-page2 из public/images; если его нет, блок выглядит как раньше */
export function About({ photo }: { photo: Photo | null }) {
  const { t } = useI18n();
  const stats = t.about.stats.map((stat, i) => ({ ...stat, icon: aboutStatIcons[i] }));

  return (
    <section id="about" className="relative overflow-hidden py-12 sm:py-28 lg:py-20">
      <Leaf className="absolute top-10 right-[5%] w-8 rotate-45 text-lime-200 sm:top-20 sm:right-[6%] sm:w-12 lg:w-9" />
      <Star className="absolute bottom-24 left-[3%] hidden w-6 text-lemon-300 sm:block" />

      <div className="relative mx-auto grid max-w-7xl gap-6 px-5 sm:gap-12 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8">
        <div>
          <SectionHeading eyebrow={t.about.eyebrow} title={t.about.title} align="left" />
          <Reveal delay={100} className="mt-4 space-y-3 text-[0.95rem] leading-relaxed text-pretty text-ink-soft sm:mt-6 sm:space-y-5 sm:text-lg">
            <p>
              <strong className="font-extrabold text-ink">{t.about.introStrong}</strong> {t.about.introRest}
            </p>
            <p className="rounded-2xl rounded-br-[2rem] border-l-4 border-lime-400 bg-lime-50 px-4 py-3.5 text-ink sm:rounded-3xl sm:px-6 sm:py-5">
              {t.about.goal}
            </p>
          </Reveal>
        </div>

        <div className="space-y-5 sm:space-y-8">
          {photo && (
            <Reveal className="relative">
              <span
                aria-hidden
                className="absolute inset-0 translate-x-2 translate-y-2 rounded-[1.75rem] rounded-br-[4rem] bg-lemon-200 sm:translate-x-3 sm:translate-y-3 sm:rounded-[2.5rem] sm:rounded-br-[6rem]"
              />
              <PhotoFrame
                photo={photo}
                alt={t.about.photoAlt}
                sizes="(min-width: 1024px) 560px, 92vw"
                className="aspect-[16/10] rounded-[1.75rem] rounded-br-[4rem] shadow-soft ring-4 ring-white sm:rounded-[2.5rem] sm:rounded-br-[6rem]"
              />
            </Reveal>
          )}

          <ul className="grid grid-cols-2 gap-2.5 sm:gap-5">
            {stats.map(({ icon: Icon, value, label }, i) => (
              <Reveal as="li" key={value} delay={i * 100}>
                <div className="group flex h-full items-center gap-2.5 max-[374px]:flex-col max-[374px]:items-start max-[374px]:gap-2 rounded-[1.25rem] bg-white p-3 shadow-soft ring-1 ring-lime-100/70 transition duration-300 hover:-translate-y-1 hover:shadow-lift sm:block sm:rounded-[2rem] sm:p-7 lg:rounded-[1.75rem] lg:p-6">
                  <span className={`grid size-9 shrink-0 place-items-center rounded-xl sm:size-12 sm:rounded-2xl ${statTones[i]} transition group-hover:rotate-6`}>
                    <Icon className="size-[1.1rem] sm:size-6" />
                  </span>
                  <div className="min-w-0">
                    <p className="font-display text-[1.15rem] font-bold text-ink sm:mt-5 sm:text-3xl">{value}</p>
                    <p className="text-xs font-bold text-ink-soft sm:mt-1 sm:text-base">{label}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
