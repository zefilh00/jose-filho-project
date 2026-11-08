import { BookOpen } from "lucide-react";

export default function AboutStory() {
  return (
    <section id="minha-historia" className="py-20">
      <div className="section-container">
        <div className="mb-12 max-w-3xl">
          <span className="mb-4 block text-sm font-semibold uppercase tracking-[0.2em] text-violet-400">
            Quem está por trás
          </span>

          <h2 className="mb-6 text-4xl font-bold sm:text-5xl">
            Minha história e{" "}
            <span className="text-gradient">meus interesses.</span>
          </h2>

          <p className="leading-relaxed text-slate-400">
            Sou uma pessoa curiosa, que gosta de aprender, experimentar e
            encontrar novas formas de enxergar o mundo. Meus interesses são
            variados, e acredito que essa mistura é justamente o que torna
            cada pessoa única.
          </p>
        </div>

        <div className="interactive-card rounded-2xl border border-white/10 bg-white/[0.03] p-7 sm:p-10">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
            <BookOpen size={25} />
          </div>

          <div className="max-w-4xl space-y-5 leading-relaxed text-slate-300">
            <p>
              Atualmente estou concluindo minha graduação em Análise e
              Desenvolvimento de Sistemas pela FAMINAS Muriaé. A área de
              tecnologia me permite unir lógica, criatividade e resolução de
              problemas, características que me motivam a continuar aprendendo.
            </p>

            <p>
              Fora do universo da programação, a música ocupa um espaço
              especial na minha vida. Sou apaixonado por rock e metal,
              principalmente power metal. Rhapsody, Angra e Nightwish estão
              entre as bandas que mais gosto.
            </p>

            <p>
              Também sou muito ligado ao universo geek. Sou fã da DC e tenho
              um carinho especial pelo Superman, além de gostar bastante de
              histórias de fantasia, como O Senhor dos Anéis.
            </p>

            <p>
              Nos jogos, gosto de experiências bem diferentes: da saga God of
              War a Skyrim, passando por GTA V, GTA San Andreas, Minecraft e
              League of Legends — infelizmente, sim.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
