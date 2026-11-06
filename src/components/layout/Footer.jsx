import { Link } from "react-router-dom";

function GithubIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.53v-1.86c-3.1.67-3.75-1.32-3.75-1.32-.5-1.28-1.23-1.62-1.23-1.62-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15.99 1.7 2.6 1.21 3.23.92.1-.72.39-1.21.71-1.49-2.48-.28-5.09-1.24-5.09-5.51 0-1.22.44-2.21 1.15-2.99-.12-.28-.5-1.42.11-2.95 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.56 0c2.11-1.44 3.04-1.14 3.04-1.14.61 1.53.23 2.67.12 2.95.72.78 1.14 1.77 1.14 2.99 0 4.28-2.61 5.22-5.1 5.5.4.35.76 1.02.76 2.06V22c0 .29.2.64.77.53A11.1 11.1 0 0 0 12 .9Z" />
    </svg>
  );
}

function LinkedinIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96c0 .84.69 1.52 1.55 1.52h16.9c.86 0 1.55-.68 1.55-1.52V3.52c0-.84-.69-1.52-1.55-1.52ZM7.93 18.6H4.97V9.06h2.96v9.54ZM6.45 7.76a1.72 1.72 0 1 1 0-3.44 1.72 1.72 0 0 1 0 3.44Zm12.15 10.84h-2.95v-4.64c0-1.1-.02-2.52-1.54-2.52-1.54 0-1.78 1.2-1.78 2.44v4.72H9.38V9.06h2.83v1.3h.04c.39-.75 1.36-1.54 2.8-1.54 2.99 0 3.55 1.97 3.55 4.53v5.25Z" />
    </svg>
  );
}

function InstagramIcon({ size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function CodeIcon({ size = 15 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m8 17-5-5 5-5" />
      <path d="m16 7 5 5-5 5" />
      <path d="m14 4-4 16" />
    </svg>
  );
}

function ArrowUpRightIcon({ size = 13 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17 17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-[#070914]">
      <div className="section-container py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link to="/" className="group inline-flex flex-col">
              <span className="text-2xl font-bold tracking-tight text-white transition group-hover:tracking-wide">
                José <span className="text-violet-400">Filho</span>
              </span>

              <span className="mt-1 text-[10px] uppercase tracking-[0.3em] text-slate-500">
                My Multiverse
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-400">
              Um espaço pessoal onde compartilho ideias, opiniões, descobertas
              e tudo aquilo que faz parte do meu universo.
            </p>

            <div className="mt-6 flex gap-3">
              <a
                href="https://github.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="rounded-lg border border-white/10 p-3 text-slate-400 transition duration-300 hover:-translate-y-1 hover:border-violet-500 hover:bg-violet-500/10 hover:text-white"
              >
                <GithubIcon size={18} />
              </a>

              <a
                href="https://linkedin.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="rounded-lg border border-white/10 p-3 text-slate-400 transition duration-300 hover:-translate-y-1 hover:border-violet-500 hover:bg-violet-500/10 hover:text-white"
              >
                <LinkedinIcon size={18} />
              </a>

              <a
                href="https://instagram.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="rounded-lg border border-white/10 p-3 text-slate-400 transition duration-300 hover:-translate-y-1 hover:border-violet-500 hover:bg-violet-500/10 hover:text-white"
              >
                <InstagramIcon size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white">Explorar</h3>

            <div className="mt-5 flex flex-col gap-3 text-sm text-slate-400">
              <Link to="/" className="transition hover:translate-x-1 hover:text-violet-400">Início</Link>
              <Link to="/artigos" className="transition hover:translate-x-1 hover:text-violet-400">Artigos</Link>
              <Link to="/recomendacoes" className="transition hover:translate-x-1 hover:text-violet-400">Recomendações</Link>
              <Link to="/portfolio" className="transition hover:translate-x-1 hover:text-violet-400">Portfólio</Link>
              <Link to="/sobre" className="transition hover:translate-x-1 hover:text-violet-400">Sobre mim</Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white">O projeto</h3>

            <p className="mt-5 text-sm leading-relaxed text-slate-400">
              Desenvolvido com tecnologia, criatividade e uma boa dose de
              curiosidade.
            </p>

            <div className="mt-5 flex items-center gap-2 text-xs text-violet-400">
              <CodeIcon size={15} />
              Built with passion
              <ArrowUpRightIcon size={13} />
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col justify-between gap-3 border-t border-white/[0.08] pt-7 text-xs text-slate-500 sm:flex-row">
          <p>
            © {new Date().getFullYear()} José Filho. Todos os direitos reservados.
          </p>

          <p>Feito por José Filho.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;