import { groups, type Group } from "@/lib/content";
import { getGroupPhoto } from "@/lib/images";
import { cn } from "@/lib/cn";
import { Leaf, Sun, Wave } from "@/components/ui/Decor";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const tones: Record<Group["tone"], { badge: string; dot: string; card: string }> = {
  mint: { badge: "bg-mint-100 text-lime-700", dot: "bg-lime-300", card: "hover:ring-mint-200" },
  lemon: { badge: "bg-lemon-100 text-lime-700", dot: "bg-lemon-400", card: "hover:ring-lemon-200" },
  lime: { badge: "bg-lime-100 text-lime-700", dot: "bg-lime-500", card: "hover:ring-lime-200" },
};

export function Groups() {
  return (
    <section id="groups" className="relative">
      <Wave className="h-10 text-cream sm:h-16" />
      <div className="relative overflow-hidden bg-cream py-16 sm:py-20">
        <Sun className="absolute top-6 left-[4%] w-16 text-lemon-200" />
        <Leaf className="absolute right-[5%] bottom-10 w-12 -rotate-45 text-lime-200" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Топтар"
            title="Біздің топтар"
            subtitle="Әр топ балалардың жас ерекшелігіне қарай ұйымдастырылған."
          />

          <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {groups.map((group, i) => {
              const tone = tones[group.tone];
              return (
                <Reveal as="li" key={group.slug} delay={i * 120} className={cn(i === 2 && "md:col-span-2 lg:col-span-1")}>
                  <article
                    className={cn(
                      "group flex h-full flex-col rounded-[2.25rem] bg-white p-3 shadow-soft ring-1 ring-transparent transition duration-300 hover:-translate-y-1.5 hover:shadow-lift",
                      tone.card,
                    )}
                  >
                    <PhotoFrame
                      photo={getGroupPhoto(group.slug, group.name, i + 1)}
                      tone={group.tone}
                      sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 92vw"
                      placeholderLabel={`«${group.name}» тобының фотосы`}
                      className={cn("rounded-[1.75rem]", i === 2 ? "aspect-[4/3] md:aspect-[16/7] lg:aspect-[4/3]" : "aspect-[4/3]")}
                      imageClassName="transition duration-700 group-hover:scale-105"
                    />
                    <div className="flex flex-1 flex-col px-4 pt-6 pb-5">
                      <span className={cn("inline-flex w-fit items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-bold", tone.badge)}>
                        <span className={cn("size-2 rounded-full", tone.dot)} />
                        {group.level}
                      </span>
                      <h3 className="mt-4 font-display text-2xl font-semibold text-ink">{group.name}</h3>
                      <p className="mt-3 leading-relaxed text-pretty text-ink-soft">{group.text}</p>
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
