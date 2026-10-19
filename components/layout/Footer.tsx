"use client";

import { MapPin, Phone } from "lucide-react";
import { navItems } from "@/lib/content";
import { useI18n } from "@/lib/i18n/LanguageProvider";
import { phoneHref, site } from "@/lib/site";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { Leaf, Star } from "@/components/ui/Decor";
import { Logo } from "./Logo";

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="relative overflow-hidden bg-lime-100/70 pt-9 pb-6 sm:pt-16 sm:pb-8 lg:pt-12">
      <Leaf className="absolute -top-4 right-[8%] w-10 rotate-45 text-lime-200 sm:w-16 lg:w-12" />
      <Star className="absolute bottom-24 left-[4%] hidden w-8 text-lemon-300 sm:block" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 text-[0.8125rem] font-bold text-ink-soft sm:mt-5 sm:text-sm">{site.company}</p>
            <p className="text-[0.95rem] font-bold text-ink sm:text-base">{t.site.name}</p>
            <p className="mt-2 flex items-start gap-2 text-[0.8125rem] text-ink-soft sm:mt-3 sm:text-sm">
              <MapPin className="mt-0.5 size-4 shrink-0 text-lime-600" />
              {t.site.region}
            </p>
          </div>

          <nav aria-label={t.footer.nav}>
            <h3 className="font-display text-sm font-bold text-ink">{t.footer.sections}</h3>
            <ul className="mt-2.5 grid grid-cols-2 gap-x-4 gap-y-1.5 sm:mt-4 sm:gap-y-2 md:grid-cols-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="text-[0.8125rem] font-semibold text-ink-soft transition hover:text-lime-700 sm:text-sm">
                    {t.nav[item.key]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="font-display text-sm font-bold text-ink">{t.footer.contacts}</h3>
            <p className="mt-2.5 text-[0.8125rem] text-ink-soft sm:mt-4 sm:text-sm">{t.footer.phone}</p>
            <a
              href={phoneHref}
              className="mt-1 inline-flex items-center gap-1.5 text-[0.95rem] font-extrabold whitespace-nowrap text-ink transition hover:text-lime-700 sm:gap-2 sm:text-lg"
            >
              <Phone className="size-4 text-lime-600" />
              {site.phone}
            </a>
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex w-fit items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-[0.8125rem] font-bold text-ink shadow-soft transition hover:-translate-y-0.5 sm:mt-4 sm:px-4 sm:py-2 sm:text-sm"
            >
              <InstagramIcon className="size-4 text-lime-600" />
              Instagram
            </a>
          </div>
        </div>

        <div className="mt-7 border-t border-lime-200 pt-5 text-center text-xs text-ink-soft sm:mt-12 sm:pt-6 sm:text-sm lg:mt-10">
          {t.footer.copyright}
        </div>
      </div>
    </footer>
  );
}
