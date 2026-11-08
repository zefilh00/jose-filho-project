export const COMMENT_LIMITS = {
  comment: 2000,
  reply: 1000,
};

export function getCommentLimit(parentCommentId) {
  return parentCommentId
    ? COMMENT_LIMITS.reply
    : COMMENT_LIMITS.comment;
}

export function countCharacters(value = "") {
  return Array.from(value).length;
}

export function validateComment(content, parentCommentId = null) {
  const cleanContent = content.trim();
  const limit = getCommentLimit(parentCommentId);
  const characterCount = countCharacters(cleanContent);

  if (!cleanContent) {
    return {
      valid: false,
      message: "O comentário não pode ficar vazio.",
    };
  }

  if (characterCount > limit) {
    return {
      valid: false,
      message: `O limite é de ${limit.toLocaleString("pt-BR")} caracteres.`,
    };
  }

  return {
    valid: true,
    content: cleanContent,
  };
}
