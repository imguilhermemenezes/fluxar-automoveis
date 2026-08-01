import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  MessageCircle,
  ShieldCheck,
  Tag,
  Car,
  Calendar,
  LayoutGrid,
  Fuel,
  Settings,
  Palette,
  Gauge,
  DoorOpen,
  Wrench,
  BadgeCheck,
  Sparkles,
} from 'lucide-react';
import api from '../services/api';
import { useConfiguracoes } from '../context/ConfiguracoesContext';

const STATUS = {
  disponivel: { label: 'Disponível', className: 'bg-brand-light text-brand' },
  vendido: { label: 'Vendido', className: 'bg-gray-200 text-gray-600' },
  indisponivel: { label: 'Indisponível', className: 'bg-gray-200 text-gray-600' },
};

export default function VeiculoDetalhes() {
  const { id } = useParams();
  const configuracoes = useConfiguracoes();
  const [veiculo, setVeiculo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const [imagemAtual, setImagemAtual] = useState(0);

  useEffect(() => {
    setLoading(true);
    setErro(null);
    setImagemAtual(0);
    api
      .get(`/veiculos/${id}`)
      .then((res) => setVeiculo(res.data.data))
      .catch(() => setErro('Não foi possível carregar esse veículo.'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <p className="max-w-6xl mx-auto px-6 py-10 text-sm text-gray-500">
        Carregando...
      </p>
    );
  }

  if (erro || !veiculo) {
    return (
      <p className="max-w-6xl mx-auto px-6 py-10 text-sm text-red-600">
        {erro ?? 'Veículo não encontrado.'}
      </p>
    );
  }

  const preco = Number(veiculo.preco).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
  const km = Number(veiculo.quilometragem).toLocaleString('pt-BR');
  const status = STATUS[veiculo.status] ?? STATUS.disponivel;
  const nomeCompleto = [veiculo.marca, veiculo.modelo, veiculo.versao].filter(Boolean).join(' ');
  const mensagem = encodeURIComponent(`Olá! Tenho interesse no ${nomeCompleto}`);
  const imagens = veiculo.imagens ?? [];

  const especificacoes = [
    { label: 'Marca', valor: veiculo.marca, Icon: Tag },
    { label: 'Modelo', valor: veiculo.modelo, Icon: Car },
    { label: 'Ano', valor: veiculo.ano, Icon: Calendar },
    { label: 'Carroceria', valor: veiculo.carroceria, Icon: LayoutGrid },
    { label: 'Combustível', valor: veiculo.combustivel, Icon: Fuel },
    { label: 'Câmbio', valor: veiculo.cambio, Icon: Settings },
    { label: 'Cor', valor: veiculo.cor, Icon: Palette },
    { label: 'Quilometragem', valor: `${km} Km`, Icon: Gauge },
    { label: 'Portas', valor: veiculo.portas, Icon: DoorOpen },
  ];

  const selos = [
    { label: 'Procedência garantida', Icon: ShieldCheck },
    { label: 'Revisões em dia', Icon: Wrench },
    { label: 'Ótimo custo-benefício', Icon: BadgeCheck },
    { label: 'Conforto e segurança', Icon: Sparkles },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <nav className="text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-brand">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/vitrine" className="hover:text-brand">Vitrine</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-700">
          {[veiculo.marca, veiculo.modelo, veiculo.versao, veiculo.ano].filter(Boolean).join(' ')}
        </span>
      </nav>

      <div className="grid md:grid-cols-[1fr_360px] gap-8">
        {/* Galeria */}
        <div className="min-w-0 w-full space-y-3">
          <div className="aspect-[4/3] bg-gray-100 rounded-2xl min-w-0 w-full overflow-hidden flex items-center justify-center">
            {imagens.length > 0 ? (
              <img
                src={imagens[imagemAtual]?.url}
                alt={nomeCompleto}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-sm text-gray-400">[ galeria de fotos do veículo ]</span>
            )}
          </div>

          {imagens.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {imagens.map((img, i) => (
                <button
                  key={img.id}
                  onClick={() => setImagemAtual(i)}
                  className={`w-16 h-16 rounded-lg overflow-hidden shrink-0 border-2 transition ${
                    i === imagemAtual ? 'border-brand' : 'border-transparent'
                  }`}
                >
                  <img src={img.url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info principal */}
        <div>
          <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-3 ${status.className}`}>
            {status.label}
          </span>
          <h1 className="text-2xl font-extrabold mb-1">{nomeCompleto}</h1>
          <p className="text-gray-500 mb-1">
            {veiculo.ano} • {veiculo.cambio} • {veiculo.combustivel}
          </p>
          <p className="text-gray-500 mb-4">{km} Km</p>
          <p className="text-3xl font-bold text-brand mb-5">{preco}</p>

          <a
            href={`https://wa.me/${configuracoes?.whatsapp_numero}?text=${mensagem}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 border-2 border-green-500 text-green-600 font-semibold rounded-xl py-3 mb-3 hover:bg-green-50 transition"
          >
            <MessageCircle size={18} />
            <span>
              Falar no WhatsApp
              <span className="block text-xs font-normal">Conversar sobre este veículo</span>
            </span>
          </a>

          <Link
            to="/vitrine"
            className="block text-center bg-brand text-white font-semibold rounded-xl py-3 mb-5 hover:brightness-95 transition"
          >
            Ver na Vitrine
          </Link>

          <div className="flex items-start gap-3 bg-brand-light rounded-xl p-4 mb-6">
            <ShieldCheck size={20} className="text-brand shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold">Veículo revisado e com procedência</p>
              <p className="text-xs text-gray-600">Qualidade e segurança que você pode confiar.</p>
            </div>
          </div>

          <h2 className="font-semibold mb-3">Especificações</h2>
          <dl className="space-y-2.5">
            {especificacoes.map(({ label, valor, Icon }) => (
              <div key={label} className="flex items-center justify-between text-sm">
                <dt className="flex items-center gap-2 text-gray-500">
                  <Icon size={15} />
                  {label}
                </dt>
                <dd className="font-medium">{valor}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Descrição */}
      <div className="mt-10 max-w-3xl">
        <h2 className="font-semibold mb-3">Descrição do veículo</h2>
        <p className="text-sm text-gray-600 whitespace-pre-line mb-6">
          {veiculo.descricao || 'Sem descrição cadastrada para este veículo ainda.'}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {selos.map(({ label, Icon }) => (
            <div key={label} className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-brand-light flex items-center justify-center shrink-0">
                <Icon size={16} className="text-brand" />
              </div>
              <span className="text-sm text-gray-600">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}