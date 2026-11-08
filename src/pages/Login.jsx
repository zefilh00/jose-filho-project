import AuthLayout from "../components/auth/AuthLayout";
import LoginForm from "../components/auth/LoginForm";

export default function Login() {
  return (
    <AuthLayout
      title="Bem-vindo de volta!"
      subtitle="Entre na sua conta e continue explorando o My Multiverse."
      footerText="Ainda não tem uma conta?"
      footerLink="/cadastro"
      footerLinkText="Criar conta"
    >
      <LoginForm />
    </AuthLayout>
  );
}
