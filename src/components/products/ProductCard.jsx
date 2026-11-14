import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { formatPrice, formatPublicationDate, } from "../../utils/contentUtils.js";

function ProductCard({ product }) {
  if (!product) return null;

  const categoryName =
    product.category?.name || product.category || "Recomendação";

  const title = product.name || product.title;
  const price = formatPrice(product.price);

  return (
    <Link
      to={`/recomendacoes/${product.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[#101426] transition duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-950/20"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-[#171b32]">
        {product.image ? (
          <img
            src={product.image}
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-slate-600">
            Sem imagem
          </div>
        )}

        <span className="absolute left-4 top-4 rounded-full border border-blue-400/20 bg-[#080b18]/80 px-3 py-1 text-xs font-medium text-blue-300 backdrop-blur-md">
          {categoryName}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-2 text-lg font-semibold text-white transition group-hover:text-blue-300">
          {title}
        </h3>

        <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-slate-400">
          {product.description || "Confira esta recomendação."}
        </p>

        <div className="mt-5 flex items-center justify-between border-t border-white/[0.07] pt-4">
          <div className="flex flex-col gap-1">
            <span className="text-xs text-slate-400">
              {price || "Recomendação"}
            </span>

            {product.published_at && (
              <span className="text-xs text-slate-600">
                {formatPublicationDate(product.published_at)}
              </span>
            )}
          </div>

          <span className="flex items-center gap-1 text-sm font-medium text-blue-400 transition group-hover:gap-2">
            Ver recomendação
            <ArrowUpRight size={16} />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;