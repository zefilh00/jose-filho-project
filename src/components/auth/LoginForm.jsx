import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoaderCircle, LogIn } from "lucide-react";
import AuthInput from "./AuthInput";
import { useAuth } from "../../hooks/useAuth";
import { getAuthErrorMessage } from "../../utils/authValidation";

export default function LoginForm() {
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const { error: authError } = await signIn(form);

    setLoading(false);

    if (authError) {
      setError(getAuthErrorMessage(authError));
      return;
    }

    navigate("/");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <AuthInput
        label="E-mail"
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        placeholder="seu@email.com"
        autoComplete="email"
      />

      <AuthInput
        label="Senha"
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Digite sua senha"
        autoComplete="current-password"
      />

      {error && (
        <p
          role="alert"
          className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300"
        >
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="shine-button flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-5 py-4 text-sm font-semibold text-white shadow-lg shadow-violet-900/20 transition duration-300 hover:-translate-y-0.5 hover:shadow-violet-600/30 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? (
          <>
            <LoaderCircle size={18} className="animate-spin" />
            Entrando...
          </>
        ) : (
          <>
            <LogIn size={18} />
            Entrar na minha conta
          </>
        )}
      </button>
    </form>
  );
}
