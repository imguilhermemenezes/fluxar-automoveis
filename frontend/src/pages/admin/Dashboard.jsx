import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Car, Star, Tag, Plus } from 'lucide-react';
import api from '../../services/api';

const STATUS_LABEL = {
  disponivel: { label: 'Disponível', className: 'bg-green-100 text-green-700' },
  vendido: { label: 'Vendido', className: 'bg-gray-100 text-gray-600' },
  indisponivel: { label: 'Indisponível', className: 'bg-gray-100 text-gray-600' },
};

export default function Dashboard() {
  const [dados, setDados] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    api
      .get('/dashboard')
      .then((res) => setDados(res.data))
      .finally(() => setCarregando(false));
  }, []);

  const cards = dados && [
    { label: 'Veículos cadastrados', valor: dados.veiculos_cadastrados, sub: 'Total de veículos em estoque', Icon: Car },
    { label: 'Em destaque', valor: dados.em_destaque, sub: 'Veículos marcados como destaque', Icon: Star },
    { label: 'Ofertas ativas', valor: dados.ofertas_ativas, sub: 'Veículos em promoção', Icon: Tag },
  ];

  const ultimosVeiculos = dados?.ultimos_veiculos?.data ?? [];

  return (
    <div className="p-6 md:p-10">
      <h1 className="text-2xl font-extrabold mb-1">Bem-vindo ao CMS da Fluxar</h1>
      <p className="text-gray-500 mb-8">Gerencie os veículos que aparecem na vitrine do site.</p>

      {carregando && <p className="text-sm text-gray-500">Carregando...</p>}

      {cards && (
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          {cards.map(({ label, valor, sub, Icon }) => (
            <div key={label} className="bg-white border border-gray-100 rounded-2xl p-5">
              <div className="w-10 h-10 rounded-full bg-brand-light flex items-center justify-center mb-3">
                <Icon size={18} className="text-brand" />
              </div>
              <p className="text-sm text-gray-500">{label}</p>
              <p className="text-2xl font-extrabold mb-0.5">{valor}</p>
              <p className="text-xs text-gray-400">{sub}</p>
            </div>
          ))}
        </div>
      )}

      <div className="bg-brand-light rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <p className="font-semibold">Cadastrar novo veículo</p>
          <p className="text-sm text-gray-600">
            Adicione um novo veículo à vitrine e aumente suas chances de negócio.
          </p>
        </div>
        <Link
          to="/admin/veiculos/novo"
          className="inline-flex items-center gap-2 bg-brand text-white font-semibold px-5 py-2.5 rounded-full hover:brightness-95 transition shrink-0"
        >
          <Plus size={16} />
          Cadastrar veículo
        </Link>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold">Últimos veículos cadastrados</h2>
          <Link to="/admin/veiculos" className="text-sm text-brand font-medium">
            Ver todos
          </Link>
        </div>

        {!carregando && ultimosVeiculos.length === 0 && (
          <p className="text-sm text-gray-500">Nenhum veículo cadastrado ainda.</p>
        )}

        {ultimosVeiculos.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-400 border-b border-gray-100">
                  <th className="font-medium pb-3">Veículo</th>
                  <th className="font-medium pb-3">Ano</th>
                  <th className="font-medium pb-3">Preço</th>
                  <th className="font-medium pb-3">Status</th>
                  <th className="font-medium pb-3">Data</th>
                </tr>
              </thead>
              <tbody>
                {ultimosVeiculos.map((v) => {
                  const status = STATUS_LABEL[v.status] ?? STATUS_LABEL.disponivel;
                  return (
                    <tr key={v.id} className="border-b border-gray-50 last:border-0">
                      <td className="py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gray-100 shrink-0" />
                          <span className="font-medium whitespace-nowrap">
                            {v.marca} {v.modelo}
                          </span>
                        </div>
                      </td>
                      <td>{v.ano}</td>
                      <td className="whitespace-nowrap">
                        {Number(v.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </td>
                      <td>
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${status.className}`}>
                          {status.label}
                        </span>
                      </td>
                      <td className="text-gray-500 whitespace-nowrap">
                        {new Date(v.criado_em).toLocaleDateString('pt-BR')}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}