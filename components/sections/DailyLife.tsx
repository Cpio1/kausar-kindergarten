import { dailyActivities } from "@/lib/content";
import { getDailyPhotos } from "@/lib/images";
import { Cloud, Leaf, Sun } from "@/components/ui/Decor";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { Reveal } from "@/components/ui/Reveal";

const activityTones = ["bg-lemon-200", "bg-white", "bg-white", "bg-lemon-200"];

export function DailyLife() {
  const photos = getDailyPhotos();

  return (
    <section className="px-3 sm:px-5">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-linear-to-br from-lime-200 via-lime-100 to-lemon-100 px-5 py-14 sm:rounded-[3.5rem] sm:px-10 sm:py-20 lg:px-16">
        <Sun className="absolute -top-12 -right-12 w-44 text-lemon-300/70" />
        <Cloud className="absolute bottom-8 left-[45%] hidden w-32 text-white/60 lg:block" />
        <Leaf className="absolute top-10 left-6 w-10 rotate-12 text-lime-400/50" />

        <div className="relative grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <Reveal>
              <span className="inline-flex rounded-full bg-white/70 px-4 py-1.5 text-sm font-bold text-lime-700">
                Күнделікті өмір
              </span>
              <h2 className="mt-4 font-display text-[1.7rem] leading-tight font-semibold text-balance text-ink sm:text-4xl lg:text-[2.6rem]">
                Баланың әр күні – жаңа мүмкіндік
              </h2>
            </Reveal>
            <Reveal delay={100} className="mt-6 space-y-4 text-lg leading-relaxed text-pretty text-ink/80">
              <p>
                «Кәусар» балабақшасында әр күн қызықты сабақтарға, ойындарға, шығармашылыққа және жаңа жаңалықтарға толы.
              </p>
              <p>Балалар бірге ойнап, білім алып, достасып, өз қабілеттерін ашады.</p>
            </Reveal>

            <ul className="mt-8 grid grid-cols-2 gap-3">
              {dailyActivities.map(({ icon: Icon, title }, i) => (
                <Reveal as="li" key={title} delay={150 + i * 80}>
                  <div className="flex h-full flex-col items-start gap-2.5 rounded-3xl bg-white/85 p-3 pr-4 sm:flex-row sm:items-center sm:gap-3 shadow-soft backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:bg-white">
                    <span className={`grid size-11 shrink-0 place-items-center rounded-2xl text-lime-700 ${activityTones[i]} ring-1 ring-lime-200`}>
                      <Icon className="size-5" />
                    </span>
                    <span className="text-sm leading-snug font-extrabold text-ink sm:text-[0.95rem]">{title}</span>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>

          {/* Коллаж из трёх фото */}
          <Reveal delay={150} className="grid grid-cols-2 gap-3 sm:gap-4">
            <PhotoFrame
              photo={photos[0] ?? null}
              tone="lemon"
              sizes="(min-width: 1024px) 300px, 45vw"
              placeholderLabel="Сабақ сәті"
              className="row-span-2 min-h-72 rounded-[2rem] ring-4 ring-white/70 sm:min-h-[26rem]"
            />
            <PhotoFrame
              photo={photos[1] ?? null}
              tone="mint"
              sizes="(min-width: 1024px) 300px, 45vw"
              placeholderLabel="Ойын уақыты"
              className="aspect-square rounded-[2rem] rounded-tr-[4rem] ring-4 ring-white/70"
            />
            <PhotoFrame
              photo={photos[2] ?? null}
              tone="lime"
              sizes="(min-width: 1024px) 300px, 45vw"
              placeholderLabel="Шығармашылық"
              className="aspect-square rounded-[2rem] rounded-br-[4rem] ring-4 ring-white/70"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
