import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoaderCircle, UserPlus } from "lucide-react";
import AuthInput from "./AuthInput";
import { useAuth } from "../../hooks/useAuth";
import { validateRegister, getAuthErrorMessage, } from "../../utils/authValidation";

export default function RegisterForm() {
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const [form, setForm] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const validationError = validateRegister(form);

    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    setSuccess("");
    setLoading(true);

    const { data, error: authError } = await signUp({
      displayName: form.displayName.trim(),
      email: form.email.trim(),
      password: form.password,
    });

    setLoading(false);

    if (authError) {
      setError(getAuthErrorMessage(authError));
      return;
    }

    if (data?.session) {
      navigate("/");
      return;
    }

    setSuccess(
      "Conta criada! Verifique seu e-mail para confirmar o cadastro antes de entrar."
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <AuthInput
        label="Nome de exibição"
        name="displayName"
        value={form.displayName}
        onChange={handleChange}
        placeholder="Como deseja ser chamado?"
        autoComplete="name"
      />

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
        placeholder="Mínimo de 8 caracteres"
        autoComplete="new-password"
        minLength={8}
      />

      <AuthInput
        label="Confirmar senha"
        name="confirmPassword"
        type="password"
        value={form.confirmPassword}
        onChange={handleChange}
        placeholder="Digite sua senha novamente"
        autoComplete="new-password"
        minLength={8}
      />

      {error && (
        <p
          role="alert"
          className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300"
        >
          {error}
        </p>
      )}

      {success && (
        <p
          role="status"
          className="rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm leading-relaxed text-green-300"
        >
          {success}
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
            Criando conta...
          </>
        ) : (
          <>
            <UserPlus size={18} />
            Criar minha conta
          </>
        )}
      </button>
    </form>
  );
}
