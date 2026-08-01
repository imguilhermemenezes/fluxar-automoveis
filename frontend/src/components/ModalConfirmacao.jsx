import { AlertTriangle } from 'lucide-react';

export default function ModalConfirmacao({
  aberto,
  titulo,
  descricao,
  textoConfirmar = 'Confirmar',
  onConfirmar,
  onCancelar,
}) {
  if (!aberto) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
        <div className="w-11 h-11 rounded-full bg-red-50 flex items-center justify-center mb-4">
          <AlertTriangle size={20} className="text-red-600" />
        </div>
        <h2 className="font-semibold mb-1">{titulo}</h2>
        <p className="text-sm text-gray-500 mb-6">{descricao}</p>
        <div className="flex gap-3">
          <button
            onClick={onCancelar}
            className="flex-1 border border-gray-200 text-gray-700 font-medium text-sm py-2.5 rounded-full hover:bg-gray-50 transition"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirmar}
            className="flex-1 bg-red-600 text-white font-semibold text-sm py-2.5 rounded-full hover:bg-red-700 transition"
          >
            {textoConfirmar}
          </button>
        </div>
      </div>
    </div>
  );
}