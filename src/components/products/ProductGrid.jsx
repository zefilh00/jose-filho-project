import { Link } from "react-router-dom";
import { ArrowRight, ShoppingBag } from "lucide-react";
import ProductCard from "./ProductCard";

function ProductGrid({ products = [] }) {
  return (
    <section>
      {products.length > 0 ? (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/recomendacoes"
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-6 py-3 text-sm font-medium text-white transition hover:border-blue-500/50 hover:bg-blue-500/10"
            >
              Ver todas as recomendações
              <ArrowRight size={16} />
            </Link>
          </div>
        </>
      ) : (
        <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] px-6 py-12 text-center">
          <ShoppingBag size={30} className="mx-auto text-blue-400" />

          <h3 className="mt-4 font-semibold text-white">
            Recomendações em breve
          </h3>

          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-500">
            Em breve compartilharei produtos, equipamentos e tecnologias que
            considero interessantes e que merecem sua atenção.
          </p>
        </div>
      )}
    </section>
  );
}

export default ProductGrid;
