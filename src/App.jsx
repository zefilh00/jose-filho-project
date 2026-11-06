import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/artigos" element={<div>Artigos</div>} />
        <Route path="/recomendacoes" element={<div>Recomendações</div>} />
        <Route path="/portfolio" element={<div>Portfólio</div>} />
        <Route path="/sobre" element={<div>Sobre mim</div>} />
        <Route path="/login" element={<div>Login</div>} />
        <Route path="/cadastro" element={<div>Cadastro</div>} />
        <Route path="*" element={<div>Página não encontrada</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
