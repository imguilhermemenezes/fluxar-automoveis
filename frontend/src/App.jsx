import { Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import LayoutAdmin from './components/layout/LayoutAdmin';
import RotaProtegida from './components/RotaProtegida';
import Home from './pages/Home';
import Vitrine from './pages/Vitrine';
import VeiculoDetalhes from './pages/VeiculoDetalhes';
import Servicos from './pages/Servicos';
import Sobre from './pages/Sobre';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import VeiculosAdmin from './pages/admin/VeiculosAdmin';
import NovoVeiculo from './pages/admin/NovoVeiculo';
import EditarVeiculo from './pages/admin/EditarVeiculo';
import Perfil from './pages/admin/Perfil';

function LayoutPublico({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}

function PaginaAdmin({ children }) {
  return (
    <RotaProtegida>
      <LayoutAdmin>{children}</LayoutAdmin>
    </RotaProtegida>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<LayoutPublico><Home /></LayoutPublico>} />
      <Route path="/vitrine" element={<LayoutPublico><Vitrine /></LayoutPublico>} />
      <Route path="/vitrine/:id" element={<LayoutPublico><VeiculoDetalhes /></LayoutPublico>} />
      <Route path="/servicos" element={<LayoutPublico><Servicos /></LayoutPublico>} />
      <Route path="/sobre" element={<LayoutPublico><Sobre /></LayoutPublico>} />

      <Route path="/admin/login" element={<Login />} />
      <Route path="/admin" element={<PaginaAdmin><Dashboard /></PaginaAdmin>} />
      <Route path="/admin/veiculos" element={<PaginaAdmin><VeiculosAdmin /></PaginaAdmin>} />
      <Route path="/admin/veiculos/novo" element={<PaginaAdmin><NovoVeiculo /></PaginaAdmin>} />
      <Route path="/admin/veiculos/:id/editar" element={<PaginaAdmin><EditarVeiculo /></PaginaAdmin>} />
      <Route path="/admin/perfil" element={<PaginaAdmin><Perfil /></PaginaAdmin>} />
    </Routes>
  );
}

export default App;