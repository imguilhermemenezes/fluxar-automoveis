import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VeiculoForm from '../../components/admin/VeiculoForm';
import api from '../../services/api';

export default function NovoVeiculo() {
  const navigate = useNavigate();
  const [salvando, setSalvando] = useState(false);

  const salvar = async (dados) => {
    setSalvando(true);
    try {
      const res = await api.post('/veiculos', dados);
      navigate(`/admin/veiculos/${res.data.data.id}/editar`);
    } finally {
      setSalvando(false);
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-3xl">
      <h1 className="text-2xl font-extrabold mb-1">Cadastrar veículo</h1>
      <p className="text-gray-500 text-sm mb-6">
        Depois de salvar os dados, você vai poder adicionar as fotos.
      </p>
      <VeiculoForm aoSalvar={salvar} salvando={salvando} />
    </div>
  );
}