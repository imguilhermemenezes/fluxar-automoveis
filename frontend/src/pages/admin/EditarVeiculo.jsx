import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import VeiculoForm from '../../components/admin/VeiculoForm';
import GerenciadorImagens from '../../components/admin/GerenciadorImagens';
import api from '../../services/api';

export default function EditarVeiculo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [veiculo, setVeiculo] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);

  const buscar = () => {
    api
      .get(`/veiculos/${id}`)
      .then((res) => setVeiculo(res.data.data))
      .finally(() => setCarregando(false));
  };

  useEffect(() => {
    buscar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const salvar = async (dados) => {
    setSalvando(true);
    try {
      await api.put(`/veiculos/${id}`, dados);
      navigate('/admin/veiculos');
    } finally {
      setSalvando(false);
    }
  };

  if (carregando) {
    return <p className="p-6 sm:p-10 text-sm text-gray-500">Carregando...</p>;
  }

  if (!veiculo) {
    return <p className="p-6 sm:p-10 text-sm text-red-600">Veículo não encontrado.</p>;
  }

  return (
    <div className="p-4 sm:p-6 md:p-10 max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold mb-1">Editar veículo</h1>
        <p className="text-gray-500 text-sm">
          {veiculo.marca} {veiculo.modelo}
        </p>
      </div>

      <GerenciadorImagens veiculoId={id} imagens={veiculo.imagens ?? []} aoAtualizar={buscar} />

      <VeiculoForm valoresIniciais={veiculo} aoSalvar={salvar} salvando={salvando} />
    </div>
  );
}