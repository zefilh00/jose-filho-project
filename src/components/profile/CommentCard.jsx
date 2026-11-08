import { CalendarDays, ExternalLink, MessageSquare, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const STATUS_LABELS = {
  pending: "Aguardando aprovação",
  approved: "Publicado",
  hidden: "Oculto pela moderação",
};

export default function CommentCard({
  comment,
  userId,
  onEdit,
  onDelete,
  deleting,
}) {
  const isOwner = comment.author_id === userId;

  const article = comment.article;
  const product = comment.product;

  const publicationTitle = article?.title || product?.name;

  const publicationUrl = article?.slug
    ? `/artigos/${article.slug}`
    : product?.slug
      ? `/recomendacoes/${product.slug}`
      : null;

  const publicationType = article ? "Artigo" : "Produto";

  const formattedDate = new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(comment.created_at));

  return (
    <article className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 transition hover:border-violet-500/30">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <MessageSquare size={16} className="text-violet-400" />

          <span>
            {comment.parent_comment_id ? "Resposta" : "Comentário"}
          </span>

          <span className="text-slate-600">•</span>

          <span>{publicationType}</span>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            comment.status === "approved"
              ? "bg-emerald-500/10 text-emerald-400"
              : comment.status === "hidden"
                ? "bg-red-500/10 text-red-400"
                : "bg-amber-500/10 text-amber-400"
          }`}
        >
          {STATUS_LABELS[comment.status] || "Status desconhecido"}
        </span>
      </div>

      <p className="whitespace-pre-wrap break-words text-sm leading-7 text-slate-200">
        {comment.content}
      </p>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
        <div className="flex flex-col gap-2">
          {publicationTitle && (
            <span className="text-xs text-slate-400">
              Publicação:{" "}
              <strong className="font-medium text-slate-300">
                {publicationTitle}
              </strong>
            </span>
          )}

          {publicationUrl && (
            <Link
              to={publicationUrl}
              className="flex items-center gap-1 text-xs font-medium text-violet-400 transition hover:text-violet-300"
            >
              Ver publicação
              <ExternalLink size={13} />
            </Link>
          )}

          <span className="flex items-center gap-1.5 text-xs text-slate-500">
            <CalendarDays size={13} />
            {formattedDate}
          </span>
        </div>

        {isOwner && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onEdit(comment)}
              className="flex items-center gap-1.5 rounded-lg border border-violet-500/20 px-3 py-2 text-xs font-medium text-violet-300 transition hover:bg-violet-500/10"
            >
              <Pencil size={14} />
              Editar
            </button>

            <button
              type="button"
              onClick={() => onDelete(comment.id)}
              disabled={deleting}
              className="flex items-center gap-1.5 rounded-lg border border-red-500/20 px-3 py-2 text-xs font-medium text-red-400 transition hover:bg-red-500/10 disabled:opacity-50"
            >
              <Trash2 size={14} />
              {deleting ? "Excluindo..." : "Excluir"}
            </button>
          </div>
        )}
      </div>
    </article>
  );
}