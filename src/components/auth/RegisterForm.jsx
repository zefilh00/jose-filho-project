import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoaderCircle, UserPlus } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import AuthInput from "./AuthInput";
import { validateRegister, getAuthErrorMessage } from "../../utils/authValidation";

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
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    const validationError = validateRegister(form);

    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      const { data, error: signUpError } = await signUp({
        displayName: form.displayName.trim(),
        email: form.email.trim(),
        password: form.password,
      });

      if (signUpError) {
        setError(getAuthErrorMessage(signUpError));
        return;
      }

      if (data?.session) {
        navigate("/", { replace: true });
        return;
      }

      setError(
        "A conta foi criada, mas não recebemos uma sessão de acesso. Verifique a configuração de confirmação de e-mail no Supabase."
      );
    } catch (err) {
      console.error("Erro ao cadastrar:", err);
      setError("Ocorreu um erro inesperado. Tente novamente.");
    } finally {
      setLoading(false);
    }
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
        required
      />

      <AuthInput
        label="E-mail"
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        placeholder="seu@email.com"
        autoComplete="email"
        required
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
        required
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
        required
      />

      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="shine-button flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-6 py-4 font-semibold text-white transition-all hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? (
          <>
            <LoaderCircle className="h-5 w-5 animate-spin" />
            Criando conta...
          </>
        ) : (
          <>
            <UserPlus className="h-5 w-5" />
            Criar minha conta
          </>
        )}
      </button>
    </form>
  );
}