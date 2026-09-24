import { aboutStats } from "@/lib/content";
import { Leaf, Star } from "@/components/ui/Decor";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const statTones = [
  "bg-lime-100 text-lime-700",
  "bg-lemon-100 text-lime-700",
  "bg-mint-100 text-lime-700",
  "bg-lemon-50 text-lime-700 ring-1 ring-lemon-200",
];

export function About() {
  return (
    <section id="about" className="relative overflow-hidden py-20 sm:py-28">
      <Leaf className="absolute top-20 right-[6%] w-12 rotate-45 text-lime-200" />
      <Star className="absolute bottom-24 left-[3%] w-6 text-lemon-300" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-20 lg:px-8">
        <div>
          <SectionHeading eyebrow="Біз туралы" title="Кәусар балабақшасы туралы" align="left" />
          <Reveal delay={100} className="mt-6 space-y-5 text-lg leading-relaxed text-pretty text-ink-soft">
            <p>
              <strong className="font-extrabold text-ink">«Кәусар» бөбекжай балабақшасы</strong> – балалардың қауіпсіз,
              жайлы және мейірімді ортада өсіп, білім алып, жан-жақты дамуына жағдай жасайтын балабақша.
            </p>
            <p className="rounded-3xl border-l-4 border-lime-400 bg-lime-50 px-6 py-5 text-ink">
              Біздің мақсатымыз – әр баланың жеке ерекшелігін ескеріп, оның шығармашылық, танымдық және әлеуметтік
              қабілеттерін дамыту.
            </p>
          </Reveal>
        </div>

        <ul className="grid grid-cols-2 gap-4 sm:gap-5">
          {aboutStats.map(({ icon: Icon, value, label }, i) => (
            <Reveal as="li" key={value} delay={i * 100}>
              <div className="group h-full rounded-[2rem] bg-white p-5 shadow-soft ring-1 ring-lime-100/70 transition duration-300 hover:-translate-y-1 hover:shadow-lift sm:p-7">
                <span className={`grid size-12 place-items-center rounded-2xl ${statTones[i]} transition group-hover:rotate-6`}>
                  <Icon className="size-6" />
                </span>
                <p className="mt-5 font-display text-2xl font-bold text-ink sm:text-3xl">{value}</p>
                <p className="mt-1 text-sm font-bold text-ink-soft sm:text-base">{label}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
