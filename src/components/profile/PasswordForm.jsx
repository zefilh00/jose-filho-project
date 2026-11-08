import { useState } from "react";
import { KeyRound, LoaderCircle } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

export default function PasswordForm() {
  const { updatePassword } = useAuth();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    setMessage("");
    setError("");

    if (password.length < 8) {
      setError("A senha precisa ter pelo menos 8 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    setLoading(true);

    try {
      const { error: updateError } = await updatePassword(password);

      if (updateError) {
        setError(updateError.message);
        return;
      }

      setPassword("");
      setConfirmPassword("");
      setMessage("Senha alterada com sucesso!");
    } catch (err) {
      console.error(err);
      setError("Não foi possível alterar sua senha.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-300">
          Nova senha
        </label>

        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          minLength={8}
          required
          autoComplete="new-password"
          className="w-full rounded-xl border border-white/10 bg-[#080b18] px-4 py-3 text-white outline-none transition focus:border-violet-500"
          placeholder="Digite sua nova senha"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-300">
          Confirmar nova senha
        </label>

        <input
          type="password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          minLength={8}
          required
          autoComplete="new-password"
          className="w-full rounded-xl border border-white/10 bg-[#080b18] px-4 py-3 text-white outline-none transition focus:border-violet-500"
          placeholder="Repita sua nova senha"
        />
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
        className="flex items-center justify-center gap-2 rounded-xl border border-violet-500/30 bg-violet-500/10 px-6 py-3 font-semibold text-violet-300 transition hover:bg-violet-500/20 disabled:opacity-60"
      >
        {loading ? (
          <LoaderCircle size={18} className="animate-spin" />
        ) : (
          <KeyRound size={18} />
        )}

        Alterar senha
      </button>
    </form>
  );
}
