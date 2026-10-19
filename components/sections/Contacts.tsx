"use client";

import { Building2, MapPin, Navigation, Phone } from "lucide-react";
import { useI18n } from "@/lib/i18n/LanguageProvider";
import { mapHref, phoneHref, site } from "@/lib/site";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Leaf, Sun } from "@/components/ui/Decor";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Contacts() {
  const { t } = useI18n();

  return (
    <section id="contacts" className="relative overflow-hidden pb-12 sm:pb-28 lg:pb-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t.contacts.eyebrow}
          title={t.contacts.title}
          subtitle={t.contacts.subtitle}
        />

        <div className="mt-6 grid gap-3 sm:mt-14 lg:mt-10 sm:gap-5 lg:grid-cols-[1.25fr_1fr]">
          <Reveal>
            <div className="h-full rounded-[1.75rem] rounded-tl-[3rem] bg-white p-4 shadow-soft ring-1 ring-lime-100/70 sm:rounded-[2.25rem] sm:p-10 lg:p-8">
              <ul className="grid gap-4 sm:gap-7 lg:gap-6">
                <li className="flex gap-3 sm:gap-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl sm:size-12 sm:rounded-2xl bg-lime-100 text-lime-700">
                    <Building2 className="size-5 sm:size-6" />
                  </span>
                  <div>
                    <p className="text-[0.8125rem] font-bold text-ink-soft sm:text-sm">{site.company}</p>
                    <p className="font-display text-base font-bold text-ink sm:text-lg">{t.site.name}</p>
                  </div>
                </li>
                <li className="flex gap-3 sm:gap-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl sm:size-12 sm:rounded-2xl bg-lemon-100 text-lime-700">
                    <MapPin className="size-5 sm:size-6" />
                  </span>
                  <div>
                    <p className="text-[0.8125rem] font-bold text-ink-soft sm:text-sm">{t.contacts.addressLabel}</p>
                    <address className="text-[0.9rem] leading-normal font-semibold text-pretty text-ink not-italic sm:text-base sm:leading-relaxed">{t.site.address}</address>
                    <a
                      href={mapHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1.5 inline-flex items-center gap-1.5 text-[0.8125rem] font-bold sm:mt-2 sm:text-sm text-lime-700 underline-offset-4 hover:underline"
                    >
                      <Navigation className="size-3.5" />
                      {t.contacts.openMap}
                    </a>
                  </div>
                </li>
                <li className="flex gap-3 sm:gap-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl sm:size-12 sm:rounded-2xl bg-mint-100 text-lime-700">
                    <Phone className="size-5 sm:size-6" />
                  </span>
                  <div>
                    <p className="text-[0.8125rem] font-bold text-ink-soft sm:text-sm">{t.contacts.phoneLabel}</p>
                    <a href={phoneHref} className="font-display text-lg font-bold text-ink transition hover:text-lime-700 sm:text-xl">
                      {site.phone}
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[1.75rem] rounded-br-[3rem] bg-linear-to-br from-lime-300 via-lime-200 to-lemon-200 p-5 sm:rounded-[2.25rem] sm:p-10 lg:p-8">
              <Sun className="absolute -top-8 -right-8 w-24 text-lemon-100/80 sm:-top-10 sm:-right-10 sm:w-36 lg:w-28" />
              <Leaf className="absolute bottom-4 left-[55%] hidden w-14 rotate-12 text-lime-400/40 sm:block" />
              <div className="relative">
                <h3 className="font-display text-[1.3rem] leading-snug font-bold text-balance text-ink sm:text-[1.7rem]">
                  {t.contacts.ctaTitle}
                </h3>
                <p className="mt-2 text-[0.9rem] leading-normal text-ink/75 sm:mt-3 sm:text-base sm:leading-relaxed">
                  {t.contacts.ctaText}
                </p>
              </div>
              <div className="relative mt-4 grid gap-2 min-[360px]:grid-cols-2 sm:mt-8 sm:gap-3 lg:grid-cols-1 xl:grid-cols-2">
                <ButtonLink href={phoneHref} variant="secondary" className="px-3 sm:px-6">
                  <Phone className="size-4 text-lime-600" />
                  {t.contacts.call}
                </ButtonLink>
                <ButtonLink href={site.instagram} target="_blank" rel="noopener noreferrer" variant="secondary" className="px-3 sm:px-6">
                  <InstagramIcon className="size-4 text-lime-600" />
                  Instagram
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
