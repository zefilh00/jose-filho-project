import { supabase } from "../lib/supabase.js";
import { getStoragePublicUrl } from "../utils/contentUtils.js";
import { getCategoryBySlug } from "./categoryService.js";

const ARTICLE_COVER_BUCKET = "article-covers";
const ARTICLE_CONTENT_BUCKET = "article-content";

function formatArticle(article, category, images = []) {
  return {
    ...article,
    category: category ?? null,
    coverImage: getStoragePublicUrl(
      ARTICLE_COVER_BUCKET,
      article.cover_image_path
    ),
    images: images.map((image) => ({
      ...image,
      url: getStoragePublicUrl(
        ARTICLE_CONTENT_BUCKET,
        image.image_path
      ),
    })),
  };
}

export async function getPublishedArticles({
  categorySlug = null,
  search = "",
  limit = 12,
  offset = 0,
} = {}) {
  let categoryId = null;

  if (categorySlug) {
    const category = await getCategoryBySlug(
      categorySlug,
      "article"
    );

    if (!category) return [];

    categoryId = category.id;
  }

  let query = supabase
    .from("articles")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (categoryId) {
    query = query.eq("category_id", categoryId);
  }

  if (search.trim()) {
    const term = search.trim().replace(/[,%()]/g, " ");

    query = query.or(
      `title.ilike.%${term}%,excerpt.ilike.%${term}%`
    );
  }

  const { data, error } = await query;

  if (error) throw error;

  if (!data?.length) return [];

  const categoryIds = [
    ...new Set(data.map((article) => article.category_id).filter(Boolean)),
  ];

  let categories = [];

  if (categoryIds.length) {
    const { data: categoryData, error: categoryError } =
      await supabase
        .from("categories")
        .select("id, name, slug, type")
        .in("id", categoryIds);

    if (categoryError) throw categoryError;

    categories = categoryData ?? [];
  }

  return data.map((article) => {
    const category = categories.find(
      (item) => item.id === article.category_id
    );

    return formatArticle(article, category);
  });
}

export async function getPublishedArticleBySlug(slug) {
  const { data: article, error } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error) throw error;

  if (!article) return null;

  const [categoryResult, imagesResult] = await Promise.all([
    article.category_id
      ? supabase
          .from("categories")
          .select("id, name, slug, type")
          .eq("id", article.category_id)
          .maybeSingle()
      : Promise.resolve({ data: null, error: null }),

    supabase
      .from("article_images")
      .select("id, image_path, alt_text, position")
      .eq("article_id", article.id)
      .order("position", { ascending: true }),
  ]);

  if (categoryResult.error) throw categoryResult.error;
  if (imagesResult.error) throw imagesResult.error;

  return formatArticle(
    article,
    categoryResult.data,
    imagesResult.data ?? []
  );
}