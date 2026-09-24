import { MapPin, Phone } from "lucide-react";
import { navItems } from "@/lib/content";
import { phoneHref, site } from "@/lib/site";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { Leaf, Star } from "@/components/ui/Decor";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-lime-100/70 pt-16 pb-8">
      <Leaf className="absolute -top-4 right-[8%] w-16 rotate-45 text-lime-200" />
      <Star className="absolute bottom-24 left-[4%] w-8 text-lemon-300" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-5 text-sm font-bold text-ink-soft">{site.company}</p>
            <p className="font-bold text-ink">{site.name}</p>
            <p className="mt-3 flex items-start gap-2 text-sm text-ink-soft">
              <MapPin className="mt-0.5 size-4 shrink-0 text-lime-600" />
              {site.region}
            </p>
          </div>

          <nav aria-label="Төменгі мәзір">
            <h3 className="font-display text-sm font-semibold text-ink">Бөлімдер</h3>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 md:grid-cols-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="text-sm font-semibold text-ink-soft transition hover:text-lime-700">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="font-display text-sm font-semibold text-ink">Байланыс</h3>
            <p className="mt-4 text-sm text-ink-soft">Телефон:</p>
            <a
              href={phoneHref}
              className="mt-1 inline-flex items-center gap-2 text-lg font-extrabold text-ink transition hover:text-lime-700"
            >
              <Phone className="size-4 text-lime-600" />
              {site.phone}
            </a>
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex w-fit items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-ink shadow-soft transition hover:-translate-y-0.5"
            >
              <InstagramIcon className="size-4 text-lime-600" />
              Instagram
            </a>
          </div>
        </div>

        <div className="mt-12 border-t border-lime-200 pt-6 text-center text-sm text-ink-soft">
          © 2026 «Кәусар» бөбекжай балабақшасы. Барлық құқықтар қорғалған.
        </div>
      </div>
    </footer>
  );
}
