import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";

export default function ArticlePreview({
  title,
  excerpt,
  category,
  content,
  coverImage,
  authorName,
  publishedAt,
}) {
  return (
    <article className="mx-auto max-w-3xl">
      {category && (
        <span className="inline-flex rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-300">
          {category}
        </span>
      )}

      <h1 className="mt-5 text-3xl font-bold leading-tight text-white sm:text-4xl">
        {title || "Título do artigo"}
      </h1>

      <p className="mt-4 text-base leading-7 text-slate-400">
        {excerpt || "O resumo do artigo aparecerá aqui."}
      </p>

      <div className="mt-5 flex flex-wrap gap-2 text-xs text-slate-500">
        {authorName && <span>Por {authorName}</span>}
        {publishedAt && <span>• {publishedAt}</span>}
      </div>

      {coverImage && (
        <img
          src={coverImage}
          alt={title || "Imagem de capa"}
          className="mt-8 max-h-[450px] w-full rounded-2xl object-cover"
        />
      )}

      <div className="prose prose-invert mt-10 max-w-none prose-headings:text-white prose-p:text-slate-300 prose-a:text-violet-300 prose-strong:text-white prose-blockquote:border-violet-500 prose-blockquote:text-slate-400 prose-img:rounded-xl prose-th:text-white prose-td:text-slate-300">
        {content?.trim() ? (
        <div className="article-content">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeSanitize]}
          >
            {content}
          </ReactMarkdown>
        </div>
        ) : (
          <p className="text-slate-500">
            O conteúdo do artigo aparecerá aqui.
          </p>
        )}
      </div>
    </article>
  );
}