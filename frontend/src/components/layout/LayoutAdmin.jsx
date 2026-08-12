import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Car, User, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import logoFluxar from '../../assets/logo-fluxar.png';

const links = [
  { to: '/admin', label: 'Início', Icon: Home },
  { to: '/admin/veiculos', label: 'Veículos', Icon: Car },
  { to: '/admin/perfil', label: 'Perfil', Icon: User },
];

export default function LayoutAdmin({ children }) {
  const { usuario, logout } = useAuth();
  const location = useLocation();
  const [menuAberto, setMenuAberto] = useState(false);

  // Fecha o menu automaticamente sempre que a rota mudar
  useEffect(() => {
    setMenuAberto(false);
  }, [location.pathname]);

  return (
    <div className="h-screen flex flex-col md:flex-row">
      {/* Barra superior - só aparece no mobile */}
      <header className="md:hidden relative flex items-center justify-center px-4 h-16 border-b border-gray-100 bg-white shrink-0">
        <button
          type="button"
          onClick={() => setMenuAberto(true)}
          aria-label="Abrir menu"
          className="absolute left-4 p-2 text-gray-700"
        >
          <Menu size={22} />
        </button>
        <img src={logoFluxar} alt="Fluxar Automóveis" className="h-8 w-auto" />
      </header>

      {/* Fundo escurecido atrás do menu, só no mobile e só quando aberto */}
      {menuAberto && (
        <div
          className="md:hidden fixed inset-0 bg-black/40 z-40"
          onClick={() => setMenuAberto(false)}
        />
      )}

      {/* Sidebar - fixa e deslizante no mobile, estática no desktop */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 w-56 bg-white border-r border-gray-100 flex flex-col shrink-0 overflow-y-auto transition-transform duration-300 ease-in-out md:translate-x-0 ${
          menuAberto ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 flex items-center justify-between">
          <img src={logoFluxar} alt="Fluxar Automóveis" className="h-9 w-auto" />
          <button
            type="button"
            onClick={() => setMenuAberto(false)}
            aria-label="Fechar menu"
            className="md:hidden text-gray-500"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-3 space-y-1">
          {links.map(({ to, label, Icon }) => (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                location.pathname === to
                  ? 'bg-brand-light text-brand'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Icon size={18} />
              {label}
            </Link>
          ))}
        </nav>

        <div className="p-3 border-t border-gray-100">
          <div className="px-3 py-2 mb-1">
            <p className="text-sm font-medium truncate">{usuario?.name}</p>
            <p className="text-xs text-gray-400 truncate">{usuario?.email}</p>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition"
          >
            <LogOut size={18} />
            Sair
          </button>
        </div>
      </aside>

      <main className="flex-1 min-w-0 overflow-y-auto">{children}</main>
    </div>
  );
}