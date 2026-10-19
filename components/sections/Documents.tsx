"use client";

import { ExternalLink, FileText } from "lucide-react";
import { useI18n } from "@/lib/i18n/LanguageProvider";
import { site } from "@/lib/site";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Leaf, Star } from "@/components/ui/Decor";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Documents() {
  const { t } = useI18n();

  return (
    <section id="documents" className="relative overflow-hidden pb-12 sm:pb-28 lg:pb-20">
      <Leaf className="absolute top-10 left-[6%] hidden w-12 -rotate-12 text-lime-200 sm:block" />
      <Star className="absolute right-[7%] bottom-16 hidden w-7 animate-float text-lemon-300 sm:block" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t.documents.eyebrow}
          title={t.documents.title}
          subtitle={t.documents.subtitle}
        />

        <Reveal delay={100} className="mx-auto mt-6 max-w-3xl sm:mt-14 lg:mt-10">
          <article className="group relative overflow-hidden rounded-[1.75rem] rounded-br-[3rem] bg-white p-4 shadow-soft ring-1 ring-lime-100/70 transition duration-300 hover:-translate-y-1 hover:shadow-lift sm:rounded-[2.25rem] sm:p-10 lg:p-8">
            <span
              aria-hidden
              className="absolute -top-12 -right-12 size-32 rounded-full bg-lemon-50 transition duration-500 group-hover:scale-110 sm:-top-16 sm:-right-16 sm:size-48"
            />

            <div className="relative flex items-start gap-3.5 sm:items-center sm:gap-8">
              {/* Иконка документа */}
              <div className="relative shrink-0">
                <span className="absolute inset-0 translate-x-1 translate-y-1 rounded-[1rem] bg-lemon-200 sm:translate-x-2 sm:translate-y-2 sm:rounded-[1.75rem]" aria-hidden />
                <span className="relative grid size-12 place-items-center rounded-[1rem] bg-lime-100 text-lime-700 ring-2 ring-white sm:size-24 sm:rounded-[1.75rem] sm:ring-4 lg:size-20">
                  <FileText className="size-6 sm:size-11 lg:size-9" strokeWidth={1.6} />
                </span>
              </div>

              <div className="min-w-0 flex-1 text-left">
                <h3 className="font-display text-[1.15rem] font-bold text-ink sm:text-2xl">{t.documents.cardTitle}</h3>
                <p className="mt-1 text-[0.875rem] leading-normal text-pretty text-ink-soft sm:mt-3 sm:text-base sm:leading-relaxed">
                  {t.documents.cardText}
                </p>
                <ButtonLink
                  href={site.documentsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 w-full px-3 sm:mt-6 sm:w-auto sm:px-6"
                >
                  {t.documents.button}
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
