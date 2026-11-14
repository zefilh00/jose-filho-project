import { Link } from "react-router-dom";
import { ArrowRight, RefreshCw } from "lucide-react";
import ArticleGrid from "../articles/ArticleGrid";

export default function HomeArticles({
  articles = [],
  loading = false,
  error = false,
}) {
  return (
    <section className="section-container py-20 sm:py-24">
      <div className="motion-enter mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-violet-400">
            Ideias e perspectivas
          </span>

          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            Últimos artigos
          </h2>

          <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-400">
            Pensamentos, opiniões e conteúdos sobre os assuntos que
            despertam minha curiosidade.
          </p>
        </div>

        <Link
          to="/artigos"
          className="inline-flex items-center gap-2 text-sm font-semibold text-violet-400 transition hover:gap-3 hover:text-violet-300"
        >
          Todos os artigos
          <ArrowRight size={17} />
        </Link>
      </div>

      {loading ? (
        <div className="flex min-h-48 items-center justify-center">
          <RefreshCw
            size={27}
            className="animate-spin text-violet-400"
          />
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-red-400/20 bg-red-500/5 px-6 py-10 text-center">
          <p className="text-sm text-red-300">
            Não foi possível carregar os artigos no momento.
          </p>
        </div>
      ) : (
        <ArticleGrid articles={articles} />
      )}
    </section>
  );
}
