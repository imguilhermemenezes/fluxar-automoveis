import { Link } from 'react-router-dom';
import { ArrowRight, Tag, Banknote, Handshake } from 'lucide-react';

import heroCarro from '../assets/hero-carro.png';
import volkswagenLogo from '../assets/marcas/volkswagen.png';
import jeepLogo from '../assets/marcas/jeep.png';
import chevroletLogo from '../assets/marcas/chevrolet.png';
import fiatLogo from '../assets/marcas/fiat.png';
import toyotaLogo from '../assets/marcas/toyota.png';
import volvoLogo from '../assets/marcas/volvo.png';
import fordLogo from '../assets/marcas/ford.png';
import renaultLogo from '../assets/marcas/renault.png';

const marcas = [
  { nome: 'Volkswagen', logo: volkswagenLogo },
  { nome: 'Jeep', logo: jeepLogo },
  { nome: 'Chevrolet', logo: chevroletLogo },
  { nome: 'Fiat', logo: fiatLogo },
  { nome: 'Toyota', logo: toyotaLogo },
  { nome: 'Volvo', logo: volvoLogo },
  { nome: 'Ford', logo: fordLogo, escala: 1.5 },
  { nome: 'Renault', logo: renaultLogo },
];

const services = [
  {
    title: 'Comprar',
    description: 'Encontre veículos que unem qualidade, segurança e excelente custo-benefício.',
    to: '/vitrine',
    Icon: Tag,
  },
  {
    title: 'Vender',
    description: 'Avaliamos seu veículo e oferecemos uma negociação rápida e transparente.',
    to: '/servicos',
    Icon: Banknote,
  },
  {
    title: 'Consignar',
    description: 'Anunciamos, negociamos e encontramos o comprador ideal para você.',
    to: '/servicos',
    Icon: Handshake,
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 md:pt-12">
        <div className="grid md:grid-cols-2 gap-8 md:gap-10 items-center rounded-3xl p-6 sm:p-8 md:p-12 bg-gradient-to-r from-white to-gray-400">
          <div>
            <p className="text-brand font-semibold text-sm mb-3">
              Mais que carros, boas escolhas.
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-5">
              Seu próximo destino começa aqui.
            </h1>
            <p className="text-gray-600 mb-8 max-w-md">
              Venda, compre ou consigne com segurança, transparência e as
              melhores condições do mercado.
            </p>
            <Link
              to="/vitrine"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-brand text-white font-semibold px-6 py-3 rounded-full hover:brightness-95 transition"
            >
              Ver veículos
              <ArrowRight size={18} />
            </Link>
          </div>

          <img
            src={heroCarro}
            alt="Veículo em destaque"
            className="w-full h-auto max-h-52 sm:max-h-72 md:max-h-80 object-contain"
          />
        </div>
      </section>

      {/* Marcas trabalhadas */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-14">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:flex md:flex-wrap items-center justify-items-center md:justify-between gap-x-4 gap-y-6 sm:gap-x-6 md:gap-y-8">
          {marcas.map((marca) => (
            <div key={marca.nome} className="h-9 w-16 sm:h-10 sm:w-20 md:h-12 md:w-24 flex items-center justify-center">
              <img
                src={marca.logo}
                alt={marca.nome}
                className="max-h-full max-w-full object-contain opacity-80 hover:opacity-100 transition"
                style={marca.escala ? { transform: `scale(${marca.escala})` } : undefined}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Comprar / Vender / Consignar */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-12 md:pb-16">
        <div className="grid md:grid-cols-3 gap-4">
          {services.map(({ title, description, to, Icon }) => (
            <Link
              key={title}
              to={to}
              className="group bg-white border border-gray-100 rounded-2xl p-5 sm:p-6 flex items-center gap-4 hover:border-brand/40 transition"
            >
              <div className="w-12 h-12 rounded-full bg-brand-light flex items-center justify-center shrink-0">
                <Icon size={20} className="text-brand" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-0.5">{title}</h3>
                <p className="text-sm text-gray-500">{description}</p>
              </div>
              <ArrowRight
                size={18}
                className="text-brand shrink-0 group-hover:translate-x-1 transition-transform hidden sm:block"
              />
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}