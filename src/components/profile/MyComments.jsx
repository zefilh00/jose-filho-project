import { useCallback, useEffect, useState } from "react";
import { LoaderCircle, MessageSquareText, RefreshCw } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { deleteMyComment, getMyComments, updateMyComment, } from "../../services/commentService";
import CommentCard from "./CommentCard";
import EditCommentModal from "./EditCommentModal";

const PAGE_SIZE = 10;

export default function MyComments() {
  const { user } = useAuth();

  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [nextOffset, setNextOffset] = useState(0);

  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const [editingComment, setEditingComment] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const loadComments = useCallback(
    async (offset = 0) => {
      if (!user?.id) return;

      if (offset === 0) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      setError("");
      setNotice("");

      const { data, error: requestError } = await getMyComments(
        user.id,
        offset,
      );

      if (requestError) {
        setError("Não foi possível carregar seus comentários.");
      } else {
        const receivedComments = data || [];

        setComments((current) =>
          offset === 0 ? receivedComments : [...current, ...receivedComments],
        );

        setNextOffset(offset + receivedComments.length);
        setHasMore(receivedComments.length === PAGE_SIZE);
      }

      setLoading(false);
      setLoadingMore(false);
    },
    [user?.id],
  );

  useEffect(() => {
    loadComments(0);
  }, [loadComments]);

  async function handleSaveComment(content) {
    if (!editingComment || !user?.id) return;

    setSaving(true);
    setError("");

    const { data, error: updateError } = await updateMyComment(
      user.id,
      editingComment.id,
      content,
      editingComment.parent_comment_id,
    );

    if (updateError) {
      setError(updateError.message || "Não foi possível editar o comentário.");
      setSaving(false);
      return;
    }

    setComments((current) =>
      current.map((comment) =>
        comment.id === data.id ? { ...comment, ...data } : comment,
      ),
    );

    setEditingComment(null);
    setNotice("Comentário atualizado com sucesso.");
    setSaving(false);
  }

  async function handleDeleteComment(commentId) {
    const confirmed = window.confirm(
      "Tem certeza de que deseja excluir este comentário? Essa ação não poderá ser desfeita.",
    );

    if (!confirmed || !user?.id) return;

    setDeletingId(commentId);
    setError("");
    setNotice("");

    const { error: deleteError } = await deleteMyComment(user.id, commentId);

    if (deleteError) {
      setError(deleteError.message || "Não foi possível excluir o comentário.");
      setDeletingId(null);
      return;
    }

    setComments((current) =>
      current
        .filter((comment) => comment.id !== commentId)
        .map((comment) =>
          comment.parent_comment_id === commentId
            ? { ...comment, parent_comment_id: null }
            : comment,
        ),
    );

    setNotice("Comentário excluído com sucesso.");
    setDeletingId(null);
  }

  if (loading) {
    return (
      <section className="rounded-2xl border border-white/10 bg-slate-900/40 p-6">
        <div className="flex items-center justify-center gap-3 py-10 text-slate-400">
          <LoaderCircle size={20} className="animate-spin" />
          <span>Carregando seus comentários...</span>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <MessageSquareText size={22} className="text-violet-400" />

            <h2 className="text-xl font-bold text-white">Meus comentários</h2>
          </div>

          <p className="mt-1 text-sm text-slate-400">
            Consulte, edite ou exclua os comentários que você publicou.
          </p>
        </div>

        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
          {comments.length}{" "}
          {comments.length === 1 ? "comentário" : "comentários"}
        </span>
      </div>

      {error && (
        <div
          role="alert"
          className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300"
        >
          <span>{error}</span>

          <button
            type="button"
            onClick={() => loadComments(0)}
            className="flex items-center gap-2 font-medium hover:text-white"
          >
            <RefreshCw size={15} />
            Tentar novamente
          </button>
        </div>
      )}

      {notice && (
        <div
          role="status"
          className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-300"
        >
          {notice}
        </div>
      )}

      {comments.length === 0 && !error ? (
        <div className="rounded-2xl border border-dashed border-white/15 bg-slate-900/30 px-6 py-12 text-center">
          <MessageSquareText
            size={36}
            className="mx-auto mb-4 text-slate-600"
          />

          <h3 className="font-semibold text-white">
            Você ainda não fez comentários
          </h3>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-400">
            Quando você comentar ou responder uma publicação, suas contribuições
            aparecerão aqui. Você poderá gerenciá-las diretamente pelo seu
            perfil.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <CommentCard
              key={comment.id}
              comment={comment}
              userId={user.id}
              onEdit={setEditingComment}
              onDelete={handleDeleteComment}
              deleting={deletingId === comment.id}
            />
          ))}
        </div>
      )}

      {hasMore && (
        <div className="flex justify-center pt-2">
          <button
            type="button"
            onClick={() => loadComments(nextOffset)}
            disabled={loadingMore}
            className="flex items-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-slate-300 transition hover:border-violet-500/40 hover:bg-violet-500/5 disabled:opacity-50"
          >
            {loadingMore && <LoaderCircle size={16} className="animate-spin" />}

            {loadingMore ? "Carregando..." : "Carregar mais comentários"}
          </button>
        </div>
      )}

      {editingComment && (
        <EditCommentModal
          comment={editingComment}
          onClose={() => {
            if (!saving) setEditingComment(null);
          }}
          onSave={handleSaveComment}
          saving={saving}
        />
      )}
    </section>
  );
}