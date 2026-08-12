import { useState } from 'react';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';

const FAIXAS_KM = [
  { label: 'Até 30.000 Km', valor: 30000 },
  { label: 'Até 60.000 Km', valor: 60000 },
  { label: 'Até 100.000 Km', valor: 100000 },
  { label: 'Qualquer quilometragem', valor: '' },
];

const COMBUSTIVEIS = ['Flex', 'Gasolina', 'Álcool', 'Elétrico'];
const CAMBIOS = ['Automático', 'Manual'];

export default function Filtros({ filtros, onChange, onAplicar, onLimpar }) {
  const [aberto, setAberto] = useState(false);

  const set = (campo, valor) => onChange({ ...filtros, [campo]: valor });

  const toggleArray = (campo, valor) => {
    const atual = filtros[campo];
    const novo = atual.includes(valor)
      ? atual.filter((v) => v !== valor)
      : [...atual, valor];
    set(campo, novo);
  };

  const totalAtivos =
    [
      filtros.marca,
      filtros.modelo,
      filtros.ano_min,
      filtros.ano_max,
      filtros.preco_min,
      filtros.preco_max,
      filtros.km_max,
    ].filter((v) => v !== '' && v !== undefined && v !== null).length +
    filtros.combustivel.length +
    filtros.cambio.length;

  return (
    <aside className="bg-white border border-gray-100 rounded-2xl overflow-hidden h-fit">
      {/* Botão que só aparece no mobile - abre/fecha o painel de filtros */}
      <button
        type="button"
        onClick={() => setAberto((v) => !v)}
        aria-expanded={aberto}
        className="w-full md:hidden flex items-center justify-between p-5"
      >
        <span className="font-semibold flex items-center gap-2">
          <SlidersHorizontal size={18} className="text-brand" />
          Filtros
          {totalAtivos > 0 && (
            <span className="bg-brand text-white text-[11px] font-semibold w-5 h-5 rounded-full flex items-center justify-center">
              {totalAtivos}
            </span>
          )}
        </span>
        <ChevronDown
          size={18}
          className={`text-gray-400 transition-transform ${aberto ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Título fixo, só aparece no desktop */}
      <h2 className="hidden md:flex font-semibold items-center gap-2 p-5 pb-0">
        <SlidersHorizontal size={18} className="text-brand" />
        Filtros
      </h2>

      {/* Corpo do filtro - colapsa no mobile, sempre visível a partir do md */}
      <div
        className={`overflow-hidden transition-[max-height] duration-300 ease-in-out md:max-h-none ${
          aberto ? 'max-h-[1400px]' : 'max-h-0'
        }`}
      >
        <div className="p-5 pt-2 md:pt-4 space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1.5">Marca</label>
            <input
              type="text"
              value={filtros.marca}
              onChange={(e) => set('marca', e.target.value)}
              placeholder="Ex: Fiat"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Modelo</label>
            <input
              type="text"
              value={filtros.modelo}
              onChange={(e) => set('modelo', e.target.value)}
              placeholder="Ex: Punto"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Ano</label>
            <div className="flex gap-2">
              <input
                type="number"
                value={filtros.ano_min}
                onChange={(e) => set('ano_min', e.target.value)}
                placeholder="De"
                className="w-1/2 border border-gray-200 rounded-lg px-3 py-2 text-sm"
              />
              <input
                type="number"
                value={filtros.ano_max}
                onChange={(e) => set('ano_max', e.target.value)}
                placeholder="Até"
                className="w-1/2 border border-gray-200 rounded-lg px-3 py-2 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Faixa de preço</label>
            <div className="flex gap-2">
              <input
                type="number"
                value={filtros.preco_min}
                onChange={(e) => set('preco_min', e.target.value)}
                placeholder="Mín."
                className="w-1/2 border border-gray-200 rounded-lg px-3 py-2 text-sm"
              />
              <input
                type="number"
                value={filtros.preco_max}
                onChange={(e) => set('preco_max', e.target.value)}
                placeholder="Máx."
                className="w-1/2 border border-gray-200 rounded-lg px-3 py-2 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Quilometragem</label>
            <div className="space-y-1.5">
              {FAIXAS_KM.map((faixa) => (
                <label key={faixa.label} className="flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="radio"
                    name="km_max"
                    checked={filtros.km_max === faixa.valor}
                    onChange={() => set('km_max', faixa.valor)}
                    className="accent-brand"
                  />
                  {faixa.label}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Combustível</label>
            <div className="space-y-1.5">
              {COMBUSTIVEIS.map((c) => (
                <label key={c} className="flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    checked={filtros.combustivel.includes(c)}
                    onChange={() => toggleArray('combustivel', c)}
                    className="accent-brand"
                  />
                  {c}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Câmbio</label>
            <div className="space-y-1.5">
              {CAMBIOS.map((c) => (
                <label key={c} className="flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    checked={filtros.cambio.includes(c)}
                    onChange={() => toggleArray('cambio', c)}
                    className="accent-brand"
                  />
                  {c}
                </label>
              ))}
            </div>
          </div>

          <button
            onClick={() => {
              onAplicar();
              setAberto(false);
            }}
            className="w-full bg-brand text-white font-semibold text-sm py-2.5 rounded-full hover:brightness-95 transition"
          >
            Aplicar filtros
          </button>
          <button
            onClick={() => {
              onLimpar();
              setAberto(false);
            }}
            className="w-full text-gray-500 text-sm py-2.5 hover:text-gray-700 transition"
          >
            Limpar filtros
          </button>
        </div>
      </div>
    </aside>
  );
}