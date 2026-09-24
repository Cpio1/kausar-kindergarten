import { Building2, MapPin, Navigation, Phone } from "lucide-react";
import { mapHref, phoneHref, site } from "@/lib/site";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Leaf, Sun } from "@/components/ui/Decor";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Contacts() {
  return (
    <section id="contacts" className="relative overflow-hidden pb-20 sm:pb-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Байланыс"
          title="Бізбен байланысыңыз"
          subtitle="Сұрақтарыңыз болса, қоңырау шалыңыз немесе Instagram арқылы жазыңыз."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-[1.25fr_1fr]">
          <Reveal>
            <div className="h-full rounded-[2.25rem] bg-white p-6 shadow-soft ring-1 ring-lime-100/70 sm:p-10">
              <ul className="grid gap-7">
                <li className="flex gap-4">
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-lime-100 text-lime-700">
                    <Building2 className="size-6" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-ink-soft">{site.company}</p>
                    <p className="font-display text-lg font-bold text-ink">{site.name}</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-lemon-100 text-lime-700">
                    <MapPin className="size-6" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-ink-soft">Мекенжай</p>
                    <address className="leading-relaxed font-semibold text-pretty text-ink not-italic">{site.address}</address>
                    <a
                      href={mapHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1.5 text-sm font-bold text-lime-700 underline-offset-4 hover:underline"
                    >
                      <Navigation className="size-3.5" />
                      Картадан ашу
                    </a>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-mint-100 text-lime-700">
                    <Phone className="size-6" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-ink-soft">Телефон</p>
                    <a href={phoneHref} className="font-display text-xl font-bold text-ink transition hover:text-lime-700">
                      {site.phone}
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[2.25rem] bg-linear-to-br from-lime-300 via-lime-200 to-lemon-200 p-6 sm:p-10">
              <Sun className="absolute -top-10 -right-10 w-36 text-lemon-100/80" />
              <Leaf className="absolute bottom-4 left-[55%] w-14 rotate-12 text-lime-400/40" />
              <div className="relative">
                <h3 className="font-display text-2xl leading-snug font-bold text-balance text-ink sm:text-[1.7rem]">
                  Балаңызды «Кәусарға» күтеміз!
                </h3>
                <p className="mt-3 leading-relaxed text-ink/75">
                  Балабақшамен танысуға, топтар мен орындар туралы білуге қоңырау шалыңыз.
                </p>
              </div>
              <div className="relative mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                <ButtonLink href={phoneHref} variant="secondary">
                  <Phone className="size-4 text-lime-600" />
                  Қоңырау шалу
                </ButtonLink>
                <ButtonLink href={site.instagram} target="_blank" rel="noopener noreferrer" variant="secondary">
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
