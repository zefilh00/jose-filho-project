import { GraduationCap, Code2, Rocket, } from "lucide-react";
import { journey } from "./aboutData";

const icons = {
  GraduationCap,
  Code2,
  Rocket,
};

const delays = [
  "motion-delay-1",
  "motion-delay-2",
  "motion-delay-3",
];

export default function AboutJourney() {
  return (
    <section className="py-20">
      <div className="section-container">
        <div className="mb-14 max-w-2xl">
          <span className="mb-4 block text-sm font-semibold uppercase tracking-[0.2em] text-violet-400">
            Em constante evolução
          </span>

          <h2 className="mb-5 text-4xl font-bold sm:text-5xl">
            Construindo meu <span className="text-gradient">caminho.</span>
          </h2>

          <p className="leading-relaxed text-slate-400">
            Ainda tenho muito para aprender e muitos projetos para tirar do
            papel. Mas já sei em qual direção quero seguir.
          </p>
        </div>

        <div className="relative space-y-6 before:absolute before:bottom-8 before:left-6 before:top-8 before:w-px before:bg-gradient-to-b before:from-violet-500 before:to-blue-500/10">
          {journey.map((item, index) => {
            const Icon = icons[item.icon];

            return (
              <article
                key={item.id}
                className={`motion-enter ${delays[index]} relative flex gap-6`}
              >
                <div className="z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-violet-400/20 bg-[#11172b] text-violet-300">
                  <Icon size={23} />
                </div>

                <div className="interactive-card flex-1 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                  <h3 className="mb-2 text-xl font-bold">{item.title}</h3>

                  <p className="leading-relaxed text-slate-400">
                    {item.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
