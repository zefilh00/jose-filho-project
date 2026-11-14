import { Link } from "react-router-dom";
import { ArrowUpRight, Clock3 } from "lucide-react";
import { formatPublicationDate } from "../../utils/contentUtils.js";

function ArticleCard({ article }) {
  if (!article) return null;

  const categoryName =
    article.category?.name || article.category || "Artigo";

  const image = article.coverImage || article.image;
  const description = article.excerpt || article.description;

  return (
    <Link
      to={`/artigos/${article.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[#101426] transition duration-300 hover:-translate-y-1 hover:border-violet-500/40 hover:shadow-xl hover:shadow-violet-950/20"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-[#171b32]">
        {image ? (
          <img
            src={image}
            alt={article.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-slate-600">
            Sem imagem
          </div>
        )}

        {categoryName && (
          <span className="absolute left-4 top-4 rounded-full border border-violet-400/20 bg-[#080b18]/80 px-3 py-1 text-xs font-medium text-violet-300 backdrop-blur-md">
            {categoryName}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-2 text-lg font-semibold leading-snug text-white transition group-hover:text-violet-300">
          {article.title}
        </h3>

        <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-slate-400">
          {description || "Confira este artigo."}
        </p>

        <div className="mt-5 flex items-center justify-between border-t border-white/[0.07] pt-4">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Clock3 size={14} />
            {formatPublicationDate(article.published_at) || "Artigo"}
          </div>

          <span className="flex items-center gap-1 text-sm font-medium text-violet-400 transition group-hover:gap-2">
            Ler artigo
            <ArrowUpRight size={16} />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default ArticleCard;