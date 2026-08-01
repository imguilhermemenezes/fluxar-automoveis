import { useState } from 'react';
import { Star, Trash2, Upload } from 'lucide-react';
import api from '../../services/api';

export default function GerenciadorImagens({ veiculoId, imagens, aoAtualizar }) {
  const [enviando, setEnviando] = useState(false);

  const enviarArquivos = async (arquivos) => {
    if (!arquivos.length) return;

    setEnviando(true);
    const formData = new FormData();
    for (const arquivo of arquivos) {
      formData.append('imagens[]', arquivo);
    }

    try {
      // Sem forçar Content-Type aqui de propósito — o axios/navegador
      // precisa gerar o boundary do multipart sozinho, senão o upload quebra.
      await api.post(`/veiculos/${veiculoId}/imagens`, formData);
      aoAtualizar();
    } finally {
      setEnviando(false);
    }
  };

  const marcarPrincipal = async (imagemId) => {
    await api.patch(`/imagens/${imagemId}`, { principal: true });
    aoAtualizar();
  };

  const excluir = async (imagemId) => {
    await api.delete(`/imagens/${imagemId}`);
    aoAtualizar();
  };

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6">
      <h2 className="font-semibold mb-4">Fotos do veículo</h2>

      {imagens.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-4">
          {imagens.map((img) => (
            <div key={img.id} className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 group">
              <img src={img.url} alt="" className="w-full h-full object-cover" />

              {img.principal && (
                <span className="absolute top-1.5 left-1.5 bg-brand text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
                  Capa
                </span>
              )}

              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                {!img.principal && (
                  <button
                    type="button"
                    onClick={() => marcarPrincipal(img.id)}
                    title="Marcar como capa"
                    className="w-8 h-8 bg-white rounded-full flex items-center justify-center"
                  >
                    <Star size={14} />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => excluir(img.id)}
                  title="Excluir"
                  className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-red-600"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <label className="flex items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-xl py-6 text-sm text-gray-500 cursor-pointer hover:border-brand hover:text-brand transition">
        <Upload size={16} />
        {enviando ? 'Enviando...' : 'Clique pra adicionar fotos'}
        <input
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          disabled={enviando}
          onChange={(e) => enviarArquivos(Array.from(e.target.files))}
        />
      </label>
    </div>
  );
}