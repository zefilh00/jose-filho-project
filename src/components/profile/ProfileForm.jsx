import { useState } from "react";
import { LoaderCircle, Save } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

export default function ProfileForm() {
  const { profile, user, updateProfile } = useAuth();

  const [displayName, setDisplayName] = useState(
    profile?.display_name ?? ""
  );

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    setMessage("");
    setError("");

    const trimmedName = displayName.trim();

    if (!trimmedName) {
      setError("O nome de exibição não pode ficar vazio.");
      return;
    }

    setLoading(true);

    try {
      const { error: updateError } = await updateProfile({
        display_name: trimmedName,
      });

      if (updateError) {
        setError("Não foi possível atualizar seu nome.");
        return;
      }

      setMessage("Nome atualizado com sucesso!");
    } catch (err) {
      console.error(err);
      setError("Ocorreu um erro ao atualizar seus dados.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-300">
          Nome de exibição
        </label>

        <input
          type="text"
          value={displayName}
          onChange={(event) => setDisplayName(event.target.value)}
          maxLength={60}
          required
          className="w-full rounded-xl border border-white/10 bg-[#080b18] px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-violet-500"
          placeholder="Seu nome"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-300">
          E-mail
        </label>

        <input
          type="email"
          value={user?.email ?? ""}
          disabled
          className="w-full cursor-not-allowed rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-slate-500 outline-none"
        />

        <p className="mt-2 text-xs text-slate-500">
          O e-mail utilizado para entrar na sua conta.
        </p>
      </div>

      {message && (
        <p className="text-sm text-emerald-400">{message}</p>
      )}

      {error && (
        <p className="text-sm text-red-400">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="shine-button flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-6 py-3 font-semibold text-white transition hover:brightness-110 disabled:opacity-60"
      >
        {loading ? (
          <LoaderCircle size={18} className="animate-spin" />
        ) : (
          <Save size={18} />
        )}

        Salvar alterações
      </button>
    </form>
  );
}
