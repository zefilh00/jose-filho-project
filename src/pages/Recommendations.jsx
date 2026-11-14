import { useEffect, useState } from "react";
import { Search, ShoppingBag, RefreshCw } from "lucide-react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ProductGrid from "../components/products/ProductGrid";
import { getPublishedProducts } from "../services/productService.js";
import { getCategories } from "../services/categoryService.js";

export default function Recommendations() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reload, setReload] = useState(0);

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await getCategories("product");
        setCategories(data);
      } catch (err) {
        console.error("Erro ao carregar categorias:", err);
      }
    }

    loadCategories();
  }, []);

  useEffect(() => {
    let active = true;

    async function loadProducts() {
      setLoading(true);
      setError("");

      try {
        const data = await getPublishedProducts({
          categorySlug: selectedCategory || null,
          search,
          limit: 50,
        });

        if (active) setProducts(data);
      } catch (err) {
        console.error("Erro ao carregar recomendações:", err);

        if (active) {
          setError(
            "Não foi possível carregar as recomendações. Tente novamente."
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadProducts();

    return () => {
      active = false;
    };
  }, [selectedCategory, search, reload]);

  return (
    <div className="min-h-screen bg-[#080b18] text-white">
      <Header />

      <main className="section-container min-h-[70vh] px-4 pb-20 pt-8 sm:px-6 sm:pt-10">
        <section className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-xs font-medium text-blue-300">
            <ShoppingBag size={14} />
            PRODUTOS E TECNOLOGIAS
          </span>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Minhas <span className="text-gradient">Recomendações</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-400">
            Produtos, equipamentos e tecnologias que considero interessantes
            e que merecem sua atenção.
          </p>
        </section>

        <section className="mx-auto mt-12 max-w-6xl">
          <div className="relative">
            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Pesquisar recomendações..."
              className="w-full rounded-xl border border-white/10 bg-[#101426] py-4 pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500/50"
            />
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setSelectedCategory("")}
              className={`rounded-full border px-4 py-2 text-sm transition ${
                selectedCategory === ""
                  ? "border-blue-400/40 bg-blue-500/15 text-blue-300"
                  : "border-white/10 bg-white/[0.03] text-slate-400 hover:border-blue-400/30 hover:text-white"
              }`}
            >
              Todas
            </button>

            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => setSelectedCategory(category.slug)}
                className={`rounded-full border px-4 py-2 text-sm transition ${
                  selectedCategory === category.slug
                    ? "border-blue-400/40 bg-blue-500/15 text-blue-300"
                    : "border-white/10 bg-white/[0.03] text-slate-400 hover:border-blue-400/30 hover:text-white"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          <div className="mt-10">
            {loading ? (
              <div className="flex min-h-64 items-center justify-center">
                <RefreshCw
                  size={28}
                  className="animate-spin text-blue-400"
                />
              </div>
            ) : error ? (
              <div className="rounded-2xl border border-red-400/20 bg-red-500/5 px-6 py-12 text-center">
                <p className="text-sm text-red-300">{error}</p>

                <button
                  type="button"
                  onClick={() => setReload((current) => current + 1)}
                  className="mt-4 text-sm text-white underline underline-offset-4"
                >
                  Tentar novamente
                </button>
              </div>
            ) : products.length > 0 ? (
              <>
                <p className="mb-6 text-sm text-slate-500">
                  {products.length}{" "}
                  {products.length === 1
                    ? "recomendação encontrada"
                    : "recomendações encontradas"}
                </p>

                <ProductGrid products={products} />
              </>
            ) : (
              <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] px-6 py-16 text-center">
                <ShoppingBag
                  size={32}
                  className="mx-auto text-blue-400"
                />

                <h2 className="mt-4 text-lg font-semibold text-white">
                  Nenhuma recomendação encontrada
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Tente mudar a pesquisa ou selecionar outra categoria.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}