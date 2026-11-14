import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  ShoppingBag,
  BriefcaseBusiness,
  Tags,
  MessageSquare,
  Settings,
  ArrowLeft,
  LogOut,
  Menu,
  X,
  ShieldCheck,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

const navigation = [
  {
    title: "Visão geral",
    icon: LayoutDashboard,
    path: "/admin",
    available: true,
  },
  {
    title: "Artigos",
    icon: FileText,
    path: "/admin/artigos",
    available: true,
  },
  {
    title: "Recomendações",
    icon: ShoppingBag,
    path: "/admin/recomendacoes",
  },
  {
    title: "Portfólio",
    icon: BriefcaseBusiness,
    path: "/admin/portfolio",
  },
  {
    title: "Categorias",
    icon: Tags,
    path: "/admin/categorias",
  },
  {
    title: "Comentários",
    icon: MessageSquare,
    path: "/admin/comentarios",
  },
  {
    title: "Configurações",
    icon: Settings,
    path: "/admin/configuracoes",
  },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();

  async function handleSignOut() {
    const { error } = await signOut();

    if (!error) {
      navigate("/login");
    }
  }

  return (
    <div className="min-h-screen bg-[#080b18] text-white">
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Fechar menu"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/70 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-white/[0.08] bg-[#0d1122] transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-20 items-center justify-between border-b border-white/[0.08] px-6">
          <div>
            <h1 className="text-xl font-bold tracking-tight">
              José <span className="text-violet-400">Filho</span>
            </h1>
            <p className="text-xs text-slate-500">My Multiverse</p>
          </div>

          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-2 text-slate-400 hover:bg-white/5 lg:hidden"
            aria-label="Fechar menu"
          >
            <X size={20} />
          </button>
        </div>

        <div className="border-b border-white/[0.08] p-5">
          <div className="flex items-center gap-3 rounded-xl border border-violet-500/15 bg-violet-500/[0.07] p-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/15 text-violet-300">
              <ShieldCheck size={21} />
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">
                {profile?.display_name || "Administrador"}
              </p>
              <p className="text-xs text-violet-300">
                Administrador
              </p>
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-5">
          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
            Gerenciamento
          </p>

          {navigation.map((item) => {
            const Icon = item.icon;

            if (!item.available) {
              return (
                <div
                  key={item.path}
                  className="flex cursor-not-allowed items-center justify-between rounded-xl px-3 py-3 text-sm text-slate-600"
                  title="Funcionalidade em desenvolvimento"
                >
                  <span className="flex items-center gap-3">
                    <Icon size={18} />
                    {item.title}
                  </span>

                  <span className="text-[9px] uppercase tracking-wider">
                    Em breve
                  </span>
                </div>
              );
            }

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/admin"}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                    isActive
                      ? "border border-violet-500/20 bg-violet-500/10 text-violet-300"
                      : "text-slate-400 hover:bg-white/[0.04] hover:text-white"
                  }`
                }
              >
                <Icon size={18} />
                {item.title}
              </NavLink>
            );
          })}
        </nav>

        <div className="space-y-2 border-t border-white/[0.08] p-4">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-400 transition hover:bg-white/[0.04] hover:text-white"
          >
            <ArrowLeft size={18} />
            Voltar ao site
          </button>

          <button
            type="button"
            onClick={handleSignOut}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-red-400 transition hover:bg-red-500/10"
          >
            <LogOut size={18} />
            Sair da conta
          </button>
        </div>
      </aside>

      <div className="min-h-screen lg:pl-72">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-white/[0.08] bg-[#080b18]/90 px-5 backdrop-blur-xl sm:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg border border-white/10 p-2 text-slate-300 hover:bg-white/5 lg:hidden"
              aria-label="Abrir menu"
            >
              <Menu size={20} />
            </button>

            <div>
              <p className="text-sm font-semibold text-white">
                Painel administrativo
              </p>
              <p className="hidden text-xs text-slate-500 sm:block">
                Gerencie seu universo digital
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/[0.07] px-3 py-2">
            <ShieldCheck
              size={15}
              className="text-violet-300"
            />
            <span className="text-xs font-medium text-violet-300">
              Administrador
            </span>
          </div>
        </header>

        <main className="mx-auto w-full max-w-[1600px] p-5 sm:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}