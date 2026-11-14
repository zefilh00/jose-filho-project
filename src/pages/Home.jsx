import { useEffect, useState } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import HomeHero from "../components/home/HomeHero";
import HomeIntroduction from "../components/home/HomeIntroduction";
import HomeCategoryShowcase from "../components/home/HomeCategoryShowcase";
import HomeArticles from "../components/home/HomeArticles";
import HomeRecommendations from "../components/home/HomeRecommendations";
import HomeAboutCTA from "../components/home/HomeAboutCTA";
import { getPublishedArticles } from "../services/articleService.js";
import { getPublishedProducts } from "../services/productService.js";

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [products, setProducts] = useState([]);
  const [articlesLoading, setArticlesLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(true);
  const [articlesError, setArticlesError] = useState(false);
  const [productsError, setProductsError] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadHomeContent() {
      const [articlesResult, productsResult] = await Promise.allSettled([
        getPublishedArticles({ limit: 3 }),
        getPublishedProducts({ limit: 3 }),
      ]);

      if (!active) return;

      if (articlesResult.status === "fulfilled") {
        setArticles(articlesResult.value);
      } else {
        console.error(
          "Erro ao carregar artigos da página inicial:",
          articlesResult.reason
        );
        setArticlesError(true);
      }

      if (productsResult.status === "fulfilled") {
        setProducts(productsResult.value);
      } else {
        console.error(
          "Erro ao carregar recomendações da página inicial:",
          productsResult.reason
        );
        setProductsError(true);
      }

      setArticlesLoading(false);
      setProductsLoading(false);
    }

    loadHomeContent();

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="min-h-screen overflow-hidden bg-[#080b18] text-white">
      <Header />

      <main>
        <HomeHero />
        <HomeIntroduction />
        <HomeCategoryShowcase />

        <HomeArticles
          articles={articles}
          loading={articlesLoading}
          error={articlesError}
        />

        <HomeRecommendations
          products={products}
          loading={productsLoading}
          error={productsError}
        />

        <HomeAboutCTA />
      </main>

      <Footer />
    </div>
  );
}
