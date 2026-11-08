import { useEffect, useState } from "react";
import { Camera, LoaderCircle, UserRound } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { uploadAvatar, deleteAvatar, } from "../../services/avatarService";
import { getProfileAvatar, getInitials } from "../../utils/avatarUtils";

export default function ProfileAvatar() {
  const { user, profile, updateProfile } = useAuth();

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const avatarUrl = getProfileAvatar(profile?.avatar_path);

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  async function handleFileChange(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    setError("");
    setMessage("");

    const temporaryUrl = URL.createObjectURL(file);
    setPreview(temporaryUrl);
    setLoading(true);

    try {
      const { data, error: uploadError } = await uploadAvatar(
        file,
        user.id
      );

      if (uploadError) {
        setError(uploadError.message);
        setPreview(null);
        return;
      }

      const oldPath = profile?.avatar_path;

      const { error: updateError } = await updateProfile({
        avatar_path: data.path,
      });

      if (updateError) {
        await deleteAvatar(data.path);
        setError("Não foi possível atualizar sua foto no perfil.");
        setPreview(null);
        return;
      }

      if (oldPath) {
        const { error: deleteError } = await deleteAvatar(oldPath);

        if (deleteError) {
          console.error("Erro ao remover avatar antigo:", deleteError);
        }
      }

      setMessage("Foto de perfil atualizada!");
      setPreview(null);
    } catch (uploadError) {
      console.error("Erro ao enviar avatar:", uploadError);
      setError("Ocorreu um erro ao enviar sua foto.");
      setPreview(null);
    } finally {
      setLoading(false);
      event.target.value = "";
    }
  }

  const displayedImage = preview || avatarUrl;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <div className="flex h-36 w-36 items-center justify-center overflow-hidden rounded-full border-4 border-violet-500/30 bg-gradient-to-br from-blue-600 to-violet-700 shadow-xl shadow-violet-900/20">
          {displayedImage ? (
            <img
              src={displayedImage}
              alt="Foto de perfil"
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-4xl font-bold text-white">
              {profile?.display_name
                ? getInitials(profile.display_name)
                : <UserRound size={54} />}
            </span>
          )}
        </div>

        <label
          className={`absolute bottom-1 right-1 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border-4 border-[#080b18] bg-violet-600 text-white transition hover:bg-violet-500 ${
            loading ? "pointer-events-none opacity-60" : ""
          }`}
          title="Alterar foto"
        >
          {loading ? (
            <LoaderCircle size={19} className="animate-spin" />
          ) : (
            <Camera size={19} />
          )}

          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileChange}
            disabled={loading}
            className="hidden"
          />
        </label>
      </div>

      <p className="text-sm text-slate-400">
        JPG, PNG ou WebP · Máximo de 5 MB
      </p>

      {message && (
        <p className="text-sm text-emerald-400">{message}</p>
      )}

      {error && (
        <p className="text-center text-sm text-red-400">{error}</p>
      )}
    </div>
  );
}
