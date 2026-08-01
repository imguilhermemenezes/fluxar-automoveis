import { useState } from 'react';

const VALORES_PADRAO = {
  marca: '',
  modelo: '',
  versao: '',
  ano: '',
  cor: '',
  quilometragem: '',
  combustivel: 'Flex',
  cambio: 'Manual',
  carroceria: '',
  portas: '4',
  preco: '',
  descricao: '',
  opcionais: '',
  status: 'disponivel',
  destaque: false,
  em_oferta: false,
};

function Campo({ label, value, onChange, ...rest }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1.5">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
        {...rest}
      />
    </div>
  );
}

function Selecao({ label, value, onChange, opcoes }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1.5">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
      >
        {opcoes.map((o) =>
          typeof o === 'string' ? (
            <option key={o} value={o}>{o}</option>
          ) : (
            <option key={o.valor} value={o.valor}>{o.texto}</option>
          )
        )}
      </select>
    </div>
  );
}

export default function VeiculoForm({ valoresIniciais, aoSalvar, salvando }) {
  const [dados, setDados] = useState(() => ({
    ...VALORES_PADRAO,
    ...valoresIniciais,
    opcionais: Array.isArray(valoresIniciais?.opcionais)
      ? valoresIniciais.opcionais.join(', ')
      : valoresIniciais?.opcionais ?? '',
  }));
  const [erro, setErro] = useState(null);

  const set = (campo, valor) => setDados((d) => ({ ...d, [campo]: valor }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro(null);
    try {
      await aoSalvar({
        ...dados,
        opcionais: dados.opcionais
          ? dados.opcionais.split(',').map((s) => s.trim()).filter(Boolean)
          : [],
      });
    } catch {
      setErro('Não foi possível salvar. Confere os campos e tenta de novo.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white border border-gray-100 rounded-2xl p-6">
        <h2 className="font-semibold mb-4">Dados básicos</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <Campo label="Marca" required value={dados.marca} onChange={(v) => set('marca', v)} />
          <Campo label="Modelo" required value={dados.modelo} onChange={(v) => set('modelo', v)} />
          <Campo label="Versão" value={dados.versao} onChange={(v) => set('versao', v)} />
          <Campo label="Ano" required type="number" value={dados.ano} onChange={(v) => set('ano', v)} />
          <Campo label="Cor" required value={dados.cor} onChange={(v) => set('cor', v)} />
          <Campo label="Carroceria" required value={dados.carroceria} onChange={(v) => set('carroceria', v)} placeholder="Ex: Hatch, SUV" />
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl p-6">
        <h2 className="font-semibold mb-4">Mecânica</h2>
        <div className="grid sm:grid-cols-4 gap-4">
          <Selecao label="Combustível" value={dados.combustivel} onChange={(v) => set('combustivel', v)} opcoes={['Flex', 'Gasolina', 'Álcool', 'Elétrico']} />
          <Selecao label="Câmbio" value={dados.cambio} onChange={(v) => set('cambio', v)} opcoes={['Manual', 'Automático']} />
          <Campo label="Portas" required type="number" value={dados.portas} onChange={(v) => set('portas', v)} />
          <Campo label="Quilometragem" required type="number" value={dados.quilometragem} onChange={(v) => set('quilometragem', v)} />
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl p-6">
        <h2 className="font-semibold mb-4">Preço e status</h2>
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <Campo label="Preço (R$)" required type="number" value={dados.preco} onChange={(v) => set('preco', v)} />
          <Selecao
            label="Status"
            value={dados.status}
            onChange={(v) => set('status', v)}
            opcoes={[
              { valor: 'disponivel', texto: 'Disponível' },
              { valor: 'vendido', texto: 'Vendido' },
              { valor: 'indisponivel', texto: 'Indisponível' },
            ]}
          />
        </div>
        <div className="flex gap-6">
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input type="checkbox" checked={dados.destaque} onChange={(e) => set('destaque', e.target.checked)} className="accent-brand" />
            Marcar como destaque
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input type="checkbox" checked={dados.em_oferta} onChange={(e) => set('em_oferta', e.target.checked)} className="accent-brand" />
            Marcar como oferta
          </label>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl p-6">
        <h2 className="font-semibold mb-4">Descrição e opcionais</h2>
        <label className="block text-sm font-medium mb-1.5">Descrição</label>
        <textarea
          value={dados.descricao}
          onChange={(e) => set('descricao', e.target.value)}
          rows={4}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mb-4"
        />
        <label className="block text-sm font-medium mb-1.5">Opcionais</label>
        <input
          value={dados.opcionais}
          onChange={(e) => set('opcionais', e.target.value)}
          placeholder="Ar condicionado, Direção elétrica, Vidro elétrico..."
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
        />
        <p className="text-xs text-gray-400 mt-1.5">Separe os itens por vírgula.</p>
      </div>

      {erro && <p className="text-sm text-red-600">{erro}</p>}

      <button
        type="submit"
        disabled={salvando}
        className="bg-brand text-white font-semibold px-6 py-3 rounded-full hover:brightness-95 transition disabled:opacity-60"
      >
        {salvando ? 'Salvando...' : 'Salvar veículo'}
      </button>
    </form>
  );
}