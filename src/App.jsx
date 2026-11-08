import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";

function Articles() {
  return <div className="min-h-screen bg-[#080b18] text-white p-10">Artigos em desenvolvimento.</div>;
}

function Recommendations() {
  return <div className="min-h-screen bg-[#080b18] text-white p-10">Recomendações em desenvolvimento.</div>;
}

function Portfolio() {
  return <div className="min-h-screen bg-[#080b18] text-white p-10">Portfólio em desenvolvimento.</div>;
}

function Login() {
  return <div className="min-h-screen bg-[#080b18] text-white p-10">Login em desenvolvimento.</div>;
}

function Register() {
  return <div className="min-h-screen bg-[#080b18] text-white p-10">Cadastro em desenvolvimento.</div>;
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;