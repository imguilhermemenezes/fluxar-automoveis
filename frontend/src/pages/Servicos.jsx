import { useRef, useState } from 'react';
import { ArrowRight, Banknote, Handshake } from 'lucide-react';
import { useConfiguracoes } from '../context/ConfiguracoesContext';

const PASSOS_VENDA = ['Preenche seus dados', 'Avaliamos seu veículo', 'Recebe uma proposta', 'Venda concluída'];
const PASSOS_CONSIGNACAO = ['Cadastra seu veículo', 'Divulgamos pra você', 'Negociamos', 'Venda concluída'];

function Passos({ titulo, passos }) {
  return (
    <div>
      <h3 className="font-semibold text-brand mb-4">{titulo}</h3>
      <div className="flex flex-wrap items-center gap-2">
        {passos.map((passo, i) => (
          <div key={passo} className="flex items-center gap-2">
            <div className="flex items-center gap-2 bg-white border border-gray-100 rounded-xl px-3 py-2">
              <span className="w-6 h-6 rounded-full bg-brand text-white text-xs font-bold flex items-center justify-center shrink-0">
                {i + 1}
              </span>
              <span className="text-sm">{passo}</span>
            </div>
            {i < passos.length - 1 && (
              <ArrowRight size={16} className="text-gray-300 shrink-0" />
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

export default function Servicos() {
  const configuracoes = useConfiguracoes();
  const formRef = useRef(null);
  const [modo, setModo] = useState('vender');
  const [campos, setCampos] = useState(CAMPOS_VAZIOS);

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
      campos.valor && `Valor desejado: R$ ${campos.valor}`,
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
      <section className="max-w-6xl mx-auto px-6 pt-12">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold leading-tight mb-4">
              Venda ou consigne seu veículo com segurança, rapidez e{' '}
              <span className="text-brand">transparência</span>.
            </h1>
            <p className="text-gray-600 mb-6 max-w-md">
              Na Fluxar Automóveis, você tem as melhores condições pra negociar seu carro.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => irParaFormulario('vender')}
                className="bg-brand text-white font-semibold px-6 py-3 rounded-full hover:brightness-95 transition"
              >
                Quero vender meu carro
              </button>
              <button
                onClick={() => irParaFormulario('consignar')}
                className="border border-brand text-brand font-semibold px-6 py-3 rounded-full hover:bg-brand-light transition"
              >
                Quero consignar meu carro
              </button>
            </div>
          </div>

          <div className="h-56 md:h-72 rounded-3xl bg-white border border-gray-100 flex items-center justify-center">
            <span className="text-sm text-gray-400">[ imagem ]</span>
          </div>
        </div>
      </section>

      {/* Venda direta / Consignação */}
      <section className="max-w-6xl mx-auto px-6 py-14 grid md:grid-cols-2 gap-4">
        <div className="bg-white border border-gray-100 rounded-2xl p-6">
          <div className="w-11 h-11 rounded-full bg-brand-light flex items-center justify-center mb-4">
            <Banknote size={20} className="text-brand" />
          </div>
          <h2 className="font-semibold mb-1">Venda direta para a Fluxar</h2>
          <p className="text-sm text-gray-500 mb-4">
            Compramos seu veículo com avaliação justa, proposta rápida e pagamento à vista.
          </p>
          <button
            onClick={() => irParaFormulario('vender')}
            className="text-sm font-semibold text-brand inline-flex items-center gap-1 hover:gap-2 transition-all"
          >
            Quero vender <ArrowRight size={15} />
          </button>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-6">
          <div className="w-11 h-11 rounded-full bg-brand-light flex items-center justify-center mb-4">
            <Handshake size={20} className="text-brand" />
          </div>
          <h2 className="font-semibold mb-1">Consignação do seu veículo</h2>
          <p className="text-sm text-gray-500 mb-4">
            Anunciamos seu veículo conosco e cuidamos de toda a negociação até a venda.
          </p>
          <button
            onClick={() => irParaFormulario('consignar')}
            className="text-sm font-semibold text-brand inline-flex items-center gap-1 hover:gap-2 transition-all"
          >
            Quero consignar <ArrowRight size={15} />
          </button>
        </div>
      </section>

      {/* Como funciona */}
      <section className="max-w-6xl mx-auto px-6 pb-14">
        <h2 className="text-center font-semibold mb-8">Como funciona</h2>
        <div className="space-y-8">
          <Passos titulo="Venda direta pra Fluxar" passos={PASSOS_VENDA} />
          <Passos titulo="Consignação do seu veículo" passos={PASSOS_CONSIGNACAO} />
        </div>
      </section>

      {/* Formulário */}
      <section ref={formRef} className="max-w-6xl mx-auto px-6 pb-16">
        <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8">
          <h2 className="font-semibold mb-1">Preencha o formulário e dê seu primeiro passo</h2>
          <p className="text-sm text-gray-500 mb-6">
            É rápido, fácil e sem compromisso. Em instantes você já será atendido.
          </p>

          <div className="flex gap-3 mb-6">
            <button
              type="button"
              onClick={() => setModo('vender')}
              className={`text-sm font-semibold px-4 py-2 rounded-full transition ${
                modo === 'vender' ? 'bg-brand text-white' : 'border border-gray-200 text-gray-600'
              }`}
            >
              Quero vender meu carro
            </button>
            <button
              type="button"
              onClick={() => setModo('consignar')}
              className={`text-sm font-semibold px-4 py-2 rounded-full transition ${
                modo === 'consignar' ? 'bg-brand text-white' : 'border border-gray-200 text-gray-600'
              }`}
            >
              Quero consignar meu carro
            </button>
          </div>

          <form onSubmit={enviar} className="space-y-4">
            <div className="grid sm:grid-cols-3 gap-4">
              <input required value={campos.nome} onChange={(e) => set('nome', e.target.value)} placeholder="Nome completo" className="border border-gray-200 rounded-lg px-3 py-2 text-sm" />
              <input required value={campos.telefone} onChange={(e) => set('telefone', e.target.value)} placeholder="Telefone / WhatsApp" className="border border-gray-200 rounded-lg px-3 py-2 text-sm" />
              <input type="email" value={campos.email} onChange={(e) => set('email', e.target.value)} placeholder="E-mail (opcional)" className="border border-gray-200 rounded-lg px-3 py-2 text-sm" />
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <input required value={campos.marca} onChange={(e) => set('marca', e.target.value)} placeholder="Marca" className="border border-gray-200 rounded-lg px-3 py-2 text-sm" />
              <input required value={campos.modelo} onChange={(e) => set('modelo', e.target.value)} placeholder="Modelo" className="border border-gray-200 rounded-lg px-3 py-2 text-sm" />
              <input value={campos.versao} onChange={(e) => set('versao', e.target.value)} placeholder="Versão (opcional)" className="border border-gray-200 rounded-lg px-3 py-2 text-sm" />
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <input required type="number" value={campos.ano} onChange={(e) => set('ano', e.target.value)} placeholder="Ano" className="border border-gray-200 rounded-lg px-3 py-2 text-sm" />
              <input required type="number" value={campos.km} onChange={(e) => set('km', e.target.value)} placeholder="Quilometragem" className="border border-gray-200 rounded-lg px-3 py-2 text-sm" />
              <input value={campos.placa} onChange={(e) => set('placa', e.target.value)} placeholder="Placa (opcional)" className="border border-gray-200 rounded-lg px-3 py-2 text-sm" />
            </div>

            <input required type="number" value={campos.valor} onChange={(e) => set('valor', e.target.value)} placeholder="Valor desejado (R$)" className="w-full sm:w-1/3 border border-gray-200 rounded-lg px-3 py-2 text-sm" />

            <textarea value={campos.observacoes} onChange={(e) => set('observacoes', e.target.value)} placeholder="Observações (opcional)" rows={3} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />

            <button type="submit" className="bg-brand text-white font-semibold px-6 py-3 rounded-full hover:brightness-95 transition">
              Enviar informações
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}