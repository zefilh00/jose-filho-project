import { Link } from "react-router-dom";
import { ArrowLeft, Sparkles } from "lucide-react";

export default function AuthLayout({
  children,
  title,
  subtitle,
  footerText,
  footerLink,
  footerLinkText,
}) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#080b18] px-4 py-12 text-white">
      <div className="absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-violet-600/15 blur-[130px]" />
      <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-blue-600/10 blur-[130px]" />

      <div className="relative z-10 w-full max-w-md">
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-violet-300"
        >
          <ArrowLeft size={16} />
          Voltar para o início
        </Link>

        <div className="rounded-3xl border border-white/10 bg-[#101426]/90 p-7 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-9">
          <Link to="/" className="mb-8 inline-flex flex-col">
            <span className="text-2xl font-bold tracking-tight">
              José <span className="text-violet-400">Filho</span>
            </span>
            <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-slate-500">
              My Multiverse
            </span>
          </Link>

          <div className="mb-7">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/10">
              <Sparkles size={21} className="text-violet-300" />
            </div>

            <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">
              {subtitle}
            </p>
          </div>

          {children}

          <div className="mt-7 border-t border-white/10 pt-6 text-center text-sm text-slate-400">
            {footerText}{" "}
            <Link
              to={footerLink}
              className="font-semibold text-violet-400 transition hover:text-violet-300"
            >
              {footerLinkText}
            </Link>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-slate-600">
          © {new Date().getFullYear()} José Filho · My Multiverse
        </p>
      </div>
    </main>
  );
}
