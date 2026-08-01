import { Link, useLocation } from 'react-router-dom';
import { Home, Car, User, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const links = [
  { to: '/admin', label: 'Início', Icon: Home },
  { to: '/admin/veiculos', label: 'Veículos', Icon: Car },
  { to: '/admin/perfil', label: 'Perfil', Icon: User },
];

export default function LayoutAdmin({ children }) {
  const { usuario, logout } = useAuth();
  const location = useLocation();

  return (
    <div className="min-h-screen flex">
      <aside className="w-56 bg-white border-r border-gray-100 flex flex-col shrink-0">
        <div className="p-6">
          <span className="text-xl font-extrabold tracking-tight">
            FLU<span className="text-brand">X</span>AR
          </span>
          <span className="block text-[9px] font-semibold tracking-[0.2em] text-gray-500">
            AUTOMÓVEIS
          </span>
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

      <main className="flex-1 min-w-0">{children}</main>
    </div>
  );
}