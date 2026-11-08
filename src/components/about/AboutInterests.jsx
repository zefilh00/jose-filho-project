import { Code2, Music2, Gamepad2, Sparkles, ArrowUpRight, } from "lucide-react";
import { interests } from "./aboutData";

const icons = {
  Code2,
  Music2,
  Gamepad2,
  Sparkles,
};

const delays = [
  "motion-delay-1",
  "motion-delay-2",
  "motion-delay-3",
  "motion-delay-4",
];

export default function AboutInterests() {
  return (
    <section className="py-20">
      <div className="section-container">
        <div className="mb-12">
          <span className="mb-4 block text-sm font-semibold uppercase tracking-[0.2em] text-violet-400">
            Meu universo
          </span>

          <h2 className="text-4xl font-bold sm:text-5xl">
            Algumas das coisas que{" "}
            <span className="text-gradient">me definem.</span>
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {interests.map((interest, index) => {
            const Icon = icons[interest.icon];

            return (
              <article
                key={interest.id}
                className={`interactive-card motion-enter ${delays[index]} group rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition duration-300 hover:border-violet-400/40 hover:bg-white/[0.06]`}
              >
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
                    <Icon size={25} />
                  </div>

                  <ArrowUpRight
                    size={20}
                    className="text-slate-600 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-violet-300"
                  />
                </div>

                <h3 className="mb-3 text-2xl font-bold">
                  {interest.title}
                </h3>

                <p className="leading-relaxed text-slate-400">
                  {interest.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
