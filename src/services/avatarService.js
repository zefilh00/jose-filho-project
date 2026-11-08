import { supabase } from "../lib/supabase";

const BUCKET = "avatars";
const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

export function validateAvatar(file) {
  if (!file) {
    return "Selecione uma imagem.";
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return "Utilize uma imagem JPG, PNG ou WebP.";
  }

  if (file.size > MAX_FILE_SIZE) {
    return "A imagem deve ter no máximo 5 MB.";
  }

  return null;
}

export async function uploadAvatar(file, userId) {
  const validationError = validateAvatar(file);

  if (validationError) {
    return {
      data: null,
      error: new Error(validationError),
    };
  }

  const extension = file.type === "image/jpeg"
    ? "jpg"
    : file.type.split("/")[1];

  const filePath = `${userId}/${Date.now()}.${extension}`;

  const { data, error } = await supabase.storage
    .from(BUCKET)
    .upload(filePath, file, {
      contentType: file.type,
      upsert: false,
    });

  return { data, error };
}

export async function deleteAvatar(filePath) {
  if (!filePath) {
    return { error: null };
  }

  return await supabase.storage
    .from(BUCKET)
    .remove([filePath]);
}

export function getAvatarPublicUrl(filePath) {
  if (!filePath) {
    return null;
  }

  const { data } = supabase.storage
    .from(BUCKET)
    .getPublicUrl(filePath);

  return data.publicUrl;
}
