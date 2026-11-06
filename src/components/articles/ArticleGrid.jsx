import { Link } from "react-router-dom";
import { ArrowRight, FileText } from "lucide-react";
import ArticleCard from "./ArticleCard";

function ArticleGrid({ articles = [] }) {
  return (
    <section>
      {articles.length > 0 ? (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/artigos"
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-6 py-3 text-sm font-medium text-white transition hover:border-violet-500/50 hover:bg-violet-500/10"
            >
              Ver todos os artigos
              <ArrowRight size={16} />
            </Link>
          </div>
        </>
      ) : (
        <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] px-6 py-12 text-center">
          <FileText size={30} className="mx-auto text-violet-400" />

          <h3 className="mt-4 font-semibold text-white">
            Novos artigos em breve
          </h3>

          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-500">
            Estou preparando conteúdos sobre música, política, tecnologia e
            cultura geek. Volte em breve para conferir as novidades!
          </p>
        </div>
      )}
    </section>
  );
}

export default ArticleGrid;
