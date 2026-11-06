import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Cpu, Gamepad2, Music2, Landmark, Sparkles, UserRound, Layers3, } from "lucide-react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ArticleGrid from "../components/articles/ArticleGrid";
import ProductGrid from "../components/products/ProductGrid";

const categories = [
  {
    name: "Tecnologia",
    slug: "tecnologia",
    description: "Inovação, programação e o futuro digital.",
    shortDescription: "Tecnologia e inovação",
    icon: Cpu,
    color: "from-blue-500/20 to-cyan-500/5",
    iconColor: "text-blue-400",
    borderColor: "group-hover:border-blue-500/40",
    glowColor: "group-hover:shadow-blue-500/10",
  },
  {
    name: "Música",
    slug: "musica",
    description: "Álbuns, bandas e tudo que merece ser ouvido.",
    shortDescription: "Rock, metal e descobertas",
    icon: Music2,
    color: "from-purple-500/20 to-violet-500/5",
    iconColor: "text-purple-400",
    borderColor: "group-hover:border-purple-500/40",
    glowColor: "group-hover:shadow-purple-500/10",
  },
  {
    name: "Cultura Geek",
    slug: "mundo-geek",
    description: "Games, filmes, séries e cultura nerd.",
    shortDescription: "Games, filmes e séries",
    icon: Gamepad2,
    color: "from-violet-500/20 to-fuchsia-500/5",
    iconColor: "text-violet-400",
    borderColor: "group-hover:border-violet-500/40",
    glowColor: "group-hover:shadow-violet-500/10",
  },
  {
    name: "Política",
    slug: "politica",
    description: "Ideias, reflexões e diferentes perspectivas.",
    shortDescription: "Ideias e perspectivas",
    icon: Landmark,
    color: "from-indigo-500/20 to-blue-500/5",
    iconColor: "text-indigo-400",
    borderColor: "group-hover:border-indigo-500/40",
    glowColor: "group-hover:shadow-indigo-500/10",
  },
];

function Home() {
  const articles = [];
  const products = [];

  return (
    <div className="min-h-screen overflow-hidden bg-[#080b18] text-white">
      <Header />

      <main>
        <section className="hero-section relative flex min-h-[590px] items-center overflow-hidden pt-20 lg:min-h-[620px]">
          <div
            className="hero-background absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1607799279861-4dd421887fb3?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxM3A3fDA%3D')",
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#080b18] via-[#080b18]/90 to-[#080b18]/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080b18] via-transparent to-[#080b18]/50" />

          <div className="hero-orb absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-violet-600/15 blur-[130px]" />
          <div className="hero-orb hero-orb-delay absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-blue-600/10 blur-[130px]" />

          <div className="section-container relative z-10 py-20 sm:py-24">
            <div className="max-w-3xl">
              <div className="motion-enter mb-6 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-4 py-2 backdrop-blur-md">
                <Sparkles size={15} className="text-violet-300" />
                <span className="text-[10px] font-medium tracking-[0.12em] text-violet-200 sm:text-xs">
                  UM UNIVERSO DE IDEIAS, CONHECIMENTO E CRIATIVIDADE
                </span>
              </div>

              <p className="motion-enter motion-delay-1 mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-blue-300 sm:text-sm">
                Bem-vindo ao meu universo
              </p>

              <h1 className="motion-enter motion-delay-2 text-5xl font-bold leading-[1.08] tracking-tight sm:text-6xl lg:text-8xl">
                My
                <br />
                <span className="animated-gradient-text">
                  Multiverse.
                </span>
              </h1>

              <p className="motion-enter motion-delay-3 mt-6 max-w-xl text-base leading-relaxed text-slate-300 sm:mt-7 sm:text-lg">
                Um espaço onde tecnologia, música, política e cultura geek se
                encontram. Ideias, opiniões e descobertas compartilhadas sob
                uma perspectiva única: a minha.
              </p>

              <div className="motion-enter motion-delay-4 mt-8 flex flex-wrap gap-4">
                <Link
                  to="/artigos"
                  className="shine-button group inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-7 py-4 text-sm font-semibold text-white shadow-xl shadow-violet-950/30 transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-violet-600/25"
                >
                  Explorar artigos
                  <ArrowRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>

                <Link
                  to="/sobre"
                  className="group inline-flex items-center gap-3 rounded-xl border border-white/15 bg-white/[0.05] px-7 py-4 text-sm font-semibold text-white backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-violet-400/50 hover:bg-white/10"
                >
                  Conheça-me
                  <ArrowUpRight
                    size={17}
                    className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                  />
                </Link>
              </div>

              <div className="motion-enter motion-delay-5 mt-10 border-t border-white/10 pt-5">
                <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-500">
                  Explore por assunto
                </p>

                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {categories.map((category) => {
                    const Icon = category.icon;

                    return (
                      <Link
                        key={category.slug}
                        to={`/artigos?categoria=${category.slug}`}
                        className="group inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 py-2.5 text-xs text-slate-300 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-violet-400/40 hover:bg-violet-500/10 hover:text-white sm:px-4 sm:text-sm"
                      >
                        <Icon
                          size={16}
                          className={`${category.iconColor} transition-transform duration-300 group-hover:scale-110`}
                        />
                        {category.name}
                        <ArrowUpRight
                          size={13}
                          className="opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                        />
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />
        </section>

        <section className="section-container py-20 sm:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="motion-enter">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-violet-400">
                Muito além de um blog
              </span>

              <h2 className="mt-5 text-3xl font-bold leading-tight sm:text-4xl">
                Diferentes interesses.
                <br />
                <span className="text-gradient">
                  Um único universo.
                </span>
              </h2>

              <p className="mt-6 max-w-xl leading-relaxed text-slate-400">
                O My Multiverse nasceu da vontade de reunir diferentes
                interesses em um só lugar. Aqui compartilho pensamentos,
                experiências, opiniões e descobertas sobre assuntos que fazem
                parte do meu cotidiano.
              </p>

              <p className="mt-4 max-w-xl leading-relaxed text-slate-400">
                Não existe um único tema ou caminho. Existe curiosidade,
                personalidade e liberdade para explorar diferentes universos.
              </p>

              <Link
                to="/sobre"
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-violet-400 transition hover:gap-3 hover:text-violet-300"
              >
                Saiba mais sobre mim
                <ArrowRight size={17} />
              </Link>
            </div>

            <div className="motion-enter motion-delay-2 relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-blue-600/20 to-violet-600/20 blur-2xl" />

              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#101426] p-7 sm:p-10">
                <div className="mb-8 flex items-center justify-between">
                  <Layers3 size={28} className="text-violet-400" />
                  <span className="text-xs uppercase tracking-widest text-slate-500">
                    My Multiverse
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {categories.map((category, index) => {
                    const Icon = category.icon;

                    return (
                      <Link
                        key={category.slug}
                        to={`/artigos?categoria=${category.slug}`}
                        className={`interactive-card group rounded-2xl border border-white/[0.06] bg-gradient-to-br ${category.color} p-5`}
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <Icon
                          className={`${category.iconColor} mb-4 transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-6`}
                          size={25}
                        />

                        <h3 className="font-semibold text-white">
                          {category.name}
                        </h3>

                        <p className="mt-2 text-xs leading-relaxed text-slate-400">
                          {category.description}
                        </p>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-white/[0.06] bg-[#0c1021] py-20 sm:py-24">
          <div className="section-container">
            <div className="motion-enter mb-12">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-400">
                Explore os universos
              </span>

              <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
                Assuntos que me movem.
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-400">
                Diferentes temas, diferentes perspectivas e muito conteúdo
                para explorar.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {categories.map((category, index) => {
                const Icon = category.icon;

                return (
                  <Link
                    key={category.slug}
                    to={`/artigos?categoria=${category.slug}`}
                    className={`interactive-card group rounded-2xl border border-white/[0.08] bg-gradient-to-br ${category.color} p-6 shadow-lg shadow-black/10 ${category.borderColor} ${category.glowColor}`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="mb-7 flex items-center justify-between">
                      <div className="rounded-xl bg-black/20 p-3 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
                        <Icon size={24} className={category.iconColor} />
                      </div>

                      <ArrowUpRight
                        size={20}
                        className="text-slate-500 transition duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white"
                      />
                    </div>

                    <h3 className="text-lg font-semibold text-white">
                      {category.name}
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-slate-400">
                      {category.description}
                    </p>

                    <span className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-slate-400 transition group-hover:text-white">
                      Explorar assunto
                      <ArrowRight
                        size={14}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section-container py-20 sm:py-24">
          <div className="motion-enter mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-violet-400">
                Ideias e perspectivas
              </span>

              <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
                Últimos artigos
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-400">
                Pensamentos, opiniões e conteúdos sobre os assuntos que
                despertam minha curiosidade.
              </p>
            </div>

            <Link
              to="/artigos"
              className="inline-flex items-center gap-2 text-sm font-semibold text-violet-400 transition hover:gap-3 hover:text-violet-300"
            >
              Todos os artigos
              <ArrowRight size={17} />
            </Link>
          </div>

          <ArticleGrid articles={articles} />
        </section>

        <section className="border-y border-white/[0.06] bg-[#0c1021] py-20 sm:py-24">
          <div className="section-container">
            <div className="motion-enter mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-400">
                  Recomendações pessoais
                </span>

                <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
                  Vale a recomendação.
                </h2>

                <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-400">
                  Produtos, equipamentos e tecnologias que considero
                  interessantes e que merecem ser conhecidos.
                </p>
              </div>

              <Link
                to="/recomendacoes"
                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 transition hover:gap-3 hover:text-blue-300"
              >
                Todas as recomendações
                <ArrowRight size={17} />
              </Link>
            </div>

            <ProductGrid products={products} />
          </div>
        </section>

        <section className="section-container py-20 sm:py-24">
          <div className="interactive-card relative overflow-hidden rounded-3xl border border-violet-500/20 bg-gradient-to-br from-[#171538] via-[#11172f] to-[#0c1021] p-8 sm:p-12 lg:p-16">
            <div className="hero-orb absolute -right-20 -top-20 h-80 w-80 rounded-full bg-violet-600/15 blur-[100px]" />

            <div className="relative z-10 grid items-center gap-10 lg:grid-cols-[1fr_auto]">
              <div>
                <div className="mb-6 inline-flex items-center gap-2 text-violet-300">
                  <UserRound size={19} />
                  <span className="text-xs font-semibold uppercase tracking-[0.25em]">
                    Por trás do universo
                  </span>
                </div>

                <h2 className="max-w-2xl text-3xl font-bold leading-tight sm:text-4xl">
                  Prazer, sou José Filho.
                  <br />
                  <span className="text-gradient">
                    E esse é o meu multiverso.
                  </span>
                </h2>

                <p className="mt-6 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
                  Desenvolvedor em formação, apaixonado por tecnologia,
                  música, cultura geek e por explorar novas ideias. Criei
                  este espaço para compartilhar um pouco de tudo aquilo que
                  faz parte de quem sou.
                </p>

                <Link
                  to="/sobre"
                  className="shine-button mt-8 inline-flex items-center gap-3 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-[#111327] transition duration-300 hover:-translate-y-1 hover:bg-violet-100"
                >
                  Conheça minha história
                  <ArrowRight size={17} />
                </Link>
              </div>

              <div className="hidden lg:flex">
                <div className="floating-icon flex h-40 w-40 items-center justify-center rounded-full border border-violet-400/30 bg-violet-500/10 shadow-2xl shadow-violet-900/30">
                  <Sparkles size={65} className="text-violet-300" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Home;