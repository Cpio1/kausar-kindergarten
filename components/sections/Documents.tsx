import { ExternalLink, FileText } from "lucide-react";
import { site } from "@/lib/site";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Leaf, Star } from "@/components/ui/Decor";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Documents() {
  return (
    <section id="documents" className="relative overflow-hidden pb-20 sm:pb-28">
      <Leaf className="absolute top-10 left-[6%] w-12 -rotate-12 text-lime-200" />
      <Star className="absolute right-[7%] bottom-16 w-7 animate-float text-lemon-300" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Құжаттар"
          title="Құжаттар"
          subtitle="Балабақшаға қатысты қажетті құжаттармен танысыңыз."
        />

        <Reveal delay={100} className="mx-auto mt-14 max-w-3xl">
          <article className="group relative overflow-hidden rounded-[2.25rem] bg-white p-6 shadow-soft ring-1 ring-lime-100/70 transition duration-300 hover:-translate-y-1 hover:shadow-lift sm:p-10">
            <span
              aria-hidden
              className="absolute -top-16 -right-16 size-48 rounded-full bg-lemon-50 transition duration-500 group-hover:scale-110"
            />

            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
              {/* Иконка документа */}
              <div className="relative mx-auto shrink-0 sm:mx-0">
                <span className="absolute inset-0 translate-x-2 translate-y-2 rounded-[1.75rem] bg-lemon-200" aria-hidden />
                <span className="relative grid size-24 place-items-center rounded-[1.75rem] bg-lime-100 text-lime-700 ring-4 ring-white">
                  <FileText className="size-11" strokeWidth={1.6} />
                </span>
              </div>

              <div className="flex-1 text-center sm:text-left">
                <h3 className="font-display text-xl font-bold text-ink sm:text-2xl">Аттестаттау құжаттары</h3>
                <p className="mt-3 leading-relaxed text-pretty text-ink-soft">
                  Құжаттарды Google Drive арқылы көру үшін төмендегі батырманы басыңыз.
                </p>
                <ButtonLink
                  href={site.documentsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 w-full sm:w-auto"
                >
                  Құжаттарды көру
                  <ExternalLink className="size-4" />
                </ButtonLink>
              </div>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
