import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, CalendarDays, RefreshCw } from "lucide-react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { getPublishedArticleBySlug } from "../services/articleService.js";
import { formatPublicationDate } from "../utils/contentUtils.js";

export default function ArticleDetail() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [reload, setReload] = useState(0);

  useEffect(() => {
    let active = true;

    async function loadArticle() {
      setLoading(true);
      setError(false);

      try {
        const data = await getPublishedArticleBySlug(slug);

        if (active) setArticle(data);
      } catch (err) {
        console.error("Erro ao carregar artigo:", err);

        if (active) setError(true);
      } finally {
        if (active) setLoading(false);
      }
    }

    loadArticle();

    return () => {
      active = false;
    };
  }, [slug, reload]);

  return (
    <div className="min-h-screen bg-[#080b18] text-white">
      <Header />

      <main className="section-container min-h-[70vh] px-4 pb-20 pt-8 sm:px-6 sm:pt-10">
        <div className="mx-auto max-w-4xl">
          <Link
            to="/artigos"
            className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-violet-300"
          >
            <ArrowLeft size={16} />
            Voltar aos artigos
          </Link>

          {loading ? (
            <div className="flex min-h-96 items-center justify-center">
              <RefreshCw
                size={28}
                className="animate-spin text-violet-400"
              />
            </div>
          ) : error ? (
            <div className="mt-12 rounded-2xl border border-red-400/20 bg-red-500/5 px-6 py-12 text-center">
              <h1 className="text-xl font-semibold text-white">
                Não foi possível carregar este artigo
              </h1>

              <button
                type="button"
                onClick={() => setReload((current) => current + 1)}
                className="mt-4 text-sm text-white underline underline-offset-4"
              >
                Tentar novamente
              </button>
            </div>
          ) : !article ? (
            <div className="mt-12 rounded-2xl border border-dashed border-white/10 bg-white/[0.02] px-6 py-16 text-center">
              <h1 className="text-xl font-semibold text-white">
                Artigo não encontrado
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Este artigo pode ter sido removido ou ainda não foi publicado.
              </p>
            </div>
          ) : (
            <article className="mt-10">
              {article.category?.name && (
                <span className="inline-flex rounded-full border border-violet-400/20 bg-violet-500/10 px-4 py-2 text-xs font-medium text-violet-300">
                  {article.category.name}
                </span>
              )}

              <h1 className="mt-6 text-3xl font-bold leading-tight text-white sm:text-5xl">
                {article.title}
              </h1>

              {article.excerpt && (
                <p className="mt-6 text-lg leading-relaxed text-slate-400">
                  {article.excerpt}
                </p>
              )}

              {article.published_at && (
                <div className="mt-6 flex items-center gap-2 text-sm text-slate-500">
                  <CalendarDays size={16} />
                  {formatPublicationDate(article.published_at)}
                </div>
              )}

              {article.coverImage && (
                <div className="mt-10 overflow-hidden rounded-2xl border border-white/10">
                  <img
                    src={article.coverImage}
                    alt={article.title}
                    className="max-h-[520px] w-full object-cover"
                  />
                </div>
              )}

              <div className="prose prose-invert mt-10 max-w-none">
                <div className="whitespace-pre-wrap text-base leading-8 text-slate-300">
                  {article.content}
                </div>
              </div>

              {article.images?.length > 0 && (
                <div className="mt-12 space-y-8">
                  {article.images.map((image) => (
                    <figure key={image.id}>
                      <img
                        src={image.url}
                        alt={image.alt_text || article.title}
                        loading="lazy"
                        className="w-full rounded-2xl border border-white/10"
                      />

                      {image.alt_text && (
                        <figcaption className="mt-3 text-center text-sm text-slate-500">
                          {image.alt_text}
                        </figcaption>
                      )}
                    </figure>
                  ))}
                </div>
              )}
            </article>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}