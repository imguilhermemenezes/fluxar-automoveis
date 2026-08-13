import { useRef, useState, useEffect } from 'react';
import { ArrowRight, Banknote, Handshake, CheckCircle } from 'lucide-react';
import { useConfiguracoes } from '../context/ConfiguracoesContext';
import api from '../services/api';

import chavesImg from '../assets/servicos/chaves.png';
import vendaDiretaImg from '../assets/servicos/venda-direta.png';
import consignacaoImg from '../assets/servicos/consignacao.png';

const PASSOS_VENDA = [
  { titulo: 'Preenche seus dados', descricao: 'Informe os dados do seu veículo em nosso formulário.' },
  { titulo: 'Avaliamos seu veículo', descricao: 'Nossa equipe fará uma avaliação justa.' },
  { titulo: 'Recebe uma proposta', descricao: 'Enviamos uma proposta rápida e transparente.' },
  { titulo: 'Venda concluída', descricao: 'Pagamento seguro e com a documentação resolvida.' },
];

const PASSOS_CONSIGNACAO = [
  { titulo: 'Cadastra seu veículo', descricao: 'Preencha o formulário com os dados do seu carro.' },
  { titulo: 'Divulgamos pra você', descricao: 'Anunciamos em nossos canais e parcerias.' },
  { titulo: 'Negociamos', descricao: 'Cuidamos de todo o contato e da negociação.' },
  { titulo: 'Venda concluída', descricao: 'Você recebe com segurança e sem preocupações.' },
];

function Passos({ titulo, passos }) {
  return (
    <div>
      <h3 className="font-semibold text-brand mb-4">{titulo}</h3>
      <div className="flex flex-col sm:flex-row gap-3">
        {passos.map((passo, i) => (
          <div key={passo.titulo} className="flex-1 flex items-center gap-2">
            <div className="flex-1 bg-white border border-gray-100 rounded-xl p-4">
              <span className="w-7 h-7 rounded-full bg-brand text-white text-xs font-bold flex items-center justify-center mb-2">
                {i + 1}
              </span>
              <p className="text-sm font-semibold mb-1">{passo.titulo}</p>
              <p className="text-xs text-gray-500">{passo.descricao}</p>
            </div>
            {i < passos.length - 1 && (
              <ArrowRight size={22} className="text-gray-400 shrink-0 hidden sm:block" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const CAMPOS_VAZIOS = {
  nome: '',
  telefone: '',
  email: '',
  marca: '',
  modelo: '',
  versao: '',
  ano: '',
  km: '',
  placa: '',
  valor: '',
  observacoes: '',
};

const formatarTelefone = (valor) => {
  const numeros = valor.replace(/\D/g, '').slice(0, 11);
  if (numeros.length === 0) return '';
  if (numeros.length <= 2) return `(${numeros}`;
  if (numeros.length <= 3) return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
  if (numeros.length <= 7) return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 3)} ${numeros.slice(3)}`;
  return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 3)} ${numeros.slice(3, 7)}-${numeros.slice(7, 11)}`;
};

const formatarMoeda = (valor) => {
  const numeros = valor.replace(/\D/g, '');
  if (!numeros) return '';
  const numero = Number(numeros) / 100;
  return numero.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

const formatarAno = (valor) => valor.replace(/\D/g, '').slice(0, 4);

export default function Servicos() {
  const configuracoes = useConfiguracoes();
  const formRef = useRef(null);
  const [modo, setModo] = useState('vender');
  const [campos, setCampos] = useState(CAMPOS_VAZIOS);
  const [fotoLoja, setFotoLoja] = useState(null);

  useEffect(() => {
    api.get('/fotos-loja').then((res) => setFotoLoja(res.data[0] ?? null));
  }, []);

  const set = (campo, valor) => setCampos((c) => ({ ...c, [campo]: valor }));

  const irParaFormulario = (modoEscolhido) => {
    setModo(modoEscolhido);
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const enviar = (e) => {
    e.preventDefault();

    const veiculo = [campos.marca, campos.modelo, campos.versao, campos.ano]
      .filter(Boolean)
      .join(' ');

    const linhas = [
      `Olá! Quero ${modo === 'vender' ? 'vender' : 'consignar'} meu carro.`,
      `Nome: ${campos.nome}`,
      `Telefone: ${campos.telefone}`,
      campos.email && `E-mail: ${campos.email}`,
      `Veículo: ${veiculo}`,
      campos.km && `Quilometragem: ${campos.km} Km`,
      campos.placa && `Placa: ${campos.placa}`,
      campos.valor && `Valor desejado: ${campos.valor}`,
      campos.observacoes && `Observações: ${campos.observacoes}`,
    ]
      .filter(Boolean)
      .join('\n');

    const numero = configuracoes?.whatsapp_numero;
    window.open(`https://wa.me/${numero}?text=${encodeURIComponent(linhas)}`, '_blank');
  };

  return (
    <div>
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 md:pt-12">
        <div className="grid md:grid-cols-2 items-center rounded-3xl overflow-hidden bg-gradient-to-r from-gray-50 to-gray-300">
          <div className="p-6 md:p-8 relative z-10">
            <h1 className="text-2xl md:text-3xl font-extrabold leading-tight mb-3">
              Venda ou consigne seu veículo com segurança, rapidez e{' '}
              <span className="text-brand">transparência</span>.
            </h1>
            <p className="text-gray-600 mb-5 max-w-md text-sm">
              Na Fluxar Automóveis, você tem as melhores condições pra negociar seu carro.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3">
              <button
                onClick={() => irParaFormulario('vender')}
                className="w-full sm:w-auto bg-brand text-white font-semibold px-6 py-2.5 rounded-full hover:brightness-95 transition"
              >
                Quero vender meu carro
              </button>
              <button
                onClick={() => irParaFormulario('consignar')}
                className="w-full sm:w-auto bg-white border border-brand text-brand font-semibold px-6 py-2.5 rounded-full hover:bg-brand-light transition"
              >
                Quero consignar meu carro
              </button>
            </div>
          </div>

          <img
            src={chavesImg}
            alt="Entrega de chaves"
            className="w-full h-40 sm:h-48 md:h-full object-cover md:[mask-image:linear-gradient(to_right,transparent_0%,black_40%)] md:[-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_40%)]"
          />
        </div>
      </section>

      {/* Venda direta / Consignação */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-14 grid md:grid-cols-2 gap-4">
        <div className="bg-brand-light rounded-2xl overflow-hidden grid sm:grid-cols-[3fr_2fr]">
          <div className="p-5">
            <div className="w-9 h-9 rounded-full bg-brand flex items-center justify-center mb-3">
              <Banknote size={16} className="text-white" />
            </div>
            <h2 className="font-semibold mb-1">Venda direta para a Fluxar</h2>
            <p className="text-sm text-gray-600 mb-3">
              Compramos seu veículo com avaliação justa, proposta rápida e pagamento seguro.
            </p>
            <ul className="space-y-1 mb-3">
              <li className="flex items-center gap-2 text-sm text-gray-700">
                <CheckCircle size={14} className="text-brand shrink-0" />
                Avaliação justa
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-700">
                <CheckCircle size={14} className="text-brand shrink-0" />
                Pagamento à vista
              </li>
            </ul>
            <button
              onClick={() => irParaFormulario('vender')}
              className="bg-white border border-brand text-brand font-semibold text-sm px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 hover:bg-brand hover:text-white transition"
            >
              Quero vender <ArrowRight size={14} />
            </button>
          </div>
          <img src={vendaDiretaImg} alt="Venda direta" className="w-full h-32 sm:h-full object-cover" />
        </div>

        <div className="bg-brand-light rounded-2xl overflow-hidden grid sm:grid-cols-[3fr_2fr]">
          <div className="p-5">
            <div className="w-9 h-9 rounded-full bg-brand flex items-center justify-center mb-3">
              <Handshake size={16} className="text-white" />
            </div>
            <h2 className="font-semibold mb-1">Consignação do seu veículo</h2>
            <p className="text-sm text-gray-600 mb-3">
              Deixe seu veículo conosco e nossa equipe cuida de tudo para você vender com segurança.
            </p>
            <ul className="space-y-1 mb-3">
              <li className="flex items-center gap-2 text-sm text-gray-700">
                <CheckCircle size={14} className="text-brand shrink-0" />
                Divulgação completa
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-700">
                <CheckCircle size={14} className="text-brand shrink-0" />
                Venda facilitada
              </li>
            </ul>
            <button
              onClick={() => irParaFormulario('consignar')}
              className="bg-white border border-brand text-brand font-semibold text-sm px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 hover:bg-brand hover:text-white transition"
            >
              Quero consignar <ArrowRight size={14} />
            </button>
          </div>
          <img src={consignacaoImg} alt="Consignação" className="w-full h-32 sm:h-full object-cover" />
        </div>
      </section>

      {/* Como funciona */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-8 md:pb-14">
        <h2 className="text-center font-semibold mb-8">Como funciona</h2>
        <div className="space-y-8">
          <Passos titulo="Venda direta pra Fluxar" passos={PASSOS_VENDA} />
          <Passos titulo="Consignação do seu veículo" passos={PASSOS_CONSIGNACAO} />
        </div>
      </section>

      {/* Formulário */}
      <section ref={formRef} className="max-w-7xl mx-auto px-4 sm:px-6 pb-10 md:pb-16">
        <div className="bg-white border border-gray-100 rounded-2xl p-5 sm:p-6 md:p-10 grid md:grid-cols-[300px_1fr] gap-6 md:gap-10">
          <div>
            <p className="text-brand font-semibold text-sm mb-2">Comece agora</p>
            <h2 className="text-2xl font-extrabold mb-3 leading-tight">
              Preencha o formulário e dê seu primeiro passo.
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              É rápido, fácil e gratuito. Em breve nossa equipe entrará em contato com você.
            </p>
            {fotoLoja && (
              <img
                src={fotoLoja.url}
                alt="Fluxar Automóveis"
                className="w-full h-40 object-cover rounded-xl"
              />
            )}
          </div>

          <div>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 mb-6">
              <button
                type="button"
                onClick={() => setModo('vender')}
                className={`w-full sm:w-auto text-sm font-semibold px-4 py-2 rounded-full transition ${
                  modo === 'vender' ? 'bg-brand text-white' : 'border border-gray-200 text-gray-600'
                }`}
              >
                Quero vender meu carro
              </button>
              <button
                type="button"
                onClick={() => setModo('consignar')}
                className={`w-full sm:w-auto text-sm font-semibold px-4 py-2 rounded-full transition ${
                  modo === 'consignar' ? 'bg-brand text-white' : 'border border-gray-200 text-gray-600'
                }`}
              >
                Quero consignar meu carro
              </button>
            </div>

            <form onSubmit={enviar} className="space-y-4">
              <div className="grid sm:grid-cols-3 gap-4">
                <input required value={campos.nome} onChange={(e) => set('nome', e.target.value)} placeholder="Nome completo" className="border border-gray-200 rounded-lg px-3 py-2 text-sm" />
                <input required value={campos.telefone} onChange={(e) => set('telefone', formatarTelefone(e.target.value))} placeholder="Telefone / WhatsApp" className="border border-gray-200 rounded-lg px-3 py-2 text-sm" />
                <input type="email" value={campos.email} onChange={(e) => set('email', e.target.value)} placeholder="E-mail (opcional)" className="border border-gray-200 rounded-lg px-3 py-2 text-sm" />
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <input required value={campos.marca} onChange={(e) => set('marca', e.target.value)} placeholder="Marca" className="border border-gray-200 rounded-lg px-3 py-2 text-sm" />
                <input required value={campos.modelo} onChange={(e) => set('modelo', e.target.value)} placeholder="Modelo" className="border border-gray-200 rounded-lg px-3 py-2 text-sm" />
                <input value={campos.versao} onChange={(e) => set('versao', e.target.value)} placeholder="Versão (opcional)" className="border border-gray-200 rounded-lg px-3 py-2 text-sm" />
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <input required type="text" inputMode="numeric" value={campos.ano} onChange={(e) => set('ano', formatarAno(e.target.value))} placeholder="Ano" className="border border-gray-200 rounded-lg px-3 py-2 text-sm" />
                <input required type="number" value={campos.km} onChange={(e) => set('km', e.target.value)} placeholder="Quilometragem" className="border border-gray-200 rounded-lg px-3 py-2 text-sm" />
                <input value={campos.placa} onChange={(e) => set('placa', e.target.value)} placeholder="Placa (opcional)" className="border border-gray-200 rounded-lg px-3 py-2 text-sm" />
              </div>

              <input required type="text" inputMode="numeric" value={campos.valor} onChange={(e) => set('valor', formatarMoeda(e.target.value))} placeholder="R$ 0,00" className="w-full sm:w-1/3 border border-gray-200 rounded-lg px-3 py-2 text-sm" />

              <textarea value={campos.observacoes} onChange={(e) => set('observacoes', e.target.value)} placeholder="Observações (opcional)" rows={3} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />

              <button type="submit" className="w-full sm:w-auto bg-brand text-white font-semibold px-6 py-3 rounded-full hover:brightness-95 transition">
                Enviar informações
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}