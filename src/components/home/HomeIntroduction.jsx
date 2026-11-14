import { Link } from "react-router-dom";
import { ArrowRight, Layers3 } from "lucide-react";
import { homeCategories } from "../../data/homeCategories.js";

export default function HomeIntroduction() {
  return (
    <section className="section-container py-20 sm:py-24">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div className="motion-enter">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-violet-400">
            Muito além de um blog
          </span>

          <h2 className="mt-5 text-3xl font-bold leading-tight sm:text-4xl">
            Diferentes interesses.
            <br />
            <span className="text-gradient">
              Um único universo.
            </span>
          </h2>

          <p className="mt-6 max-w-xl leading-relaxed text-slate-400">
            O My Multiverse nasceu da vontade de reunir diferentes
            interesses em um só lugar. Aqui compartilho pensamentos,
            experiências, opiniões e descobertas sobre assuntos que fazem
            parte do meu cotidiano.
          </p>

          <p className="mt-4 max-w-xl leading-relaxed text-slate-400">
            Não existe um único tema ou caminho. Existe curiosidade,
            personalidade e liberdade para explorar diferentes universos.
          </p>

          <Link
            to="/sobre"
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-violet-400 transition hover:gap-3 hover:text-violet-300"
          >
            Saiba mais sobre mim
            <ArrowRight size={17} />
          </Link>
        </div>

        <div className="motion-enter motion-delay-2 relative">
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-blue-600/20 to-violet-600/20 blur-2xl" />

          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#101426] p-7 sm:p-10">
            <div className="mb-8 flex items-center justify-between">
              <Layers3 size={28} className="text-violet-400" />

              <span className="text-xs uppercase tracking-widest text-slate-500">
                My Multiverse
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {homeCategories.map((category, index) => {
                const Icon = category.icon;

                return (
                  <Link
                    key={category.slug}
                    to={`/artigos?categoria=${category.slug}`}
                    className={`interactive-card group rounded-2xl border border-white/[0.06] bg-gradient-to-br ${category.color} p-5`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <Icon
                      className={`${category.iconColor} mb-4 transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-6`}
                      size={25}
                    />

                    <h3 className="font-semibold text-white">
                      {category.name}
                    </h3>

                    <p className="mt-2 text-xs leading-relaxed text-slate-400">
                      {category.description}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
