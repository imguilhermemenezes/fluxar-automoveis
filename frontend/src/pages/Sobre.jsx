import { useState, useEffect } from 'react';
import { Calendar, Car, ShieldCheck, Eye, Handshake, Award, MapPin, Clock } from 'lucide-react';
import { useConfiguracoes } from '../context/ConfiguracoesContext';
import { formatarTelefone } from '../utils/formatters';
import IconeWhatsApp from '../components/IconeWhatsApp';
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

function TituloSecao({ children }) {
  return (
    <h2 className="inline-block font-bold text-sm tracking-widest uppercase mb-8 relative pb-3">
      {children}
      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-brand" />
    </h2>
  );
}

export default function Sobre() {
  const configuracoes = useConfiguracoes();
  const [fotos, setFotos] = useState([]);

  useEffect(() => {
    api.get('/fotos-loja').then((res) => setFotos(res.data));
  }, []);

  const fotoHero = fotos[0];

  return (
    <div>
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 md:pt-12">
        <div className="grid md:grid-cols-2 items-center rounded-3xl overflow-hidden bg-[#1b1b18] text-white">
          <div className="p-6 md:p-8">
            <h1 className="text-3xl md:text-4xl font-extrabold leading-tight mb-4">
              Sobre a <span className="text-brand">Fluxar Automóveis.</span>
            </h1>
            <p className="text-gray-300 mb-6 max-w-md text-sm">
              Há 17 anos construindo relacionamentos, realizando sonhos e
              oferecendo as melhores oportunidades para nossos clientes.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6">
              <div className="flex items-start gap-2">
                <MapPin size={16} className="text-brand shrink-0 mt-0.5" />
                <div className="text-xs leading-relaxed">
                  <p className="text-gray-200">Av. Vereador Toaldo Túlio, 2072</p>
                  <p className="text-gray-400">Santa Felicidade - Curitiba</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <IconeWhatsApp className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                <div className="text-xs leading-relaxed">
                  <p className="text-gray-200">{formatarTelefone(configuracoes?.whatsapp_numero)}</p>
                  <p className="text-gray-400">Whatsapp</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Clock size={16} className="text-brand shrink-0 mt-0.5" />
                <div className="text-xs leading-relaxed">
                  <p className="text-gray-200">Seg à Sex: 08:00 às 19:00</p>
                  <p className="text-gray-400">Sáb: 08:30 às 17:00</p>
                </div>
              </div>
            </div>
          </div>

          <div className="h-56 md:h-full">
            {fotoHero ? (
              <img
                src={fotoHero.url}
                alt="Fluxar Automóveis"
                className="w-full h-full object-cover md:[mask-image:linear-gradient(to_right,transparent_0%,black_30%)] md:[-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_30%)]"
              />
            ) : (
              <div className="w-full h-full bg-white/10 flex items-center justify-center">
                <span className="text-sm text-gray-400">[ foto da loja ]</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Nossa história */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-14">
        <div className="grid md:grid-cols-2 gap-8 md:gap-10 items-start">
          <div>
            <h2 className="font-semibold text-brand mb-1">Nossa história</h2>
            <h3 className="text-2xl font-extrabold mb-4">
              Mais do que vender carros, construímos confiança.
            </h3>
            <p className="text-gray-600 text-base">
              A Fluxar Automóveis nasceu com o propósito de oferecer veículos de
              qualidade, procedência garantida e um atendimento próximo, sem
              complicação. Aqui, cada negociação é conduzida com transparência —
              seja na compra, na venda ou na consignação do seu veículo.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {STATS.map(({ valor, label, Icon }) => (
              <div
                key={label}
                className="bg-white border border-gray-100 rounded-2xl p-6 text-center"
              >
                <Icon size={28} className="text-brand mx-auto mb-3" />
                <p className="font-extrabold text-3xl">{valor}</p>
                <p className="text-sm text-gray-500">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nossos valores */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-14 text-center">
        <TituloSecao>Nossos valores</TituloSecao>
        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 sm:p-6 md:p-8">
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
        </div>
      </section>

      {/* Conheça nossa loja */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-10 md:pb-16 text-center">
        <TituloSecao>Conheça nossa loja</TituloSecao>

        {fotos.length === 0 && (
          <p className="text-sm text-gray-400">Nenhuma foto cadastrada ainda.</p>
        )}

        {fotos.length > 0 && fotos.length < 5 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {fotos.map((foto) => (
              <div key={foto.id} className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
                <img src={foto.url} alt="Fluxar Automóveis" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        )}

        {fotos.length >= 5 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:grid-rows-2 md:h-[380px]">
            {fotos.slice(0, 5).map((foto, i) => (
              <div
                key={foto.id}
                className={`rounded-xl overflow-hidden bg-gray-100 ${
                  i === 0
                    ? 'col-span-2 aspect-[16/9] md:aspect-auto md:row-span-2'
                    : 'aspect-square md:aspect-auto'
                }`}
              >
                <img
                  src={foto.url}
                  alt="Fluxar Automóveis"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}