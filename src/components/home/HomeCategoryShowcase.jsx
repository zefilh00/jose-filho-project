import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { homeCategories } from "../../data/homeCategories.js";

export default function HomeCategoryShowcase() {
  return (
    <section className="border-y border-white/[0.06] bg-[#0c1021] py-20 sm:py-24">
      <div className="section-container">
        <div className="motion-enter mb-12">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-400">
            Explore os universos
          </span>

          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            Assuntos que me movem.
          </h2>

          <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-400">
            Diferentes temas, diferentes perspectivas e muito conteúdo
            para explorar.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {homeCategories.map((category, index) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.slug}
                to={`/artigos?categoria=${category.slug}`}
                className={`interactive-card group rounded-2xl border border-white/[0.08] bg-gradient-to-br ${category.color} p-6 shadow-lg shadow-black/10 ${category.borderColor} ${category.glowColor}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="mb-7 flex items-center justify-between">
                  <div className="rounded-xl bg-black/20 p-3 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
                    <Icon size={24} className={category.iconColor} />
                  </div>

                  <ArrowUpRight
                    size={20}
                    className="text-slate-500 transition duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white"
                  />
                </div>

                <h3 className="text-lg font-semibold text-white">
                  {category.name}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-slate-400">
                  {category.description}
                </p>

                <span className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-slate-400 transition group-hover:text-white">
                  Explorar assunto

                  <ArrowRight
                    size={14}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
