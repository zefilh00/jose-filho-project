import { BrowserRouter, Routes,Route, } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

import ProtectedRoute from "./components/auth/ProtectedRoute";

function Articles() {
  return (
    <div className="min-h-screen bg-[#080b18] p-10 text-white">
      Artigos em desenvolvimento.
    </div>
  );
}

function Recommendations() {
  return (
    <div className="min-h-screen bg-[#080b18] p-10 text-white">
      Recomendações em desenvolvimento.
    </div>
  );
}

function Portfolio() {
  return (
    <div className="min-h-screen bg-[#080b18] p-10 text-white">
      Portfólio em desenvolvimento.
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<About />} />
        <Route path="/artigos" element={<Articles />} />
        <Route path="/recomendacoes" element={<Recommendations />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/perfil" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
