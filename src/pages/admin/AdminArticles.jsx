import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  Search,
  RefreshCw,
  Trash2,
  Eye,
  EyeOff,
  CalendarDays,
  Plus,
  AlertCircle,
  Filter,
  Pencil,
} from "lucide-react";
import { getCategories } from "../../services/categoryService.js";
import {
  getAdminArticles,
  updateArticleStatus,
  deleteArticle,
} from "../../services/admin/adminArticleService.js";
import { formatPublicationDate } from "../../utils/contentUtils.js";
import ArticleStatusBadge from "../../components/admin/articles/ArticleStatusBadge";

export default function AdminArticles() {
  const navigate = useNavigate();

  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [categoryId, setCategoryId] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionId, setActionId] = useState(null);
  const [articleToDelete, setArticleToDelete] = useState(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const [articlesData, categoriesData] = await Promise.all([
        getAdminArticles({ search, status, categoryId }),
        getCategories("article"),
      ]);

      setArticles(articlesData);
      setCategories(categoriesData);
    } catch (err) {
      console.error("Erro ao carregar artigos administrativos:", err);
      setError(
        err.message || "Não foi possível carregar os artigos."
      );
    } finally {
      setLoading(false);
    }
  }, [search, status, categoryId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  async function handleStatusChange(article) {
    const newStatus =
      article.status === "published" ? "draft" : "published";

    setActionId(article.id);
    setError("");

    try {
      await updateArticleStatus(article.id, newStatus);
      await loadData();
    } catch (err) {
      console.error("Erro ao atualizar publicação:", err);
      setError(
        err.message || "Não foi possível atualizar o artigo."
      );
    } finally {
      setActionId(null);
    }
  }

  async function handleDelete() {
    if (!articleToDelete) return;

    setActionId(articleToDelete.id);
    setError("");

    try {
      await deleteArticle(articleToDelete.id);
      setArticleToDelete(null);
      await loadData();
    } catch (err) {
      console.error("Erro ao excluir artigo:", err);
      setError(err.message || "Não foi possível excluir o artigo.");
    } finally {
      setActionId(null);
    }
  }

  const publishedCount = articles.filter(
    (article) => article.status === "published"
  ).length;

  const draftCount = articles.filter(
    (article) => article.status === "draft"
  ).length;

  return (
    <div className="space-y-8">
      <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2 text-sm text-violet-300">
            <FileText size={16} />
            Gerenciamento de conteúdo
          </div>

          <h1 className="mt-3 text-3xl font-bold tracking-tight text-white">
            Artigos
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Gerencie suas publicações e organize seus conteúdos.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/admin/artigos/novo")}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-500"
        >
          <Plus size={18} />
          Novo artigo
        </button>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-white/[0.08] bg-[#101426] p-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-400">
              Total de artigos
            </span>
            <FileText className="text-violet-300" size={20} />
          </div>
          <p className="mt-4 text-3xl font-bold text-white">
            {articles.length}
          </p>
        </div>

        <div className="rounded-2xl border border-white/[0.08] bg-[#101426] p-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-400">
              Publicados
            </span>
            <Eye className="text-emerald-300" size={20} />
          </div>
          <p className="mt-4 text-3xl font-bold text-white">
            {publishedCount}
          </p>
        </div>

        <div className="rounded-2xl border border-white/[0.08] bg-[#101426] p-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-400">
              Rascunhos
            </span>
            <FileText className="text-amber-300" size={20} />
          </div>
          <p className="mt-4 text-3xl font-bold text-white">
            {draftCount}
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex flex-col gap-3 lg:flex-row">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Pesquisar artigos pelo título..."
              className="w-full rounded-xl border border-white/10 bg-[#101426] py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-violet-500/50"
            />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative">
              <Filter
                size={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              />

              <select
                value={status}
                onChange={(event) => setStatus(event.target.value)}
                className="w-full appearance-none rounded-xl border border-white/10 bg-[#101426] py-3 pl-9 pr-8 text-sm text-slate-300 outline-none focus:border-violet-500/50 sm:w-40"
              >
                <option value="all">Todos os status</option>
                <option value="published">Publicados</option>
                <option value="draft">Rascunhos</option>
              </select>
            </div>

            <select
              value={categoryId}
              onChange={(event) => setCategoryId(event.target.value)}
              className="rounded-xl border border-white/10 bg-[#101426] px-4 py-3 text-sm text-slate-300 outline-none focus:border-violet-500/50"
            >
              <option value="all">Todas as categorias</option>

              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={loadData}
              disabled={loading}
              className="flex items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm text-slate-300 transition hover:bg-white/5 disabled:opacity-50"
            >
              <RefreshCw
                size={16}
                className={loading ? "animate-spin" : ""}
              />
              Atualizar
            </button>
          </div>
        </div>

        {error && (
          <div className="flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-300">
            <AlertCircle size={18} className="mt-0.5 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#101426]">
          {loading ? (
            <div className="flex min-h-64 items-center justify-center">
              <RefreshCw
                size={28}
                className="animate-spin text-violet-400"
              />
            </div>
          ) : articles.length === 0 ? (
            <div className="flex min-h-72 flex-col items-center justify-center px-6 text-center">
              <div className="rounded-2xl bg-violet-500/10 p-4">
                <FileText size={30} className="text-violet-300" />
              </div>

              <h2 className="mt-5 font-semibold text-white">
                Nenhum artigo encontrado
              </h2>

              <p className="mt-2 max-w-sm text-sm text-slate-500">
                Não encontramos publicações com os filtros selecionados.
                Seus artigos aparecerão aqui.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-left">
                <thead>
                  <tr className="border-b border-white/[0.08] text-xs uppercase tracking-wider text-slate-500">
                    <th className="px-6 py-4 font-medium">Artigo</th>
                    <th className="px-6 py-4 font-medium">Categoria</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                    <th className="px-6 py-4 font-medium">Data</th>
                    <th className="px-6 py-4 text-right font-medium">
                      Ações
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-white/[0.06]">
                  {articles.map((article) => (
                    <tr
                      key={article.id}
                      className="transition hover:bg-white/[0.02]"
                    >
                      <td className="max-w-sm px-6 py-5">
                        <p className="truncate font-medium text-white">
                          {article.title}
                        </p>
                        <p className="mt-1 truncate text-xs text-slate-500">
                          /artigos/{article.slug}
                        </p>
                      </td>

                      <td className="px-6 py-5">
                        <span className="text-sm text-slate-400">
                          {article.category?.name || "Sem categoria"}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        <ArticleStatusBadge status={article.status} />
                      </td>

                      <td className="px-6 py-5">
                        <span className="flex items-center gap-2 text-xs text-slate-500">
                          <CalendarDays size={14} />
                          {formatPublicationDate(
                            article.published_at || article.created_at
                          )}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            disabled={actionId === article.id}
                            onClick={() =>
                              navigate(
                                `/admin/artigos/${article.id}/editar`
                              )
                            }
                            title="Editar artigo"
                            className="rounded-lg border border-white/10 p-2 text-slate-400 transition hover:border-violet-500/30 hover:bg-violet-500/10 hover:text-violet-300 disabled:opacity-40"
                          >
                            <Pencil size={17} />
                          </button>

                          <button
                            type="button"
                            disabled={actionId === article.id}
                            onClick={() => handleStatusChange(article)}
                            title={
                              article.status === "published"
                                ? "Despublicar artigo"
                                : "Publicar artigo"
                            }
                            className="rounded-lg border border-white/10 p-2 text-slate-400 transition hover:border-violet-500/30 hover:bg-violet-500/10 hover:text-violet-300 disabled:opacity-40"
                          >
                            {article.status === "published" ? (
                              <EyeOff size={17} />
                            ) : (
                              <Eye size={17} />
                            )}
                          </button>

                          <button
                            type="button"
                            disabled={actionId === article.id}
                            onClick={() => setArticleToDelete(article)}
                            title="Excluir artigo"
                            className="rounded-lg border border-white/10 p-2 text-slate-400 transition hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-300 disabled:opacity-40"
                          >
                            <Trash2 size={17} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <p className="text-xs text-slate-500">
          Exibindo {articles.length} artigo(s).
        </p>
      </section>

      {articleToDelete && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#101426] p-6 shadow-2xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10 text-red-300">
              <Trash2 size={22} />
            </div>

            <h2 className="mt-5 text-xl font-semibold text-white">
              Excluir artigo?
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              Você está prestes a excluir{" "}
              <strong className="text-white">
                {articleToDelete.title}
              </strong>
              . Essa ação não poderá ser desfeita.
            </p>

            <div className="mt-7 flex justify-end gap-3">
              <button
                type="button"
                disabled={actionId === articleToDelete.id}
                onClick={() => setArticleToDelete(null)}
                className="rounded-xl border border-white/10 px-4 py-2.5 text-sm text-slate-300 transition hover:bg-white/5"
              >
                Cancelar
              </button>

              <button
                type="button"
                disabled={actionId === articleToDelete.id}
                onClick={handleDelete}
                className="rounded-xl bg-red-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-400 disabled:opacity-50"
              >
                {actionId === articleToDelete.id
                  ? "Excluindo..."
                  : "Excluir artigo"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}