import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import api from '../../services/api';
import ModalConfirmacao from '../../components/ModalConfirmacao';

const STATUS_LABEL = {
  disponivel: { label: 'Disponível', className: 'bg-green-100 text-green-700' },
  vendido: { label: 'Vendido', className: 'bg-gray-100 text-gray-600' },
  indisponivel: { label: 'Indisponível', className: 'bg-gray-100 text-gray-600' },
};

export default function VeiculosAdmin() {
  const [veiculos, setVeiculos] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [meta, setMeta] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [paraExcluir, setParaExcluir] = useState(null);

  const buscar = () => {
    setCarregando(true);
    api
      .get('/veiculos', { params: { page: pagina } })
      .then((res) => {
        setVeiculos(res.data.data);
        setMeta(res.data.meta);
      })
      .finally(() => setCarregando(false));
  };

  useEffect(() => {
    buscar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagina]);

  const confirmarExclusao = async () => {
    await api.delete(`/veiculos/${paraExcluir.id}`);
    setParaExcluir(null);
    buscar();
  };

  return (
    <div className="p-4 sm:p-6 md:p-10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-extrabold mb-1">Veículos</h1>
          <p className="text-gray-500 text-sm">Gerencie todo o estoque cadastrado.</p>
        </div>
        <Link
          to="/admin/veiculos/novo"
          className="w-full sm:w-auto justify-center inline-flex items-center gap-2 bg-brand text-white font-semibold px-5 py-2.5 rounded-full hover:brightness-95 transition"
        >
          <Plus size={16} />
          Cadastrar veículo
        </Link>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-6">
        {carregando && <p className="text-sm text-gray-500">Carregando...</p>}

        {!carregando && veiculos.length === 0 && (
          <p className="text-sm text-gray-500">Nenhum veículo cadastrado ainda.</p>
        )}

        {veiculos.length > 0 && (
          <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-400 border-b border-gray-100">
                  <th className="font-medium pb-3">Veículo</th>
                  <th className="font-medium pb-3">Ano</th>
                  <th className="font-medium pb-3">Preço</th>
                  <th className="font-medium pb-3">Status</th>
                  <th className="font-medium pb-3"></th>
                </tr>
              </thead>
              <tbody>
                {veiculos.map((v) => {
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
                      <td>
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            to={`/admin/veiculos/${v.id}/editar`}
                            className="p-2 text-gray-500 hover:text-brand transition"
                            title="Editar"
                          >
                            <Pencil size={16} />
                          </Link>
                          <button
                            onClick={() => setParaExcluir(v)}
                            className="p-2 text-gray-500 hover:text-red-600 transition"
                            title="Excluir"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {meta && meta.last_page > 1 && (
          <div className="flex items-center justify-center gap-3 mt-6 text-sm">
            <button
              disabled={pagina === 1}
              onClick={() => setPagina((p) => p - 1)}
              className="px-3 py-1.5 border border-gray-200 rounded-lg disabled:opacity-40"
            >
              Anterior
            </button>
            <span className="text-gray-500">
              Página {meta.current_page} de {meta.last_page}
            </span>
            <button
              disabled={pagina === meta.last_page}
              onClick={() => setPagina((p) => p + 1)}
              className="px-3 py-1.5 border border-gray-200 rounded-lg disabled:opacity-40"
            >
              Próxima
            </button>
          </div>
        )}
      </div>

      <ModalConfirmacao
        aberto={!!paraExcluir}
        titulo="Excluir veículo"
        descricao={
          paraExcluir
            ? `Tem certeza que deseja excluir ${paraExcluir.marca} ${paraExcluir.modelo}? Essa ação não pode ser desfeita.`
            : ''
        }
        textoConfirmar="Excluir"
        onConfirmar={confirmarExclusao}
        onCancelar={() => setParaExcluir(null)}
      />
    </div>
  );
}