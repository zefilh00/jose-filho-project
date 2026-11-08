import { supabase } from "../lib/supabase";
import { validateComment } from "../utils/commentValidation";

const COMMENTS_PAGE_SIZE = 10;

const COMMENT_SELECT = `
  id,
  author_id,
  article_id,
  product_id,
  parent_comment_id,
  content,
  status,
  created_at,
  updated_at,
  article:articles(title, slug),
  product:products(name, slug)
`;

export async function getMyComments(userId, from = 0) {
  if (!userId) {
    return {
      data: [],
      error: new Error("Usuário não autenticado."),
    };
  }

  return supabase
    .from("comments")
    .select(COMMENT_SELECT)
    .eq("author_id", userId)
    .order("created_at", { ascending: false })
    .range(from, from + COMMENTS_PAGE_SIZE - 1);
}

export async function updateMyComment(
  userId,
  commentId,
  content,
  parentCommentId = null
) {
  if (!userId || !commentId) {
    return {
      data: null,
      error: new Error("Comentário inválido."),
    };
  }

  const validation = validateComment(content, parentCommentId);

  if (!validation.valid) {
    return {
      data: null,
      error: new Error(validation.message),
    };
  }

  const { data, error } = await supabase
    .from("comments")
    .update({
      content: validation.content,
    })
    .eq("id", commentId)
    .eq("author_id", userId)
    .select("id, author_id, content, status, updated_at")
    .maybeSingle();

  if (!error && !data) {
    return {
      data: null,
      error: new Error(
        "Comentário não encontrado ou você não tem permissão para editá-lo."
      ),
    };
  }

  return { data, error };
}

export async function deleteMyComment(userId, commentId) {
  if (!userId || !commentId) {
    return {
      data: null,
      error: new Error("Comentário inválido."),
    };
  }

  const { data, error } = await supabase
    .from("comments")
    .delete()
    .eq("id", commentId)
    .eq("author_id", userId)
    .select("id")
    .maybeSingle();

  if (!error && !data) {
    return {
      data: null,
      error: new Error(
        "Comentário não encontrado ou você não tem permissão para excluí-lo."
      ),
    };
  }

  return { data, error };
}