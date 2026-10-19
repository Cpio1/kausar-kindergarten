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

          <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {groups.map((group, i) => {
              const tone = tones[group.tone];
              const copy = t.groups.items[group.slug];
              return (
                <Reveal as="li" key={group.slug} delay={i * 120} className={cn(i === 2 && "md:col-span-2 lg:col-span-1")}>
                  <article
                    className={cn(
                      "group flex h-full flex-col rounded-[2.25rem] bg-white p-3 shadow-soft ring-1 ring-transparent transition duration-300 hover:-translate-y-1.5 hover:shadow-lift",
                      tone.card,
                    )}
                  >
                    {/* Декоративная композиция вместо фото — та же высота и скругление */}
                    <div
                      className={cn(
                        "relative overflow-hidden rounded-[1.75rem] bg-linear-to-br",
                        tone.art,
                        i === 2 ? "aspect-[4/3] md:aspect-[16/7] lg:aspect-[4/3]" : "aspect-[4/3]",
                      )}
                    >
                      <Blob className={cn("absolute inset-0 m-auto h-[88%] w-[78%] rotate-12", tone.blob)} />
                      <GroupIllustration
                        slug={group.slug}
                        className="absolute inset-0 m-auto h-[58%] w-[64%] transition duration-700 sm:h-[61%] sm:w-[68%] lg:h-[63%] lg:w-[70%] ease-out group-hover:-translate-y-1 group-hover:scale-[1.03]"
                      />
                    </div>
                    <div className="flex flex-1 flex-col px-4 pt-6 pb-5">
                      <span className={cn("inline-flex w-fit items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-bold", tone.badge)}>
                        <span aria-hidden className="text-[1.15rem] leading-none">
                          {group.emoji}
                        </span>
                        {copy.level}
                      </span>
                      <h3 className="mt-4 font-display text-2xl font-bold text-ink">{group.name}</h3>
                      <p className="mt-3 leading-relaxed text-pretty text-ink-soft">{copy.text}</p>
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
