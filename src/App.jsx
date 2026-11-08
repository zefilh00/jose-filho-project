import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import PageStatus from "./components/status/PageStatus";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/perfil" element={<Profile />} />
        </Route>
        <Route
          path="/artigos"
          element={
            <PageStatus
              type="development"
              pageName="A área de artigos"
            />
          }
        />
        <Route
          path="/recomendacoes"
          element={
            <PageStatus
              type="development"
              pageName="A área de recomendações"
            />
          }
        />
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
