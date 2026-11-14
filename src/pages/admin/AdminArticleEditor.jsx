import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  Save,
  Send,
  ImagePlus,
  X,
  LoaderCircle,
  AlertCircle,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { getCategories } from "../../services/categoryService.js";
import { getAdminArticleById, saveAdminArticle, uploadArticleImage, } from "../../services/admin/adminArticleService.js";
import { getStoragePublicUrl } from "../../utils/contentUtils.js";
import ArticleMarkdownEditor from "../../components/admin/articles/ArticleMarkdownEditor";

const COVER_BUCKET = "article-covers";

export default function AdminArticleEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, profile } = useAuth();

  const isEditing = Boolean(id);

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState([]);
  const [coverFile, setCoverFile] = useState(null);
  const [currentCoverPath, setCurrentCoverPath] = useState(null);
  const [coverPreview, setCoverPreview] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const authorName =
    profile?.display_name ||
    user?.user_metadata?.display_name ||
    "José Filho";

  const localCoverPreview = useMemo(() => {
    if (!coverFile) return "";

    return URL.createObjectURL(coverFile);
  }, [coverFile]);

  useEffect(() => {
    return () => {
      if (localCoverPreview) {
        URL.revokeObjectURL(localCoverPreview);
      }
    };
  }, [localCoverPreview]);

  useEffect(() => {
    async function loadEditor() {
      setLoading(true);
      setError("");

      try {
        const categoryData = await getCategories("article");
        setCategories(categoryData ?? []);

        if (id) {
          const article = await getAdminArticleById(id);

          setTitle(article.title ?? "");
          setExcerpt(article.excerpt ?? "");
          setCategoryId(article.category_id ?? "");
          setContent(article.content ?? "");
          setCurrentCoverPath(article.cover_image_path ?? null);
          setCoverPreview(
            article.cover_image_path
              ? getStoragePublicUrl(
                  COVER_BUCKET,
                  article.cover_image_path
                )
              : ""
          );
        }
      } catch (err) {
        console.error("Erro ao carregar editor:", err);
        setError(
          err.message || "Não foi possível carregar o editor."
        );
      } finally {
        setLoading(false);
      }
    }

    loadEditor();
  }, [id]);

  function handleCoverChange(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Selecione um arquivo de imagem válido.");
      event.target.value = "";
      return;
    }

    setError("");
    setCoverFile(file);
  }

  function removeCover() {
    setCoverFile(null);
    setCoverPreview(
      currentCoverPath
        ? getStoragePublicUrl(COVER_BUCKET, currentCoverPath)
        : ""
    );
  }

  async function handleInlineImageUpload(file) {
    return await uploadArticleImage(file, "article-content");
  }

  async function handleSave(status) {
    setError("");

    if (!title.trim()) {
      setError("Informe o título do artigo.");
      return;
    }

    if (!excerpt.trim()) {
      setError("Informe o resumo do artigo.");
      return;
    }

    if (!categoryId) {
      setError("Selecione uma categoria.");
      return;
    }

    if (
      status === "published" &&
      !coverFile &&
      !currentCoverPath
    ) {
      setError("Adicione uma imagem de capa antes de publicar.");
      return;
    }

    setSaving(true);

    try {
      const article = await saveAdminArticle({
        articleId: id || null,
        authorId: user.id,
        title,
        excerpt,
        categoryId,
        content,
        status,
        coverFile,
      });

      navigate("/admin/artigos", {
        replace: true,
        state: {
          message:
            status === "published"
              ? "Artigo publicado com sucesso."
              : "Rascunho salvo com sucesso.",
        },
      });

      return article;
    } catch (err) {
      console.error("Erro ao salvar artigo:", err);
      setError(
        err.message || "Não foi possível salvar o artigo."
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <LoaderCircle
          size={30}
          className="animate-spin text-violet-400"
        />
      </div>
    );
  }

  if (error && isEditing && !title && !categories.length) {
    return (
      <div className="space-y-5">
        <Link
          to="/admin/artigos"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white"
        >
          <ArrowLeft size={16} />
          Voltar aos artigos
        </Link>

        <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-5 text-sm text-red-300">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <Link
            to="/admin/artigos"
            className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
          >
            <ArrowLeft size={16} />
            Voltar aos artigos
          </Link>

          <h1 className="mt-4 text-3xl font-bold text-white">
            {isEditing ? "Editar artigo" : "Novo artigo"}
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Prepare o conteúdo da sua próxima publicação.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            disabled={saving}
            onClick={() => handleSave("draft")}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/5 disabled:opacity-50"
          >
            {saving ? (
              <LoaderCircle size={17} className="animate-spin" />
            ) : (
              <Save size={17} />
            )}
            Salvar rascunho
          </button>

          <button
            type="button"
            disabled={saving}
            onClick={() => handleSave("published")}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-500 disabled:opacity-50"
          >
            {saving ? (
              <LoaderCircle size={17} className="animate-spin" />
            ) : (
              <Send size={17} />
            )}
            Publicar
          </button>
        </div>
      </div>

      {error && (
        <div className="flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-300">
          <AlertCircle size={18} className="mt-0.5 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      <section className="space-y-6 rounded-2xl border border-white/[0.08] bg-[#101426] p-5 sm:p-7">
        <div>
          <label
            htmlFor="article-title"
            className="mb-2 block text-sm font-medium text-slate-300"
          >
            Título do artigo
          </label>

          <input
            id="article-title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Digite o título da publicação"
            maxLength={180}
            className="w-full rounded-xl border border-white/10 bg-[#080b18] px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-violet-500/50"
          />
        </div>

        <div>
          <label
            htmlFor="article-excerpt"
            className="mb-2 block text-sm font-medium text-slate-300"
          >
            Resumo
          </label>

          <textarea
            id="article-excerpt"
            value={excerpt}
            onChange={(event) => setExcerpt(event.target.value)}
            placeholder="Escreva uma breve apresentação do artigo. Esse texto aparecerá nos cards."
            rows={3}
            maxLength={350}
            className="w-full resize-y rounded-xl border border-white/10 bg-[#080b18] px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-slate-600 focus:border-violet-500/50"
          />

          <p className="mt-1 text-right text-xs text-slate-500">
            {excerpt.length}/350
          </p>
        </div>

        <div>
          <label
            htmlFor="article-category"
            className="mb-2 block text-sm font-medium text-slate-300"
          >
            Categoria
          </label>

          <select
            id="article-category"
            value={categoryId}
            onChange={(event) => setCategoryId(event.target.value)}
            className="w-full rounded-xl border border-white/10 bg-[#080b18] px-4 py-3 text-sm text-white outline-none focus:border-violet-500/50"
          >
            <option value="">Selecione uma categoria</option>

            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <label className="block text-sm font-medium text-slate-300">
                Imagem principal
              </label>
              <p className="mt-1 text-xs text-slate-500">
                Essa imagem aparecerá no card e no início do artigo.
              </p>
            </div>

            {coverPreview && (
              <button
                type="button"
                onClick={removeCover}
                className="inline-flex items-center gap-1 text-xs text-red-300 hover:text-red-200"
              >
                <X size={14} />
                Remover
              </button>
            )}
          </div>

          {localCoverPreview || coverPreview ? (
            <div className="overflow-hidden rounded-xl border border-white/10">
              <img
                src={localCoverPreview || coverPreview}
                alt="Prévia da imagem de capa"
                className="max-h-[360px] w-full object-cover"
              />

              <label className="flex cursor-pointer items-center justify-center gap-2 border-t border-white/10 bg-[#080b18] px-4 py-3 text-sm text-slate-300 transition hover:bg-white/5">
                <ImagePlus size={17} />
                Alterar imagem
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleCoverChange}
                  className="hidden"
                />
              </label>
            </div>
          ) : (
            <label className="flex min-h-48 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-white/20 bg-[#080b18] px-5 text-center transition hover:border-violet-500/50 hover:bg-violet-500/[0.03]">
              <div className="rounded-xl bg-violet-500/10 p-3 text-violet-300">
                <ImagePlus size={25} />
              </div>

              <span className="mt-3 text-sm font-medium text-slate-300">
                Escolher imagem de capa
              </span>

              <span className="mt-1 text-xs text-slate-500">
                Selecione uma imagem do seu dispositivo
              </span>

              <input
                type="file"
                accept="image/*"
                onChange={handleCoverChange}
                className="hidden"
              />
            </label>
          )}
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-white">
            Conteúdo do artigo
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Escreva o texto e adicione imagens nos pontos desejados.
          </p>
        </div>

        <ArticleMarkdownEditor
          value={content}
          onChange={setContent}
          onUploadImage={handleInlineImageUpload}
          previewData={{
            title,
            excerpt,
            category:
              categories.find(
                (category) => category.id === categoryId
              )?.name,
            coverImage: localCoverPreview || coverPreview,
            authorName,
          }}
        />
      </section>

      <div className="flex flex-col justify-between gap-4 border-t border-white/[0.08] pt-6 sm:flex-row sm:items-center">
        <p className="text-xs text-slate-500">
          Autor da publicação: {authorName}
        </p>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            disabled={saving}
            onClick={() => handleSave("draft")}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/5 disabled:opacity-50"
          >
            <Save size={17} />
            Salvar rascunho
          </button>

          <button
            type="button"
            disabled={saving}
            onClick={() => handleSave("published")}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-500 disabled:opacity-50"
          >
            <Send size={17} />
            Publicar artigo
          </button>
        </div>
      </div>
    </div>
  );
}