import { supabase } from "../lib/supabase.js";
import { getStoragePublicUrl } from "../utils/contentUtils.js";
import { getCategoryBySlug } from "./categoryService.js";

const PRODUCT_IMAGE_BUCKET = "product-images";

function formatProduct(product, category) {
  return {
    ...product,
    category: category ?? null,
    image: getStoragePublicUrl(
      PRODUCT_IMAGE_BUCKET,
      product.image_path
    ),
  };
}

export async function getPublishedProducts({
  categorySlug = null,
  search = "",
  limit = 12,
  offset = 0,
} = {}) {
  let categoryId = null;

  if (categorySlug) {
    const category = await getCategoryBySlug(
      categorySlug,
      "product"
    );

    if (!category) return [];

    categoryId = category.id;
  }

  let query = supabase
    .from("products")
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
      `name.ilike.%${term}%,description.ilike.%${term}%`
    );
  }

  const { data, error } = await query;

  if (error) throw error;

  if (!data?.length) return [];

  const categoryIds = [
    ...new Set(data.map((product) => product.category_id).filter(Boolean)),
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

  return data.map((product) => {
    const category = categories.find(
      (item) => item.id === product.category_id
    );

    return formatProduct(product, category);
  });
}

export async function getPublishedProductBySlug(slug) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error) throw error;

  if (!data) return null;

  let category = null;

  if (data.category_id) {
    const { data: categoryData, error: categoryError } =
      await supabase
        .from("categories")
        .select("id, name, slug, type")
        .eq("id", data.category_id)
        .maybeSingle();

    if (categoryError) throw categoryError;

    category = categoryData;
  }

  return formatProduct(data, category);
}