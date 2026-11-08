import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Code2, FileQuestion, Home, Construction, } from "lucide-react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

export default function PageStatus({
  type = "not-found",
  pageName = "Esta página",
}) {
  const location = useLocation();
  const navigate = useNavigate();

  const isDevelopment = type === "development";

  const content = isDevelopment
    ? {
        code: "EM BREVE",
        title: `${pageName} está em desenvolvimento.`,
        description:
          "Estamos trabalhando nesta parte do nosso multiverso. Em breve, você poderá explorar todas as funcionalidades desta página.",
        icon: Construction,
        label: "Projeto em construção",
      }
    : {
        code: "404",
        title: "Parece que você se perdeu no multiverso.",
        description:
          "A página que você está procurando não existe, foi removida ou o endereço foi digitado incorretamente.",
        icon: FileQuestion,
        label: "Página não encontrada",
      };

  const StatusIcon = content.icon;

  return (
    <div className="flex min-h-screen flex-col overflow-hidden bg-[#070b18] text-white">
      <Header />

      <main className="relative flex flex-1 items-center justify-center px-5 pb-20 pt-8 sm:pt-10">
        <div className="hero-orb pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-blue-600/10 blur-[100px]" />

        <div className="hero-orb-delay pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-violet-600/10 blur-[120px]" />

        <div className="relative z-10 mx-auto w-full max-w-3xl text-center">
          <div className="motion-enter mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-3xl border border-violet-400/20 bg-violet-500/10 shadow-[0_0_60px_rgba(139,92,246,0.12)]">
            <StatusIcon
              size={42}
              strokeWidth={1.5}
              className="text-violet-300"
            />
          </div>

          <span className="motion-enter motion-delay-1 inline-block bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-5xl font-black tracking-wider text-transparent sm:text-7xl md:text-8xl">
            {content.code}
          </span>

          <div className="motion-enter motion-delay-2 mt-6">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-violet-300">
              <Code2 size={14} />
              {content.label}
            </span>

            <h1 className="mx-auto max-w-2xl text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
              {content.title}
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-slate-400 sm:text-lg">
              {content.description}
            </p>
          </div>

          {!isDevelopment && (
            <div className="motion-enter motion-delay-2 mx-auto mt-8 max-w-md rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
              <span className="block text-xs uppercase tracking-wider text-slate-500">
                Endereço acessado
              </span>

              <span className="mt-1 block break-all font-mono text-sm text-slate-300">
                {location.pathname}
              </span>
            </div>
          )}

          <div className="motion-enter motion-delay-3 mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              to="/"
              className="shine-button inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-7 py-3.5 font-semibold text-white shadow-lg shadow-violet-900/20 transition hover:-translate-y-1 hover:shadow-violet-900/40"
            >
              <Home size={18} />
              Voltar para o início
              <ArrowRight size={17} />
            </Link>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-7 py-3.5 font-semibold text-slate-300 transition hover:-translate-y-1 hover:border-violet-400/30 hover:bg-white/10 hover:text-white"
            >
              <ArrowLeft size={18} />
              Voltar à página anterior
            </button>
          </div>

          <div className="motion-enter motion-delay-3 mt-16">
            <div className="mx-auto mb-4 h-px w-24 bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />

            <p className="text-sm font-semibold tracking-wide text-slate-400">
              José Filho
            </p>

            <p className="mt-1 text-xs tracking-[0.25em] text-slate-600">
              MY MULTIVERSE
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}