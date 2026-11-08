import { useEffect, useState } from "react";
import { LoaderCircle, Save, X } from "lucide-react";
import { countCharacters, getCommentLimit, } from "../../utils/commentValidation";

export default function EditCommentModal({
  comment,
  onClose,
  onSave,
  saving,
}) {
  const [content, setContent] = useState(comment.content);

  const limit = getCommentLimit(comment.parent_comment_id);
  const characterCount = countCharacters(content.trim());
  const isOverLimit = characterCount > limit;
  const isEmpty = !content.trim();

  useEffect(() => {
    setContent(comment.content);
  }, [comment.id, comment.content]);

  function handleSubmit(event) {
    event.preventDefault();

    if (isEmpty || isOverLimit || saving) return;

    onSave(content);
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-comment-title"
        className="w-full max-w-lg rounded-2xl border border-white/10 bg-slate-950 p-6 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-5 flex items-center justify-between">
          <h2
            id="edit-comment-title"
            className="text-xl font-bold text-white"
          >
            Editar comentário
          </h2>

          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            aria-label="Fechar"
            className="rounded-lg p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <label
            htmlFor="comment-content"
            className="mb-2 block text-sm font-medium text-slate-300"
          >
            Conteúdo do comentário
          </label>

          <textarea
            id="comment-content"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            rows={5}
            required
            disabled={saving}
            aria-invalid={isOverLimit}
            className={`w-full resize-y rounded-xl border bg-slate-900 p-4 text-sm text-white outline-none transition placeholder:text-slate-500 ${
              isOverLimit
                ? "border-red-500 focus:border-red-400"
                : "border-white/10 focus:border-violet-500"
            }`}
            placeholder="Escreva seu comentário..."
          />

          <div className="mt-2 flex items-center justify-between gap-3">
            <span
              className={`text-xs ${
                isOverLimit ? "text-red-400" : "text-slate-500"
              }`}
            >
              {isOverLimit
                ? `Você ultrapassou o limite de ${limit.toLocaleString("pt-BR")} caracteres.`
                : `Limite de ${limit.toLocaleString("pt-BR")} caracteres.`}
            </span>

            <span
              className={`whitespace-nowrap text-xs font-medium ${
                isOverLimit ? "text-red-400" : "text-slate-400"
              }`}
            >
              {characterCount.toLocaleString("pt-BR")} / {limit.toLocaleString("pt-BR")}
            </span>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="rounded-xl border border-white/10 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/5"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={saving || isEmpty || isOverLimit}
              className="flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? (
                <LoaderCircle size={17} className="animate-spin" />
              ) : (
                <Save size={17} />
              )}

              Salvar alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
