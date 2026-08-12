import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
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
  const [menuAberto, setMenuAberto] = useState(false);

  // Fecha o menu automaticamente sempre que a rota mudar
  useEffect(() => {
    setMenuAberto(false);
  }, [location.pathname]);

  const linkWhatsapp = `https://wa.me/${configuracoes?.whatsapp_numero}`;

  return (
    <header className="bg-white border-b border-gray-100 relative z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 md:h-20 flex items-center justify-between gap-6">
        <Link to="/" className="shrink-0" onClick={() => setMenuAberto(false)}>
          <img src={logoFluxar} alt="Fluxar Automóveis" className="h-8 md:h-10 w-auto" />
        </Link>

        {/* Navegação desktop */}
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

        {/* CTA WhatsApp - só aparece no desktop, no mobile ele vive dentro do menu */}
        <a
          href={linkWhatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-2 bg-brand text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:brightness-95 transition shrink-0"
        >
          <IconeWhatsApp className="w-5 h-5" />
          Fale Conosco
        </a>

        {/* Botão hambúrguer - só aparece no mobile */}
        <button
          type="button"
          onClick={() => setMenuAberto((v) => !v)}
          aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuAberto}
          className="md:hidden p-2 -mr-2 text-gray-700"
        >
          {menuAberto ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Painel do menu mobile - desce/some com uma transição de altura */}
      <div
        className={`md:hidden overflow-hidden transition-[max-height] duration-300 ease-in-out border-t border-gray-100 ${
          menuAberto ? 'max-h-96' : 'max-h-0 border-t-0'
        }`}
      >
        <nav className="flex flex-col px-4 sm:px-6 py-4 gap-1">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium py-2.5 transition-colors ${
                location.pathname === link.to
                  ? 'text-brand'
                  : 'text-gray-700 hover:text-brand'
              }`}
            >
              {link.label}
            </Link>
          ))}

          <a
            href={linkWhatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-brand text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:brightness-95 transition mt-3"
          >
            <IconeWhatsApp className="w-5 h-5" />
            Fale Conosco
          </a>
        </nav>
      </div>
    </header>
  );
}