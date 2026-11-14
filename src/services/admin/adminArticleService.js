import { supabase } from "../../lib/supabase.js";

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
      categories.find((category) => category.id === article.category_id) ??
      null,
  }));
}

export async function updateArticleStatus(articleId, status) {
  const updates = {
    status,
    published_at: status === "published" ? new Date().toISOString() : null,
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
  const { error } = await supabase
    .from("articles")
    .delete()
    .eq("id", articleId);

  if (error) throw error;
}