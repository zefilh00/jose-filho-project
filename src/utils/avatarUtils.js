import { getAvatarPublicUrl } from "../services/avatarService";

export function getProfileAvatar(avatarPath) {
  return getAvatarPublicUrl(avatarPath);
}

export function getInitials(name) {
  if (!name) return "U";

  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}
