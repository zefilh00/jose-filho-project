import { supabase } from "../lib/supabase.js";

export async function getCategories(type) {
  const { data, error } = await supabase
    .from("categories")
    .select("id, name, slug, type")
    .eq("type", type)
    .order("name", { ascending: true });

  if (error) throw error;

  return data ?? [];
}

export async function getCategoryBySlug(slug, type) {
  const { data, error } = await supabase
    .from("categories")
    .select("id, name, slug, type")
    .eq("slug", slug)
    .eq("type", type)
    .maybeSingle();

  if (error) throw error;

  return data;
}