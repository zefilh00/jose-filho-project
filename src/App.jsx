import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Articles from "./pages/Articles";
import Recommendations from "./pages/Recommendations";
import ArticleDetail from "./pages/ArticleDetail";
import ProductDetail from "./pages/ProductDetail";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AdminRoute from "./components/auth/AdminRoute";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import PageStatus from "./components/status/PageStatus";
import ScrollToTop from "./components/layout/ScrollToTop";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/perfil" element={<Profile />} />
        </Route>
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
          </Route>
        </Route>
        <Route path="/artigos" element={<Articles />} />
        <Route path="/artigos/:slug" element={<ArticleDetail />} />
        <Route path="/recomendacoes" element={<Recommendations />} />
        <Route path="/recomendacoes/:slug" element={<ProductDetail />} />
        <Route
          path="/portfolio"
          element={
            <PageStatus
              type="development"
              pageName="O portfólio"
            />
          }
        />
        <Route
          path="*"
          element={<PageStatus type="not-found" />}
        />
      </Routes>
    </BrowserRouter>
  );
}