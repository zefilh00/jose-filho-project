import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, CalendarDays, ExternalLink, RefreshCw, } from "lucide-react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { getPublishedProductBySlug } from "../services/productService.js";
import { formatPrice, formatPublicationDate, } from "../utils/contentUtils.js";

export default function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [reload, setReload] = useState(0);

  useEffect(() => {
    let active = true;

    async function loadProduct() {
      setLoading(true);
      setError(false);

      try {
        const data = await getPublishedProductBySlug(slug);

        if (active) setProduct(data);
      } catch (err) {
        console.error("Erro ao carregar recomendação:", err);

        if (active) setError(true);
      } finally {
        if (active) setLoading(false);
      }
    }

    loadProduct();

    return () => {
      active = false;
    };
  }, [slug, reload]);

  return (
    <div className="min-h-screen bg-[#080b18] text-white">
      <Header />

      <main className="section-container min-h-[70vh] px-4 pb-20 pt-8 sm:px-6 sm:pt-10">
        <div className="mx-auto max-w-5xl">
          <Link
            to="/recomendacoes"
            className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-blue-300"
          >
            <ArrowLeft size={16} />
            Voltar às recomendações
          </Link>

          {loading ? (
            <div className="flex min-h-96 items-center justify-center">
              <RefreshCw
                size={28}
                className="animate-spin text-blue-400"
              />
            </div>
          ) : error ? (
            <div className="mt-12 rounded-2xl border border-red-400/20 bg-red-500/5 px-6 py-12 text-center">
              <h1 className="text-xl font-semibold text-white">
                Não foi possível carregar esta recomendação
              </h1>

              <button
                type="button"
                onClick={() => setReload((current) => current + 1)}
                className="mt-4 text-sm text-white underline underline-offset-4"
              >
                Tentar novamente
              </button>
            </div>
          ) : !product ? (
            <div className="mt-12 rounded-2xl border border-dashed border-white/10 bg-white/[0.02] px-6 py-16 text-center">
              <h1 className="text-xl font-semibold text-white">
                Recomendação não encontrada
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Este produto pode ter sido removido ou ainda não foi publicado.
              </p>
            </div>
          ) : (
            <article className="mt-10 grid gap-10 lg:grid-cols-2 lg:items-start">
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#101426]">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full object-cover"
                  />
                ) : (
                  <div className="flex aspect-square items-center justify-center text-slate-600">
                    Sem imagem
                  </div>
                )}
              </div>

              <div>
                {product.category?.name && (
                  <span className="inline-flex rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-xs font-medium text-blue-300">
                    {product.category.name}
                  </span>
                )}

                <h1 className="mt-6 text-3xl font-bold leading-tight text-white sm:text-4xl">
                  {product.name}
                </h1>

                {product.price !== null && product.price !== undefined && (
                  <p className="mt-5 text-2xl font-semibold text-blue-300">
                    {formatPrice(product.price)}
                  </p>
                )}

                {product.published_at && (
                  <div className="mt-5 flex items-center gap-2 text-sm text-slate-500">
                    <CalendarDays size={16} />
                    Publicado em{" "}
                    {formatPublicationDate(product.published_at)}
                  </div>
                )}

                <div className="mt-8 whitespace-pre-wrap text-base leading-8 text-slate-300">
                  {product.description}
                </div>

                {product.purchase_url && (
                  <a
                    href={product.purchase_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shine-button mt-8 inline-flex items-center gap-3 rounded-xl bg-blue-600 px-6 py-4 text-sm font-semibold text-white transition hover:bg-blue-500"
                  >
                    Conferir produto
                    <ExternalLink size={17} />
                  </a>
                )}
              </div>
            </article>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}