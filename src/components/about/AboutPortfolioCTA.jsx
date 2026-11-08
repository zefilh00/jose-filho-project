import { ArrowRight, BriefcaseBusiness } from "lucide-react";
import { Link } from "react-router-dom";

export default function AboutPortfolioCTA() {
  return (
    <section className="py-20">
      <div className="section-container">
        <div className="relative overflow-hidden rounded-3xl border border-violet-400/20 bg-gradient-to-br from-blue-950/80 via-[#15102d] to-purple-950/80 p-8 sm:p-12">
          <div className="hero-orb absolute -right-20 -top-28 h-72 w-72 rounded-full bg-violet-500/20 blur-[90px]" />

          <div className="relative max-w-2xl">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-violet-300">
              <BriefcaseBusiness size={28} />
            </div>

            <h2 className="mb-5 text-4xl font-bold sm:text-5xl">
              Quer conhecer o que estou{" "}
              <span className="text-gradient">construindo?</span>
            </h2>

            <p className="mb-8 leading-relaxed text-slate-300">
              No meu portfólio, compartilho projetos, experiências e um pouco
              do que venho desenvolvendo durante minha jornada na tecnologia.
            </p>

            <Link
              to="/portfolio"
              className="shine-button inline-flex items-center gap-3 rounded-lg bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-500"
            >
              Explorar portfólio
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
