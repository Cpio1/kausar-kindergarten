import { advantages } from "@/lib/content";
import { Blob, Star } from "@/components/ui/Decor";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const iconTones = ["bg-lime-100", "bg-lemon-100", "bg-mint-100"];

export function Advantages() {
  return (
    <section id="advantages" className="relative overflow-hidden py-20 sm:py-28">
      <Blob className="absolute -bottom-40 -left-40 w-[26rem] text-lemon-50" />
      <Star className="absolute top-24 right-[8%] w-8 animate-float text-lemon-300" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Артықшылықтар"
          title={
            <>
              Неліктен <span className="text-lime-600">«Кәусар»</span>?
            </>
          }
          subtitle="Балаңыздың бақытты әрі қауіпсіз күндері үшін бәрін ойластырдық."
        />

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {advantages.map(({ icon: Icon, title, text }, i) => (
            <Reveal as="li" key={title} delay={(i % 3) * 100}>
              <div className="group relative h-full overflow-hidden rounded-[2rem] bg-white p-7 shadow-soft ring-1 ring-lime-100/70 transition duration-300 hover:-translate-y-1 hover:shadow-lift sm:p-8">
                <span
                  aria-hidden
                  className="absolute -top-10 -right-10 size-32 rounded-full bg-lime-50 transition duration-500 group-hover:scale-125"
                />
                <span className={`relative grid size-14 place-items-center rounded-2xl text-lime-700 ${iconTones[i % 3]}`}>
                  <Icon className="size-7" strokeWidth={1.8} />
                </span>
                <h3 className="relative mt-6 font-display text-lg font-semibold text-ink sm:text-xl">{title}</h3>
                <p className="relative mt-3 leading-relaxed text-pretty text-ink-soft">{text}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
