import { ArrowDown, Code2, Sparkles } from "lucide-react";
import fotoPerfil from "../../assets/images/foto-perfil.jpg";

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden pb-20 pt-8 sm:pb-24 sm:pt-10">
      <div className="hero-orb absolute -left-40 top-10 h-80 w-80 rounded-full bg-blue-600/20 blur-[100px]" />
      <div className="hero-orb hero-orb-delay absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-purple-600/20 blur-[120px]" />

      <div className="section-container relative grid items-center gap-16 lg:grid-cols-2">
        <div className="motion-enter">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/10 px-4 py-2 text-sm text-violet-300">
            <Sparkles size={15} />
            Um pouco sobre mim
          </span>

          <h1 className="mb-6 text-5xl font-bold leading-tight sm:text-6xl lg:text-7xl">
            Muito prazer,
            <br />
            eu sou <span className="animated-gradient-text">José Filho.</span>
          </h1>

          <p className="mb-5 max-w-xl text-lg leading-relaxed text-slate-300">
            Um apaixonado por tecnologia, música, cultura geek e por tudo
            aquilo que desperta curiosidade e criatividade.
          </p>

          <p className="mb-9 max-w-xl leading-relaxed text-slate-400">
            Este é um espaço para compartilhar minhas ideias, interesses,
            experiências e um pouco das coisas que fazem parte do meu universo.
          </p>

          <a
            href="#minha-historia"
            className="shine-button inline-flex items-center gap-3 rounded-lg bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-500"
          >
            Conheça minha história
            <ArrowDown size={18} />
          </a>
        </div>

        <div className="motion-enter motion-delay-2 flex justify-center">
          <div className="relative w-full max-w-sm">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-blue-500/30 to-purple-600/30 blur-2xl" />

            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-2xl">
              <img
                src={fotoPerfil}
                alt="Foto de José Filho"
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#080b18] via-[#080b18]/70 to-transparent p-7 pt-20">
                <p className="text-2xl font-bold text-white">José Filho</p>
                <p className="mt-1 text-sm text-violet-300">
                  My Multiverse
                </p>
              </div>
            </div>

            <div className="floating-icon absolute -right-7 top-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-[#11172b] text-violet-300 shadow-xl">
              <Code2 size={26} />
            </div>

            <div className="floating-icon absolute -bottom-6 -left-7 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-[#11172b] text-blue-300 shadow-xl">
              <Sparkles size={26} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
