import { CalendarDays, Clock, Coffee } from "lucide-react";
import { site } from "@/lib/site";
import { Cloud, Star, Sun } from "@/components/ui/Decor";
import { Reveal } from "@/components/ui/Reveal";

export function Schedule() {
  return (
    <section id="schedule" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-white p-6 shadow-lift ring-1 ring-lime-100 sm:rounded-[3rem] sm:p-12 lg:p-16">
            <Sun className="absolute -top-14 -left-14 w-48 text-lemon-200" />
            <Cloud className="absolute right-10 bottom-6 hidden w-36 text-mint-50 md:block" />
            <Star className="absolute top-10 right-[12%] w-7 text-lime-300" />

            <div className="relative grid items-center gap-10 lg:grid-cols-[1fr_1.6fr]">
              <div className="text-center lg:text-left">
                <span className="inline-flex rounded-full bg-lime-100 px-4 py-1.5 text-sm font-bold text-lime-700">
                  Жұмыс уақыты
                </span>
                <h2 className="mt-4 font-display text-[1.7rem] leading-tight font-semibold text-balance text-ink sm:text-4xl lg:text-[2.6rem]">
                  Біз сіздерді күтеміз
                </h2>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[2rem] bg-linear-to-br from-lime-300 to-lime-200 p-6 sm:p-7">
                  <span className="grid size-12 place-items-center rounded-2xl bg-white/70 text-lime-700">
                    <CalendarDays className="size-6" />
                  </span>
                  <p className="mt-5 text-sm font-bold text-ink/70">Жұмыс күндері</p>
                  <p className="mt-1 font-display text-xl font-semibold text-ink">{site.hours.workdays}</p>
                  <p className="mt-4 flex items-center gap-2 rounded-2xl bg-white/70 px-4 py-3 font-display text-xl font-semibold whitespace-nowrap text-ink sm:text-2xl">
                    <Clock className="size-5 shrink-0 text-lime-700" />
                    {site.hours.time}
                  </p>
                </div>
                <div className="rounded-[2rem] bg-lemon-100 p-6 sm:p-7">
                  <span className="grid size-12 place-items-center rounded-2xl bg-white/70 text-lime-700">
                    <Coffee className="size-6" />
                  </span>
                  <p className="mt-5 text-sm font-bold text-ink/70">Демалыс</p>
                  <p className="mt-1 font-display text-xl font-semibold text-ink">{site.hours.weekend}</p>
                  <p className="mt-4 rounded-2xl bg-white/70 px-4 py-3 font-bold text-ink-soft">Демалыс күндері</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
