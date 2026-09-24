import { Apple, Carrot, Soup } from "lucide-react";
import { getFoodPhotos } from "@/lib/images";
import { cn } from "@/lib/cn";
import { Leaf } from "@/components/ui/Decor";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const highlights = [
  { icon: Soup, text: "Ыстық әрі құнарлы ас" },
  { icon: Carrot, text: "Теңгерімді мәзір" },
  { icon: Apple, text: "Жемістер мен көкөністер" },
];

/** Раскладка плиток зависит от количества фото: первое всегда крупное. */
function tileClass(index: number, total: number) {
  if (total === 1) return "col-span-2 aspect-[16/10]";
  if (index === 0) return total === 2 ? "aspect-[3/4]" : "col-span-2 aspect-[16/9]";
  if (total === 2) return "aspect-[3/4] mt-10";
  return "aspect-square";
}

export function Nutrition() {
  const photos = getFoodPhotos().slice(0, 5);
  // Пока фото еды нет — показываем три аккуратные заглушки
  const tiles = photos.length ? photos : [null, null, null];

  return (
    <section id="nutrition" className="relative overflow-hidden py-20 sm:py-28">
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-8">
        <div>
          <SectionHeading eyebrow="Тамақтану" title="Дәмді әрі пайдалы тамақтану" align="left" />
          <Reveal delay={100}>
            <p className="mt-6 text-lg leading-relaxed text-pretty text-ink-soft">
              Балалардың дұрыс өсуі мен дамуы үшін балабақшада күніне 5 рет тамақтану ұйымдастырылады.
            </p>
          </Reveal>

          <Reveal delay={200} className="mt-8">
            <div className="relative overflow-hidden rounded-[2rem] bg-lemon-100 p-6 sm:p-7">
              <Leaf className="absolute -right-3 -bottom-3 w-20 -rotate-12 text-lemon-200" />
              <div className="relative flex items-center gap-5">
                <span className="font-display text-6xl leading-none font-bold text-lime-600">5</span>
                <div>
                  <p className="font-display text-lg font-bold text-ink">рет тамақтану</p>
                  <div className="mt-2 flex gap-1.5" aria-hidden>
                    {Array.from({ length: 5 }, (_, i) => (
                      <span key={i} className="size-3 rounded-full bg-lime-400" style={{ opacity: 0.45 + i * 0.13 }} />
                    ))}
                  </div>
                </div>
              </div>
              <ul className="relative mt-6 grid gap-2.5">
                {highlights.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-center gap-3 font-bold text-ink">
                    <span className="grid size-9 place-items-center rounded-xl bg-white text-lime-600">
                      <Icon className="size-4.5" />
                    </span>
                    {text}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal delay={150} className="grid grid-cols-2 gap-3 sm:gap-4">
          {tiles.map((photo, i) => (
            <PhotoFrame
              key={photo?.src ?? i}
              photo={photo}
              tone={i % 2 ? "lemon" : "mint"}
              sizes={i === 0 && tiles.length !== 2 ? "(min-width: 1024px) 640px, 92vw" : "(min-width: 1024px) 320px, 46vw"}
              placeholderLabel="Тағам фотосы"
              className={cn("group rounded-[2rem] shadow-soft", tileClass(i, tiles.length))}
              imageClassName="transition duration-700 group-hover:scale-105"
            />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
