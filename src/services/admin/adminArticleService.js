import { supabase } from "../../lib/supabase.js";
import {
  createSlug,
  getStoragePublicUrl,
} from "../../utils/contentUtils.js";

const COVER_BUCKET = "article-covers";
const CONTENT_BUCKET = "article-content";

function createFilePath(file) {
  const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
  return `${crypto.randomUUID()}.${extension}`;
}

function getMarkdownImagePaths(content = "") {
  const paths = [];
  const expression =
    /!\[[^\]]*\]\((https?:\/\/[^)\s]+)\)/g;

  for (const match of content.matchAll(expression)) {
    try {
      const url = new URL(match[1]);
      const marker = `/storage/v1/object/public/${CONTENT_BUCKET}/`;
      const index = url.pathname.indexOf(marker);

      if (index !== -1) {
        const path = decodeURIComponent(
          url.pathname.slice(index + marker.length)
        );

        if (path && !paths.includes(path)) {
          paths.push(path);
        }
      }
    } catch {
      continue;
    }
  }

  return paths;
}

export async function getAdminArticles({
  search = "",
  status = "all",
  categoryId = "all",
} = {}) {
  let query = supabase
    .from("articles")
    .select("*")
    .order("created_at", { ascending: false });

  if (search.trim()) {
    query = query.ilike("title", `%${search.trim()}%`);
  }

  if (status !== "all") {
    query = query.eq("status", status);
  }

  if (categoryId !== "all") {
    query = query.eq("category_id", categoryId);
  }

  const { data, error } = await query;

  if (error) throw error;
  if (!data?.length) return [];

  const categoryIds = [
    ...new Set(data.map((article) => article.category_id).filter(Boolean)),
  ];

  let categories = [];

  if (categoryIds.length) {
    const { data: categoryData, error: categoryError } = await supabase
      .from("categories")
      .select("id, name, slug")
      .in("id", categoryIds);

    if (categoryError) throw categoryError;

    categories = categoryData ?? [];
  }

  return data.map((article) => ({
    ...article,
    category:
      categories.find(
        (category) => category.id === article.category_id
      ) ?? null,
  }));
}

export async function getAdminArticleById(articleId) {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("id", articleId)
    .single();

  if (error) throw error;

  return {
    ...data,
    coverImage: getStoragePublicUrl(
      COVER_BUCKET,
      data.cover_image_path
    ),
  };
}

export async function uploadArticleImage(
  file,
  bucket = CONTENT_BUCKET
) {
  if (!file) {
    throw new Error("Selecione uma imagem.");
  }

  if (!file.type.startsWith("image/")) {
    throw new Error("O arquivo selecionado precisa ser uma imagem.");
  }

  const filePath = createFilePath(file);

  const { error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type,
    });

  if (error) throw error;

  return {
    path: filePath,
    url: getStoragePublicUrl(bucket, filePath),
  };
}

export async function saveAdminArticle({
  articleId = null,
  authorId,
  title,
  excerpt,
  categoryId,
  content,
  status,
  coverFile,
}) {
  if (!authorId) {
    throw new Error("Não foi possível identificar o autor.");
  }

  const cleanTitle = title.trim();

  if (!cleanTitle) {
    throw new Error("Informe o título do artigo.");
  }

  if (!excerpt.trim()) {
    throw new Error("Informe o resumo do artigo.");
  }

  if (!categoryId) {
    throw new Error("Selecione uma categoria.");
  }

  if (!["draft", "published"].includes(status)) {
    throw new Error("Status de publicação inválido.");
  }

  const existingArticle = articleId
    ? await getAdminArticleById(articleId)
    : null;

  let coverImagePath =
    existingArticle?.cover_image_path ?? null;

  let uploadedCoverPath = null;

  if (coverFile) {
    const uploadedCover = await uploadArticleImage(
      coverFile,
      COVER_BUCKET
    );

    coverImagePath = uploadedCover.path;
    uploadedCoverPath = uploadedCover.path;
  }

  if (status === "published" && !coverImagePath) {
    throw new Error(
      "Adicione uma imagem de capa antes de publicar."
    );
  }

  const publishedAt =
    status === "published"
      ? existingArticle?.published_at || new Date().toISOString()
      : null;

  const articleData = {
    author_id: existingArticle?.author_id ?? authorId,
    category_id: categoryId,
    title: cleanTitle,
    slug: createSlug(cleanTitle),
    excerpt: excerpt.trim(),
    content: content ?? "",
    cover_image_path: coverImagePath,
    status,
    published_at: publishedAt,
  };

  let result;

  if (articleId) {
    result = await supabase
      .from("articles")
      .update(articleData)
      .eq("id", articleId)
      .select()
      .single();
  } else {
    result = await supabase
      .from("articles")
      .insert(articleData)
      .select()
      .single();
  }

  if (result.error) {
    if (uploadedCoverPath) {
      await supabase.storage
        .from(COVER_BUCKET)
        .remove([uploadedCoverPath]);
    }

    throw result.error;
  }

  if (
    coverFile &&
    existingArticle?.cover_image_path &&
    existingArticle.cover_image_path !== coverImagePath
  ) {
    await supabase.storage
      .from(COVER_BUCKET)
      .remove([existingArticle.cover_image_path]);
  }

  return result.data;
}

export async function updateArticleStatus(articleId, status) {
  if (!["draft", "published"].includes(status)) {
    throw new Error("Status inválido.");
  }

  const { data: article, error: fetchError } = await supabase
    .from("articles")
    .select("published_at, cover_image_path")
    .eq("id", articleId)
    .single();

  if (fetchError) throw fetchError;

  if (status === "published" && !article.cover_image_path) {
    throw new Error(
      "Adicione uma imagem de capa antes de publicar."
    );
  }

  const updates = {
    status,
    published_at:
      status === "published"
        ? article.published_at || new Date().toISOString()
        : null,
  };

  const { data, error } = await supabase
    .from("articles")
    .update(updates)
    .eq("id", articleId)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function deleteArticle(articleId) {
  const { data: article, error: fetchError } = await supabase
    .from("articles")
    .select("id, cover_image_path, content")
    .eq("id", articleId)
    .single();

  if (fetchError) throw fetchError;

  const { data: images, error: imagesError } = await supabase
    .from("article_images")
    .select("image_path")
    .eq("article_id", articleId);

  if (imagesError) throw imagesError;

  const legacyPaths = (images ?? [])
    .map((image) => image.image_path)
    .filter(Boolean);

  const markdownPaths = getMarkdownImagePaths(article.content);

  const { error: deleteImagesError } = await supabase
    .from("article_images")
    .delete()
    .eq("article_id", articleId);

  if (deleteImagesError) throw deleteImagesError;

  const { error } = await supabase
    .from("articles")
    .delete()
    .eq("id", articleId);

  if (error) throw error;

  if (article.cover_image_path) {
    await supabase.storage
      .from(COVER_BUCKET)
      .remove([article.cover_image_path]);
  }

  const contentPaths = [
    ...new Set([...legacyPaths, ...markdownPaths]),
  ];

  if (contentPaths.length) {
    await supabase.storage
      .from(CONTENT_BUCKET)
      .remove(contentPaths);
  }
}