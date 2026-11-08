import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, UserRound, RefreshCw } from "lucide-react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ProfileAvatar from "../components/profile/ProfileAvatar";
import ProfileForm from "../components/profile/ProfileForm";
import PasswordForm from "../components/profile/PasswordForm";
import ProfileSection from "../components/profile/ProfileSection";
import MyComments from "../components/profile/MyComments";
import { useAuth } from "../hooks/useAuth";

export default function Profile() {
  const navigate = useNavigate();

  const {
    profile,
    loading,
    profileLoading,
    signOut,
    refreshProfile,
  } = useAuth();

  const [signingOut, setSigningOut] = useState(false);

  async function handleSignOut() {
    setSigningOut(true);

    const { error } = await signOut();

    if (error) {
      console.error("Erro ao sair:", error);
      setSigningOut(false);
      return;
    }

    navigate("/", { replace: true });
  }

  if (loading || profileLoading || !profile) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#080b18] text-white">
        <div className="text-center">
          {profileLoading || loading ? (
            <>
              <div className="mx-auto mb-4 h-9 w-9 animate-spin rounded-full border-2 border-violet-500/20 border-t-violet-500" />
              <p className="text-sm text-slate-400">
                Carregando seu perfil...
              </p>
            </>
          ) : (
            <>
              <p className="mb-4 text-slate-400">
                Não foi possível carregar seu perfil.
              </p>

              <button
                onClick={refreshProfile}
                className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-5 py-3 text-sm font-semibold text-white hover:bg-violet-500"
              >
                <RefreshCw size={16} />
                Tentar novamente
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080b18] text-white">
      <Header />

      <main className="section-container pb-20 pt-8 sm:pt-10">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <span className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-violet-400">
                <UserRound size={16} />
                Minha conta
              </span>

              <h1 className="text-3xl font-bold text-white md:text-4xl">
                Meu perfil
              </h1>

              <p className="mt-2 text-slate-400">
                Gerencie suas informações e configurações.
              </p>
            </div>

            <button
              onClick={handleSignOut}
              disabled={signingOut}
              className="flex items-center justify-center gap-2 self-start rounded-xl border border-red-500/20 px-5 py-3 text-sm font-medium text-red-400 transition hover:bg-red-500/10 disabled:opacity-50 sm:self-auto"
            >
              <LogOut size={17} />
              {signingOut ? "Saindo..." : "Sair da conta"}
            </button>
          </div>

          <div className="space-y-6">
            <ProfileSection
              title="Foto de perfil"
              description="Escolha uma imagem para representar sua conta."
            >
              <ProfileAvatar />
            </ProfileSection>

            <ProfileSection
              title="Informações pessoais"
              description="Atualize seu nome de exibição e consulte seu e-mail."
            >
              <ProfileForm />
            </ProfileSection>

            <ProfileSection
              title="Segurança"
              description="Mantenha sua conta protegida utilizando uma senha segura."
            >
              <PasswordForm />
            </ProfileSection>

            <ProfileSection
              title="Meus comentários"
              description="Gerencie seus comentários publicados."
            >
              <MyComments />
            </ProfileSection>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}