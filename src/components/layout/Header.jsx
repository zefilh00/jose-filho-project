import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, LogIn, UserPlus, UserRound } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { getProfileAvatar } from "../../utils/avatarUtils";
import logo from "../../assets/images/jf-logo-transparent.png";

const navigation = [
  { label: "Início", path: "/" },
  { label: "Artigos", path: "/artigos" },
  { label: "Recomendações", path: "/recomendacoes" },
  { label: "Portfólio", path: "/portfolio" },
  { label: "Sobre mim", path: "/sobre" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const location = useLocation();
  const { user, profile, loading } = useAuth();

  const avatarUrl = profile?.avatar_path
    ? getProfileAvatar(profile.avatar_path)
    : null;

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const navLinkClass = ({ isActive }) =>
    `nav-link relative py-2 text-sm font-medium transition-colors duration-300 ${
      isActive
        ? "text-violet-300"
        : "text-slate-400 hover:text-white"
    }`;

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-50 w-full border-b border-white/[0.07] bg-[#070b18]/90 backdrop-blur-xl">
        <div className="mx-auto flex min-h-[88px] max-w-7xl items-center justify-between px-5 lg:px-8">
          <Link
            to="/"
            aria-label="José Filho - Página inicial"
            className="group flex shrink-0 items-center gap-2.5"
          >
            <img
              src={logo}
              alt="Símbolo JF"
              className="h-12 w-12 object-contain transition duration-300 group-hover:scale-105 sm:h-14 sm:w-14"
            />

            <div className="flex flex-col">
              <span className="text-xl font-bold leading-tight tracking-tight text-white">
                José{" "}
                <span className="text-violet-400">Filho</span>
              </span>

              <span className="mt-1 text-[10px] font-medium tracking-[0.28em] text-slate-500">
                MY MULTIVERSE
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex xl:gap-9">
            {navigation.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                className={navLinkClass}
              >
                {({ isActive }) => (
                  <>
                    {item.label}

                    {isActive && (
                      <span className="absolute -bottom-2 left-0 h-0.5 w-full rounded-full bg-gradient-to-r from-blue-400 to-violet-500" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            {!loading &&
              (user ? (
                <Link
                  to="/perfil"
                  aria-label="Meu perfil"
                  title="Meu perfil"
                  className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-violet-400/40 bg-violet-500/10 text-violet-300 transition duration-300 hover:scale-105 hover:border-violet-300 hover:bg-violet-500/20"
                >
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt="Foto de perfil"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <UserRound size={23} />
                  )}
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:text-white"
                  >
                    <LogIn size={17} />
                    Entrar
                  </Link>

                  <Link
                    to="/cadastro"
                    className="shine-button flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5"
                  >
                    <UserPlus size={17} />
                    Criar conta
                  </Link>
                </>
              ))}
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((current) => !current)}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition hover:border-violet-400/30 hover:text-white lg:hidden"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        <div
          className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out lg:hidden ${
            menuOpen
              ? "grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <nav className="border-t border-white/[0.07] bg-[#070b18]/95 px-5 py-4">
              <div className="mx-auto flex max-w-7xl flex-col gap-1">
                {navigation.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === "/"}
                    className={({ isActive }) =>
                      `rounded-xl px-4 py-3 text-sm font-medium transition ${
                        isActive
                          ? "bg-violet-500/10 text-violet-300"
                          : "text-slate-400 hover:bg-white/5 hover:text-white"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}

                <div className="my-2 border-t border-white/[0.07]" />

                {!loading &&
                  (user ? (
                    <Link
                      to="/perfil"
                      className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-violet-300 transition hover:bg-violet-500/10"
                    >
                      {avatarUrl ? (
                        <img
                          src={avatarUrl}
                          alt=""
                          className="h-8 w-8 rounded-full border border-violet-400/30 object-cover"
                        />
                      ) : (
                        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-violet-400/30 bg-violet-500/10">
                          <UserRound size={17} />
                        </span>
                      )}

                      Meu perfil
                    </Link>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
                      >
                        <LogIn size={18} />
                        Entrar
                      </Link>

                      <Link
                        to="/cadastro"
                        className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-4 py-3 text-sm font-semibold text-white"
                      >
                        <UserPlus size={18} />
                        Criar conta
                      </Link>
                    </>
                  ))}
              </div>
            </nav>
          </div>
        </div>
      </header>

      <div className="h-[88px]" aria-hidden="true" />
    </>
  );
}
