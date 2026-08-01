import { useState, useEffect, useCallback } from 'react';
import { Search } from 'lucide-react';
import api from '../services/api';
import VeiculoCard from '../components/VeiculoCard';
import Filtros from '../components/vitrine/Filtros';

const FILTROS_VAZIOS = {
  marca: '',
  modelo: '',
  ano_min: '',
  ano_max: '',
  preco_min: '',
  preco_max: '',
  km_max: '',
  combustivel: [],
  cambio: [],
};

export default function Vitrine() {
  const [veiculos, setVeiculos] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  const [busca, setBusca] = useState('');
  const [ordenar, setOrdenar] = useState('');
  const [filtrosDraft, setFiltrosDraft] = useState(FILTROS_VAZIOS);
  const [filtrosAplicados, setFiltrosAplicados] = useState(FILTROS_VAZIOS);

  const buscarVeiculos = useCallback(() => {
    setLoading(true);
    setErro(null);

    api
      .get('/veiculos', {
        params: {
          busca: busca || undefined,
          ordenar: ordenar || undefined,
          marca: filtrosAplicados.marca || undefined,
          modelo: filtrosAplicados.modelo || undefined,
          ano_min: filtrosAplicados.ano_min || undefined,
          ano_max: filtrosAplicados.ano_max || undefined,
          preco_min: filtrosAplicados.preco_min || undefined,
          preco_max: filtrosAplicados.preco_max || undefined,
          km_max: filtrosAplicados.km_max || undefined,
          combustivel: filtrosAplicados.combustivel.length ? filtrosAplicados.combustivel : undefined,
          cambio: filtrosAplicados.cambio.length ? filtrosAplicados.cambio : undefined,
        },
      })
      .then((res) => {
        setVeiculos(res.data.data);
        setTotal(res.data.meta.total);
      })
      .catch(() => setErro('Não foi possível carregar os veículos. Tenta de novo em instantes.'))
      .finally(() => setLoading(false));
  }, [busca, ordenar, filtrosAplicados]);

  useEffect(() => {
    buscarVeiculos();
  }, [buscarVeiculos]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="grid md:grid-cols-[260px_1fr] gap-8">
        <Filtros
          filtros={filtrosDraft}
          onChange={setFiltrosDraft}
          onAplicar={() => setFiltrosAplicados(filtrosDraft)}
          onLimpar={() => {
            setFiltrosDraft(FILTROS_VAZIOS);
            setFiltrosAplicados(FILTROS_VAZIOS);
          }}
        />

        <div>
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && buscarVeiculos()}
                placeholder="Pesquisar veículo, marca, modelo..."
                className="w-full border border-gray-200 rounded-full pl-9 pr-4 py-2 text-sm"
              />
            </div>

            <div className="flex items-center gap-3 text-sm">
              <span className="text-brand font-medium whitespace-nowrap">
                {total} veículo{total === 1 ? '' : 's'} encontrado{total === 1 ? '' : 's'}
              </span>
              <select
                value={ordenar}
                onChange={(e) => setOrdenar(e.target.value)}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
              >
                <option value="">Mais recentes</option>
                <option value="menor_preco">Menor preço</option>
                <option value="maior_preco">Maior preço</option>
                <option value="menor_km">Menor quilometragem</option>
              </select>
            </div>
          </div>

          {loading && <p className="text-sm text-gray-500">Carregando veículos...</p>}
          {erro && <p className="text-sm text-red-600">{erro}</p>}

          {!loading && !erro && veiculos.length === 0 && (
            <p className="text-sm text-gray-500">
              Nenhum veículo encontrado com esses filtros.
            </p>
          )}

          {!loading && !erro && veiculos.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {veiculos.map((veiculo) => (
                <VeiculoCard key={veiculo.id} veiculo={veiculo} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}