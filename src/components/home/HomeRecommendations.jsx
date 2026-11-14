import { Link } from "react-router-dom";
import { ArrowRight, RefreshCw } from "lucide-react";
import ProductGrid from "../products/ProductGrid";

export default function HomeRecommendations({
  products = [],
  loading = false,
  error = false,
}) {
  return (
    <section className="border-y border-white/[0.06] bg-[#0c1021] py-20 sm:py-24">
      <div className="section-container">
        <div className="motion-enter mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-400">
              Recomendações pessoais
            </span>

            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
              Vale a recomendação.
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-400">
              Produtos, equipamentos e tecnologias que considero
              interessantes e que merecem ser conhecidos.
            </p>
          </div>

          <Link
            to="/recomendacoes"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 transition hover:gap-3 hover:text-blue-300"
          >
            Todas as recomendações
            <ArrowRight size={17} />
          </Link>
        </div>

        {loading ? (
          <div className="flex min-h-48 items-center justify-center">
            <RefreshCw
              size={27}
              className="animate-spin text-blue-400"
            />
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-red-400/20 bg-red-500/5 px-6 py-10 text-center">
            <p className="text-sm text-red-300">
              Não foi possível carregar as recomendações no momento.
            </p>
          </div>
        ) : (
          <ProductGrid products={products} />
        )}
      </div>
    </section>
  );
}
