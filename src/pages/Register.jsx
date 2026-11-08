import AuthLayout from "../components/auth/AuthLayout";
import RegisterForm from "../components/auth/RegisterForm";

export default function Register() {
  return (
    <AuthLayout
      title="Faça parte do universo."
      subtitle="Crie sua conta para participar das conversas e compartilhar suas opiniões."
      footerText="Já possui uma conta?"
      footerLink="/login"
      footerLinkText="Entrar"
    >
      <RegisterForm />
    </AuthLayout>
  );
}
