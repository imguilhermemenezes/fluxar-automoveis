import { useState, useEffect } from 'react';
import { Calendar, Car, ShieldCheck, Eye, Handshake, Award } from 'lucide-react';
import { useConfiguracoes } from '../context/ConfiguracoesContext';
import { formatarTelefone } from '../utils/formatters';
import api from '../services/api';

const STATS = [
  { valor: '+20', label: 'anos de experiência', Icon: Calendar },
  { valor: '+500', label: 'veículos vendidos', Icon: Car },
  { valor: '100%', label: 'compromisso com a sua satisfação', Icon: ShieldCheck },
];

const VALORES = [
  { titulo: 'Confiança', descricao: 'Transparência em todas as etapas da negociação.', Icon: ShieldCheck },
  { titulo: 'Transparência', descricao: 'Informações claras sobre cada veículo, sem surpresas.', Icon: Eye },
  { titulo: 'Compromisso', descricao: 'Acompanhamos você do primeiro contato até a entrega.', Icon: Handshake },
  { titulo: 'Excelência', descricao: 'Veículos revisados e prontos pra rodar com segurança.', Icon: Award },
];

export default function Sobre() {
  const configuracoes = useConfiguracoes();
  const [fotos, setFotos] = useState([]);

  useEffect(() => {
    api.get('/fotos-loja').then((res) => setFotos(res.data));
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="bg-[#1b1b18] text-white">
        <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">
              Sobre a <span className="text-brand">Fluxar Automóveis.</span>
            </h1>
            <p className="text-gray-300 mt-4 max-w-md">
              Há mais de 20 anos construindo relacionamentos e oferecendo as
              melhores oportunidades para nossos clientes.
            </p>
          </div>
          <div className="h-56 md:h-64 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center">
            <span className="text-sm text-gray-400">[ foto da loja ]</span>
          </div>
        </div>
      </section>

      {/* Contato rápido */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="bg-white border border-gray-100 rounded-2xl -mt-8 md:-mt-10 relative p-6 grid sm:grid-cols-3 gap-4 text-sm text-gray-600 shadow-sm">
          <p>[ endereço ]</p>
          <p>{formatarTelefone(configuracoes?.whatsapp_numero)}</p>
          <p>Seg a Sex: 08:00 às 19:00 · Sáb: 08:00 às 17:00</p>
        </div>
      </section>

      {/* Nossa história */}
      <section className="max-w-6xl mx-auto px-6 pt-14">
        <div className="grid md:grid-cols-[1fr_360px] gap-10 items-start">
          <div>
            <h2 className="font-semibold text-brand mb-1">Nossa história</h2>
            <h3 className="text-2xl font-extrabold mb-4">
              Mais do que vender carros, construímos confiança.
            </h3>
            <p className="text-gray-600">
              A Fluxar Automóveis nasceu com o propósito de oferecer veículos de
              qualidade, procedência garantida e um atendimento próximo, sem
              complicação. Aqui, cada negociação é conduzida com transparência —
              seja na compra, na venda ou na consignação do seu veículo.
            </p>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-1 gap-3">
            {STATS.map(({ valor, label, Icon }) => (
              <div
                key={label}
                className="bg-white border border-gray-100 rounded-2xl p-4 text-center md:text-left md:flex md:items-center md:gap-3"
              >
                <Icon size={20} className="text-brand mx-auto md:mx-0 mb-2 md:mb-0" />
                <div>
                  <p className="font-extrabold text-lg">{valor}</p>
                  <p className="text-xs text-gray-500">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nossos valores */}
      <section className="max-w-6xl mx-auto px-6 py-14 text-center">
        <h2 className="font-semibold mb-8">Nossos valores</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {VALORES.map(({ titulo, descricao, Icon }) => (
            <div key={titulo} className="bg-white border border-gray-100 rounded-2xl p-5">
              <div className="w-11 h-11 rounded-full bg-brand-light flex items-center justify-center mx-auto mb-3">
                <Icon size={20} className="text-brand" />
              </div>
              <h3 className="font-semibold mb-1">{titulo}</h3>
              <p className="text-xs text-gray-500">{descricao}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Conheça nossa loja */}
      <section className="max-w-6xl mx-auto px-6 pb-16 text-center">
        <h2 className="font-semibold mb-8">Conheça nossa loja</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {fotos.length > 0
            ? fotos.map((foto) => (
                <div key={foto.id} className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
                  <img src={foto.url} alt="Fluxar Automóveis" className="w-full h-full object-cover" />
                </div>
              ))
            : [1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="aspect-square bg-gray-100 rounded-xl flex items-center justify-center">
                  <span className="text-xs text-gray-400">[ foto {i} ]</span>
                </div>
              ))}
        </div>
      </section>
    </div>
  );
}