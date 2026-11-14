import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Sparkles, } from "lucide-react";
import { homeCategories } from "../../data/homeCategories.js";

export default function HomeHero() {
  return (
    <section className="hero-section relative flex min-h-[590px] items-center overflow-hidden lg:min-h-[620px]">
      <div
        className="hero-background absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1607799279861-4dd421887fb3?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxM3A3fDA%3D')",
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-r from-[#080b18] via-[#080b18]/90 to-[#080b18]/50" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#080b18] via-transparent to-[#080b18]/50" />

      <div className="hero-orb absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-violet-600/15 blur-[130px]" />
      <div className="hero-orb hero-orb-delay absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-blue-600/10 blur-[130px]" />

      <div className="section-container relative z-10 py-20 sm:py-24">
        <div className="max-w-3xl">
          <div className="motion-enter mb-6 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-4 py-2 backdrop-blur-md">
            <Sparkles size={15} className="text-violet-300" />

            <span className="text-[10px] font-medium tracking-[0.12em] text-violet-200 sm:text-xs">
              UM UNIVERSO DE IDEIAS, CONHECIMENTO E CRIATIVIDADE
            </span>
          </div>

          <p className="motion-enter motion-delay-1 mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-blue-300 sm:text-sm">
            Bem-vindo ao meu universo
          </p>

          <h1 className="motion-enter motion-delay-2 text-5xl font-bold leading-[1.08] tracking-tight sm:text-6xl lg:text-8xl">
            My
            <br />
            <span className="animated-gradient-text">
              Multiverse.
            </span>
          </h1>

          <p className="motion-enter motion-delay-3 mt-6 max-w-xl text-base leading-relaxed text-slate-300 sm:mt-7 sm:text-lg">
            Um espaço onde tecnologia, música, política e cultura geek se
            encontram. Ideias, opiniões e descobertas compartilhadas sob
            uma perspectiva única: a minha.
          </p>

          <div className="motion-enter motion-delay-4 mt-8 flex flex-wrap gap-4">
            <Link
              to="/artigos"
              className="shine-button group inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-7 py-4 text-sm font-semibold text-white shadow-xl shadow-violet-950/30 transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-violet-600/25"
            >
              Explorar artigos

              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            <Link
              to="/sobre"
              className="group inline-flex items-center gap-3 rounded-xl border border-white/15 bg-white/[0.05] px-7 py-4 text-sm font-semibold text-white backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-violet-400/50 hover:bg-white/10"
            >
              Conheça-me

              <ArrowUpRight
                size={17}
                className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </Link>
          </div>

          <div className="motion-enter motion-delay-5 mt-10 border-t border-white/10 pt-5">
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-500">
              Explore por assunto
            </p>

            <div className="flex flex-wrap gap-2 sm:gap-3">
              {homeCategories.map((category) => {
                const Icon = category.icon;

                return (
                  <Link
                    key={category.slug}
                    to={`/artigos?categoria=${category.slug}`}
                    className="group inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 py-2.5 text-xs text-slate-300 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-violet-400/40 hover:bg-violet-500/10 hover:text-white sm:px-4 sm:text-sm"
                  >
                    <Icon
                      size={16}
                      className={`${category.iconColor} transition-transform duration-300 group-hover:scale-110`}
                    />

                    {category.name}

                    <ArrowUpRight
                      size={13}
                      className="opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />
    </section>
  );
}
