import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, UserRound } from "lucide-react";

export default function HomeAboutCTA() {
  return (
    <section className="section-container py-20 sm:py-24">
      <div className="interactive-card relative overflow-hidden rounded-3xl border border-violet-500/20 bg-gradient-to-br from-[#171538] via-[#11172f] to-[#0c1021] p-8 sm:p-12 lg:p-16">
        <div className="hero-orb absolute -right-20 -top-20 h-80 w-80 rounded-full bg-violet-600/15 blur-[100px]" />

        <div className="relative z-10 grid items-center gap-10 lg:grid-cols-[1fr_auto]">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 text-violet-300">
              <UserRound size={19} />

              <span className="text-xs font-semibold uppercase tracking-[0.25em]">
                Por trás do universo
              </span>
            </div>

            <h2 className="max-w-2xl text-3xl font-bold leading-tight sm:text-4xl">
              Prazer, sou José Filho.
              <br />
              <span className="text-gradient">
                E esse é o meu multiverso.
              </span>
            </h2>

            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
              Desenvolvedor em formação, apaixonado por tecnologia,
              música, cultura geek e por explorar novas ideias. Criei
              este espaço para compartilhar um pouco de tudo aquilo que
              faz parte de quem sou.
            </p>

            <Link
              to="/sobre"
              className="shine-button mt-8 inline-flex items-center gap-3 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-[#111327] transition duration-300 hover:-translate-y-1 hover:bg-violet-100"
            >
              Conheça minha história
              <ArrowRight size={17} />
            </Link>
          </div>

          <div className="hidden lg:flex">
            <div className="floating-icon flex h-40 w-40 items-center justify-center rounded-full border border-violet-400/30 bg-violet-500/10 shadow-2xl shadow-violet-900/30">
              <Sparkles size={65} className="text-violet-300" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
