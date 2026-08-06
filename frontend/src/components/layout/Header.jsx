import { Link, useLocation } from 'react-router-dom';
import { useConfiguracoes } from '../../context/ConfiguracoesContext';
import IconeWhatsApp from '../IconeWhatsApp';
import logoFluxar from '../../assets/logo-fluxar.png';

const links = [
  { to: '/', label: 'Home' },
  { to: '/vitrine', label: 'Vitrine' },
  { to: '/servicos', label: 'Serviços' },
  { to: '/sobre', label: 'Sobre Nós' },
];

export default function Header() {
  const location = useLocation();
  const configuracoes = useConfiguracoes();

  return (
    <header className="bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between gap-6">
        <Link to="/" className="shrink-0">
          <img src={logoFluxar} alt="Fluxar Automóveis" className="h-10 w-auto" />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium transition-colors ${
                location.pathname === link.to
                  ? 'text-brand'
                  : 'text-gray-700 hover:text-brand'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <a
          href={`https://wa.me/${configuracoes?.whatsapp_numero}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-brand text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:brightness-95 transition shrink-0"
        >
          <IconeWhatsApp className="w-5 h-5" />
          Fale Conosco
        </a>
      </div>
    </header>
  );
}