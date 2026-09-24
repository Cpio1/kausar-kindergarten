import { ArrowRight, Clock, Heart, Phone } from "lucide-react";
import { heroFacts } from "@/lib/content";
import { getHeroPhoto } from "@/lib/images";
import { site } from "@/lib/site";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Blob, Cloud, Leaf, Star, Sun } from "@/components/ui/Decor";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { Reveal } from "@/components/ui/Reveal";

export function Hero() {
  const photo = getHeroPhoto();

  return (
    <section id="home" className="relative overflow-hidden bg-linear-to-b from-cream via-milk to-milk pt-28 pb-16 sm:pt-32 lg:pt-36 lg:pb-24">
      {/* Декор фона */}
      <Blob className="absolute -top-32 -left-40 w-[28rem] text-lemon-100/80" />
      <Blob className="absolute top-1/3 -right-48 w-[32rem] rotate-90 text-lime-100/70" />
      <Cloud className="absolute top-28 left-[42%] hidden w-28 animate-float text-white lg:block" />
      <Star className="absolute bottom-16 left-[6%] w-7 animate-float text-lemon-300" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:px-8">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-bold text-lime-700 shadow-soft ring-1 ring-lime-100">
              <Heart className="size-4 fill-lime-300 text-lime-500" />
              {site.name}
            </span>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="mt-6 font-display text-[2.2rem] leading-[1.12] font-semibold text-balance text-ink sm:text-5xl lg:text-[3.6rem]">
              Бақытты балалық шақ{" "}
              <span className="relative z-0 inline-block whitespace-nowrap text-lime-600">
                Кәусардан
                <svg viewBox="0 0 200 14" aria-hidden className="absolute top-full left-0 -mt-[0.02em] h-[0.22em] w-full text-lemon-300" preserveAspectRatio="none">
                  <path d="M3 9c40-6 110-8 194-3" stroke="currentColor" strokeWidth="6" strokeLinecap="round" fill="none" />
                </svg>
              </span>{" "}
              басталады
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-pretty text-ink-soft sm:text-xl">
              Әр балаға қамқорлық, жылулық және жан-жақты даму үшін жайлы орта қалыптастырамыз.
            </p>
          </Reveal>

          <Reveal delay={300} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="#about">
              Балабақша туралы
              <ArrowRight className="size-4" />
            </ButtonLink>
            <ButtonLink href="#contacts" variant="secondary">
              <Phone className="size-4 text-lime-600" />
              Байланысу
            </ButtonLink>
          </Reveal>

          <Reveal delay={400}>
            <ul className="mt-10 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
              {heroFacts.map((fact, i) => (
                <li
                  key={fact}
                  className="flex items-center gap-2.5 rounded-2xl bg-white px-4 py-3 text-sm font-extrabold text-ink shadow-soft ring-1 ring-lime-100/70"
                >
                  <span className={i % 2 ? "size-2.5 rounded-full bg-lemon-400" : "size-2.5 rounded-full bg-lime-400"} />
                  {fact}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Фото */}
        <Reveal delay={150} className="relative mx-auto w-full max-w-md sm:max-w-lg lg:max-w-none">
          <Sun className="absolute -top-10 -right-4 z-10 w-24 text-lemon-300 sm:w-28" />
          <Leaf className="absolute -bottom-6 -left-4 z-10 w-14 -rotate-12 text-lime-400 sm:w-16" />
          <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-[3rem] rounded-tl-[8rem] bg-lime-200/70" aria-hidden />
          <PhotoFrame
            photo={photo}
            priority
            sizes="(min-width: 1024px) 560px, (min-width: 640px) 512px, 92vw"
            placeholderLabel="Балабақша фотосы"
            className="aspect-[4/5] rounded-[3rem] rounded-tl-[8rem] shadow-lift ring-8 ring-white"
          />

          <div className="absolute -bottom-6 right-4 z-10 flex items-center gap-3 rounded-3xl bg-white/95 px-4 py-3 shadow-lift backdrop-blur sm:right-8">
            <span className="grid size-11 place-items-center rounded-2xl bg-lemon-100 text-lime-700">
              <Clock className="size-5" />
            </span>
            <span className="leading-tight">
              <span className="block text-xs font-bold text-ink-soft">{site.hours.workdays}</span>
              <span className="block font-display text-base font-semibold text-ink">{site.hours.time}</span>
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
