import { FileText, ShoppingBag, BriefcaseBusiness, MessageSquare, ArrowUpRight, Sparkles, } from "lucide-react";

const sections = [
  {
    title: "Artigos",
    description: "Publique ideias, opiniões e conteúdos.",
    icon: FileText,
    color: "text-violet-300",
    background: "bg-violet-500/10",
  },
  {
    title: "Recomendações",
    description: "Gerencie produtos e indicações.",
    icon: ShoppingBag,
    color: "text-blue-300",
    background: "bg-blue-500/10",
  },
  {
    title: "Portfólio",
    description: "Apresente seus projetos e trabalhos.",
    icon: BriefcaseBusiness,
    color: "text-fuchsia-300",
    background: "bg-fuchsia-500/10",
  },
  {
    title: "Comentários",
    description: "Acompanhe as interações dos visitantes.",
    icon: MessageSquare,
    color: "text-cyan-300",
    background: "bg-cyan-500/10",
  },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <section>
        <div className="flex flex-wrap items-center gap-2 text-sm text-violet-300">
          <Sparkles size={16} />
          Central de gerenciamento
        </div>

        <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Bem-vindo ao seu <span className="text-violet-400">painel.</span>
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
          Aqui você controla o conteúdo do José Filho — My Multiverse.
          Gerencie suas publicações, recomendações, projetos e interações.
        </p>
      </section>

      <section>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-white">
            Gerenciamento de conteúdo
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Escolha uma área para começar a administrar.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {sections.map((section) => {
            const Icon = section.icon;

            return (
              <div
                key={section.title}
                className="group rounded-2xl border border-white/[0.08] bg-[#101426] p-5 transition duration-300 hover:-translate-y-1 hover:border-violet-500/30 hover:shadow-xl hover:shadow-violet-950/10"
              >
                <div className="flex items-center justify-between">
                  <div className={`rounded-xl p-3 ${section.background}`}>
                    <Icon size={22} className={section.color} />
                  </div>

                  <ArrowUpRight
                    size={18}
                    className="text-slate-600 transition group-hover:text-violet-300"
                  />
                </div>

                <h3 className="mt-5 font-semibold text-white">
                  {section.title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  {section.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-500/10 via-[#101426] to-blue-500/[0.06] p-6 sm:p-8">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-300">
            My Multiverse
          </span>

          <h2 className="mt-3 text-2xl font-bold text-white">
            Seu universo, suas ideias, suas regras.
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-slate-400">
            Utilize este espaço para compartilhar seus pensamentos,
            apresentar seus projetos e recomendar aquilo que merece ser
            conhecido.
          </p>
        </div>
      </section>
    </div>
  );
}