import { Link } from 'react-router-dom';
import { useConfiguracoes } from '../context/ConfiguracoesContext';

export default function VeiculoCard({ veiculo }) {
  const configuracoes = useConfiguracoes();
  const preco = Number(veiculo.preco).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  const km = Number(veiculo.quilometragem).toLocaleString('pt-BR');

  const mensagem = encodeURIComponent(
    `Olá! Tenho interesse no ${veiculo.marca} ${veiculo.modelo} ${veiculo.versao ?? ''}`.trim()
  );

  const imagemPrincipal =
    veiculo.imagens?.find((img) => img.principal) ?? veiculo.imagens?.[0];

  return (
    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden flex flex-col">
      <div className="aspect-[4/3] bg-gray-100 flex items-center justify-center overflow-hidden">
        {imagemPrincipal ? (
          <img
            src={imagemPrincipal.url}
            alt={`${veiculo.marca} ${veiculo.modelo}`}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-xs text-gray-400">[ foto do veículo ]</span>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold">
          {veiculo.marca} {veiculo.modelo}
        </h3>
        <p className="text-sm text-gray-500 mb-1">
          {veiculo.ano} • {veiculo.cambio} • {veiculo.combustivel}
        </p>
        <p className="text-sm text-gray-500 mb-3">{km} Km</p>
        <p className="text-lg font-bold text-brand mb-4">{preco}</p>

        <div className="mt-auto flex gap-2">
          <a
            href={`https://wa.me/${configuracoes?.whatsapp_numero}?text=${mensagem}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center text-sm font-medium border border-green-500 text-green-600 rounded-full py-2 hover:bg-green-50 transition"
          >
            WhatsApp
          </a>
          <Link
            to={`/vitrine/${veiculo.id}`}
            className="flex-1 text-center text-sm font-medium border border-brand text-brand rounded-full py-2 hover:bg-brand-light transition"
          >
            Ver detalhes
          </Link>
        </div>
      </div>
    </div>
  );
}