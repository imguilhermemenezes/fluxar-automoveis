import { Link } from 'react-router-dom';
import { ArrowRight, Tag, Banknote, Handshake } from 'lucide-react';

const brands = ['Volkswagen', 'Jeep', 'Chevrolet', 'Fiat', 'Toyota', 'Volvo', 'Ford', 'Renault'];

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
      <section className="max-w-6xl mx-auto px-6 pt-12">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-brand font-semibold text-sm mb-3">
              Mais que carros, boas escolhas.
            </p>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-5">
              Seu próximo destino começa aqui.
            </h1>
            <p className="text-gray-600 mb-8 max-w-md">
              Venda, compre ou consigne com segurança, transparência e as
              melhores condições do mercado.
            </p>
            <Link
              to="/vitrine"
              className="inline-flex items-center gap-2 bg-brand text-white font-semibold px-6 py-3 rounded-full hover:brightness-95 transition"
            >
              Ver veículos
              <ArrowRight size={18} />
            </Link>
          </div>

          {/* Placeholder — entra a foto do veículo em destaque aqui */}
          <div className="h-64 md:h-96 rounded-3xl bg-white border border-gray-100 flex items-center justify-center">
            <span className="text-sm text-gray-400">
              [ imagem do veículo em destaque ]
            </span>
          </div>
        </div>
      </section>

      {/* Marcas trabalhadas */}
      <section className="max-w-6xl mx-auto px-6 py-14">
        {/* Placeholder de texto no lugar dos logos reais das marcas —
            trocar pelos arquivos de logo assim que estiverem disponíveis. */}
        <div className="flex flex-wrap items-center justify-between gap-x-10 gap-y-4">
          {brands.map((brand) => (
            <span
              key={brand}
              className="text-base font-bold text-gray-400 tracking-wide"
            >
              {brand}
            </span>
          ))}
        </div>
      </section>

      {/* Comprar / Vender / Consignar */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="grid md:grid-cols-3 gap-4">
          {services.map(({ title, description, to, Icon }) => (
            <Link
              key={title}
              to={to}
              className="group bg-white border border-gray-100 rounded-2xl p-6 flex items-center gap-4 hover:border-brand/40 transition"
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
                className="text-brand shrink-0 group-hover:translate-x-1 transition-transform"
              />
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}