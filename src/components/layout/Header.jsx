import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, LogIn, UserPlus } from "lucide-react";

const navigation = [
  { name: "Início", path: "/" },
  { name: "Artigos", path: "/artigos" },
  { name: "Recomendações", path: "/recomendacoes" },
  { name: "Portfólio", path: "/portfolio" },
  { name: "Sobre mim", path: "/sobre" },
];

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-white/[0.07] bg-[#080b18]/85 shadow-lg shadow-black/5 backdrop-blur-xl">
      <div className="section-container">
        <div className="flex h-20 items-center justify-between">
          <Link
            to="/"
            onClick={closeMenu}
            className="group flex flex-col"
            aria-label="José Filho - Página inicial"
          >
            <span className="text-xl font-bold tracking-tight text-white transition duration-300 group-hover:tracking-wide">
              José <span className="text-violet-400">Filho</span>
            </span>

            <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-slate-500 transition-colors group-hover:text-violet-300">
              My Multiverse
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {navigation.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `nav-link relative py-2 text-sm transition-colors duration-300 ${
                    isActive
                      ? "font-semibold text-violet-400"
                      : "text-slate-400 hover:text-white"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.name}
                    <span
                      className={`absolute bottom-0 left-0 h-0.5 rounded-full bg-gradient-to-r from-blue-400 to-violet-500 transition-all duration-300 ${
                        isActive ? "w-full" : "w-0"
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              to="/login"
              className="group flex items-center gap-2 rounded-lg px-4 py-2 text-sm text-slate-300 transition duration-300 hover:text-white"
            >
              <LogIn
                size={16}
                className="transition-transform duration-300 group-hover:-translate-x-1"
              />
              Entrar
            </Link>

            <Link
              to="/cadastro"
              className="shine-button flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-900/20 transition duration-300 hover:-translate-y-0.5 hover:shadow-violet-600/30"
            >
              <UserPlus size={16} />
              Criar conta
            </Link>
          </div>

          <button
            onClick={() => setMenuOpen((previous) => !previous)}
            className="rounded-lg border border-white/10 p-2 text-white transition duration-300 hover:border-violet-400/50 hover:bg-violet-500/10 lg:hidden"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>

        <div
          className={`grid transition-all duration-300 ease-in-out lg:hidden ${
            menuOpen
              ? "grid-rows-[1fr] opacity-100"
              : "pointer-events-none grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="border-t border-white/10 py-5">
              <nav className="flex flex-col gap-1">
                {navigation.map((item, index) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={closeMenu}
                    style={{ transitionDelay: menuOpen ? `${index * 35}ms` : "0ms" }}
                    className={({ isActive }) =>
                      `rounded-lg px-4 py-3 text-sm transition-all duration-300 ${
                        isActive
                          ? "bg-violet-500/10 font-semibold text-violet-400"
                          : "text-slate-300 hover:bg-white/5 hover:pl-6 hover:text-white"
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
              </nav>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="flex items-center justify-center gap-2 rounded-lg border border-white/10 py-3 text-center text-sm text-slate-300 transition hover:border-violet-400/40 hover:text-white"
                >
                  <LogIn size={16} />
                  Entrar
                </Link>

                <Link
                  to="/cadastro"
                  onClick={closeMenu}
                  className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 py-3 text-center text-sm font-semibold text-white transition hover:brightness-110"
                >
                  <UserPlus size={16} />
                  Criar conta
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;