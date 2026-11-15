import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, CalendarDays, UserRound } from "lucide-react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { getPublishedArticleBySlug } from "../services/articleService.js";
import { formatPublicationDate } from "../utils/contentUtils.js";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";

export default function ArticleDetail() {
  const { slug } = useParams();

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadArticle() {
      setLoading(true);
      setError("");

      try {
        const data = await getPublishedArticleBySlug(slug);

        if (active) {
          setArticle(data);
        }
      } catch (err) {
        console.error("Erro ao carregar artigo:", err);

        if (active) {
          setError(
            err.message || "Não foi possível carregar o artigo."
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadArticle();

    return () => {
      active = false;
    };
  }, [slug]);

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#080b18] px-5 pb-20 pt-28 text-white sm:px-8">
        <div className="mx-auto max-w-4xl">
          <Link
            to="/artigos"
            className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-violet-300"
          >
            <ArrowLeft size={16} />
            Voltar aos artigos
          </Link>

          {loading ? (
            <div className="mt-20 text-center text-slate-400">
              Carregando artigo...
            </div>
          ) : error ? (
            <div className="mt-12 rounded-2xl border border-red-500/20 bg-red-500/5 p-6 text-red-300">
              {error}
            </div>
          ) : !article ? (
            <div className="mt-20 text-center">
              <h1 className="text-2xl font-bold">
                Artigo não encontrado
              </h1>
              <p className="mt-3 text-slate-400">
                Esse artigo pode ter sido removido ou não está publicado.
              </p>
            </div>
          ) : (
            <article className="mt-10">
              {article.category?.name && (
                <span className="inline-flex rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-300">
                  {article.category.name}
                </span>
              )}

              <h1 className="mt-5 text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
                {article.title}
              </h1>

              {article.excerpt && (
                <p className="mt-5 text-lg leading-8 text-slate-400">
                  {article.excerpt}
                </p>
              )}

              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 border-b border-white/10 pb-7 text-sm text-slate-400">
                <span className="inline-flex items-center gap-2">
                  <UserRound size={16} />
                  Por {article.author?.display_name || "José Filho"}
                </span>

                <span className="inline-flex items-center gap-2">
                  <CalendarDays size={16} />
                  {formatPublicationDate(article.published_at)}
                </span>
              </div>

              {article.coverImage && (
                <img
                  src={article.coverImage}
                  alt={article.title}
                  className="mt-9 max-h-[520px] w-full rounded-2xl object-cover"
                />
              )}

              <div className="prose prose-invert mt-12 max-w-none prose-headings:font-bold prose-headings:text-white prose-p:text-slate-300 prose-p:leading-8 prose-a:text-violet-300 prose-strong:text-white prose-blockquote:border-violet-500 prose-blockquote:text-slate-400 prose-img:rounded-xl prose-th:text-white prose-td:text-slate-300">
                {article.content?.trim() ? (
                  <div className="article-content">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeSanitize]}
                    >
                      {article.content}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <p className="text-slate-500">
                    Este artigo ainda não possui conteúdo.
                  </p>
                )}
              </div>

              {article.images?.length > 0 && (
                <div className="mt-12 space-y-8">
                  {article.images.map((image) => (
                    <figure key={image.id}>
                      <img
                        src={image.url}
                        alt={image.alt_text || article.title}
                        className="w-full rounded-2xl object-cover"
                      />
                    </figure>
                  ))}
                </div>
              )}
            </article>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}