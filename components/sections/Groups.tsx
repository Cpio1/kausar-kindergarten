"use client";

import { groups, type Group } from "@/lib/content";
import { useI18n } from "@/lib/i18n/LanguageProvider";
import { cn } from "@/lib/cn";
import { Blob, Leaf, Sun, Wave } from "@/components/ui/Decor";
import { GroupIllustration } from "@/components/ui/GroupIllustrations";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const tones: Record<Group["tone"], { badge: string; card: string; art: string; blob: string }> = {
  mint: {
    badge: "bg-mint-100 text-lime-700",
    card: "hover:ring-mint-200",
    art: "from-mint-50 via-lime-50 to-milk",
    blob: "text-mint-100",
  },
  lemon: {
    badge: "bg-lemon-100 text-lime-700",
    card: "hover:ring-lemon-200",
    art: "from-lemon-50 via-milk to-lemon-50",
    blob: "text-lemon-100",
  },
  lime: {
    badge: "bg-lime-100 text-lime-700",
    card: "hover:ring-lime-200",
    art: "from-milk via-cream to-lime-50",
    blob: "text-lime-100/80",
  },
};

export function Groups() {
  const { t } = useI18n();

  return (
    <section id="groups" className="relative">
      <Wave className="h-10 text-cream sm:h-16" />
      <div className="relative overflow-hidden bg-cream py-16 sm:py-20">
        <Sun className="absolute top-6 left-[4%] w-16 text-lemon-200" />
        <Leaf className="absolute right-[5%] bottom-10 w-12 -rotate-45 text-lime-200" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={t.groups.eyebrow}
            title={t.groups.title}
            subtitle={t.groups.subtitle}
          />

          <ul className="mt-10 grid gap-3.5 sm:mt-14 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {groups.map((group, i) => {
              const tone = tones[group.tone];
              const copy = t.groups.items[group.slug];
              return (
                <Reveal as="li" key={group.slug} delay={i * 120} className={cn(i === 2 && "md:col-span-2 lg:col-span-1")}>
                  <article
                    className={cn(
                      // До sm — компактная горизонтальная карточка: фигурка слева, текст справа
                      "group flex h-full items-center gap-4 rounded-[1.75rem] rounded-br-[3rem] bg-white p-4 shadow-soft ring-1 ring-transparent transition duration-300 hover:-translate-y-1.5 hover:shadow-lift",
                      "sm:flex-col sm:items-stretch sm:gap-0 sm:rounded-[2.25rem] sm:p-3",
                      tone.card,
                    )}
                  >
                    {/* Декоративная композиция: на телефоне — квадрат слева, с sm — блок во всю ширину карточки */}
                    <div
                      className={cn(
                        "relative aspect-square w-[32%] shrink-0 overflow-hidden rounded-[1.5rem] rounded-tl-[2.5rem] bg-linear-to-br",
                        "sm:aspect-[4/3] sm:w-full sm:rounded-[1.75rem]",
                        tone.art,
                        i === 2 && "md:aspect-[16/7] lg:aspect-[4/3]",
                      )}
                    >
                      <Blob className={cn("absolute inset-0 m-auto h-[82%] w-[82%] rotate-12 sm:h-[88%] sm:w-[78%]", tone.blob)} />
                      <GroupIllustration
                        slug={group.slug}
                        className="absolute inset-0 m-auto h-[70%] w-[94%] transition duration-700 sm:h-[61%] sm:w-[68%] lg:h-[63%] lg:w-[70%] ease-out group-hover:-translate-y-1 group-hover:scale-[1.03]"
                      />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col sm:px-4 sm:pt-6 sm:pb-5">
                      <span
                        className={cn(
                          "inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.8125rem] font-bold sm:gap-2 sm:px-3.5 sm:py-1.5 sm:text-sm",
                          tone.badge,
                        )}
                      >
                        <span aria-hidden className="text-[1rem] leading-none sm:text-[1.15rem]">
                          {group.emoji}
                        </span>
                        {copy.level}
                      </span>
                      <h3 className="mt-2 font-display text-[1.4rem] leading-tight font-bold text-ink sm:mt-4 sm:text-2xl">
                        {group.name}
                      </h3>
                      <p className="mt-1.5 text-[0.9rem] leading-normal text-pretty text-ink-soft sm:mt-3 sm:text-base sm:leading-relaxed">
                        {copy.text}
                      </p>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
      <Wave className="h-10 rotate-180 text-cream sm:h-16" />
    </section>
  );
}
