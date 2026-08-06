import { SlidersHorizontal } from 'lucide-react';

const FAIXAS_KM = [
  { label: 'Até 30.000 Km', valor: 30000 },
  { label: 'Até 60.000 Km', valor: 60000 },
  { label: 'Até 100.000 Km', valor: 100000 },
  { label: 'Qualquer quilometragem', valor: '' },
];

const COMBUSTIVEIS = ['Flex', 'Gasolina', 'Álcool', 'Elétrico'];
const CAMBIOS = ['Automático', 'Manual'];

export default function Filtros({ filtros, onChange, onAplicar, onLimpar }) {
  const set = (campo, valor) => onChange({ ...filtros, [campo]: valor });

  const toggleArray = (campo, valor) => {
    const atual = filtros[campo];
    const novo = atual.includes(valor)
      ? atual.filter((v) => v !== valor)
      : [...atual, valor];
    set(campo, novo);
  };

  return (
    <aside className="bg-white border border-gray-100 rounded-2xl p-5 h-fit">
      <h2 className="font-semibold mb-4 flex items-center gap-2">
        <SlidersHorizontal size={18} className="text-brand" />
        Filtros
      </h2>

      <div className="space-y-5">
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
      </div>

      <button
        onClick={onAplicar}
        className="w-full bg-brand text-white font-semibold text-sm py-2.5 rounded-full mt-6 hover:brightness-95 transition"
      >
        Aplicar filtros
      </button>
      <button
        onClick={onLimpar}
        className="w-full text-gray-500 text-sm py-2.5 mt-1 hover:text-gray-700 transition"
      >
        Limpar filtros
      </button>
    </aside>
  );
}