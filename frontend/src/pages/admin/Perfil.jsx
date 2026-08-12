import { useState, useEffect } from 'react';
import { Trash2, Upload } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useConfiguracoes } from '../../context/ConfiguracoesContext';
import api from '../../services/api';

export default function Perfil() {
  const { usuario, atualizarUsuario } = useAuth();
  const configuracoes = useConfiguracoes();

  // --- Meus dados ---
  const [nome, setNome] = useState(usuario?.name ?? '');
  const [email, setEmail] = useState(usuario?.email ?? '');
  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [novaSenhaConfirm, setNovaSenhaConfirm] = useState('');
  const [salvandoPerfil, setSalvandoPerfil] = useState(false);
  const [erroPerfil, setErroPerfil] = useState(null);
  const [sucessoPerfil, setSucessoPerfil] = useState(false);

  const salvarPerfil = async (e) => {
    e.preventDefault();
    setErroPerfil(null);
    setSucessoPerfil(false);
    setSalvandoPerfil(true);
    try {
      const res = await api.put('/perfil', {
        name: nome,
        email,
        senha_atual: senhaAtual,
        nova_senha: novaSenha || undefined,
        nova_senha_confirmation: novaSenhaConfirm || undefined,
      });
      atualizarUsuario(res.data);
      setSenhaAtual('');
      setNovaSenha('');
      setNovaSenhaConfirm('');
      setSucessoPerfil(true);
    } catch (err) {
      setErroPerfil(err.response?.data?.message ?? 'Não foi possível salvar. Confere os dados.');
    } finally {
      setSalvandoPerfil(false);
    }
  };

  // --- WhatsApp ---
  const [whatsapp, setWhatsapp] = useState('');
  const [salvandoWhatsapp, setSalvandoWhatsapp] = useState(false);
  const [sucessoWhatsapp, setSucessoWhatsapp] = useState(false);

  const formatarWhatsapp = (valor) => {
    const numeros = valor.replace(/\D/g, '').slice(0, 11);
    if (numeros.length === 0) {
      return '';
    }
    if (numeros.length <= 2) {
      return `(${numeros}`;
    }
    if (numeros.length <= 3) {
      return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
    }
    if (numeros.length <= 7) {
      return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 3)} ${numeros.slice(3)}`;
    }
    return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 3)} ${numeros.slice(3, 7)}-${numeros.slice(7, 11)}`;
  };

  useEffect(() => {
    if (configuracoes?.whatsapp_numero) {
      let numero = configuracoes.whatsapp_numero.replace(/\D/g, '');
      if (numero.startsWith('55') && numero.length === 13) {
        numero = numero.slice(2);
      }
      setWhatsapp(numero);
    }
  }, [configuracoes]);

  const salvarWhatsapp = async (e) => {
    e.preventDefault();
    setSalvandoWhatsapp(true);
    setSucessoWhatsapp(false);
    try {
      const numero = whatsapp.replace(/\D/g, '');
      const numeroCompleto = `55${numero}`;
      await api.put('/configuracoes', {
        whatsapp_numero: numeroCompleto,
      });
      setSucessoWhatsapp(true);
    } finally {
      setSalvandoWhatsapp(false);
    }
  };

  // --- Fotos da loja ---
  const [fotos, setFotos] = useState([]);
  const [enviandoFoto, setEnviandoFoto] = useState(false);

  const buscarFotos = () => {
    api.get('/fotos-loja').then((res) => setFotos(res.data));
  };

  useEffect(() => {
    buscarFotos();
  }, []);

  const enviarFotos = async (arquivos) => {
    if (!arquivos.length) return;
    setEnviandoFoto(true);
    const formData = new FormData();
    for (const arquivo of arquivos) formData.append('imagens[]', arquivo);
    try {
      await api.post('/fotos-loja', formData);
      buscarFotos();
    } finally {
      setEnviandoFoto(false);
    }
  };

  const excluirFoto = async (id) => {
    await api.delete(`/fotos-loja/${id}`);
    buscarFotos();
  };

  return (
    <div className="p-4 sm:p-6 md:p-10 max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold mb-1">Perfil e configurações</h1>
        <p className="text-gray-500 text-sm">
          Gerencie seus dados de acesso e as informações da concessionária.
        </p>
      </div>

      {/* Meus dados */}
      <form onSubmit={salvarPerfil} className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-6">
        <h2 className="font-semibold mb-1">Meus dados</h2>
        <p className="text-xs text-gray-400 mb-4">
          Pra trocar o e-mail ou a senha, informa sua senha atual por segurança.
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1.5">Nome</label>
            <input
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1.5">Senha atual</label>
            <input
              type="password"
              value={senhaAtual}
              onChange={(e) => setSenhaAtual(e.target.value)}
              placeholder="Só se for trocar e-mail/senha"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Nova senha</label>
            <input
              type="password"
              value={novaSenha}
              onChange={(e) => setNovaSenha(e.target.value)}
              placeholder="Deixe em branco pra manter"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Confirmar nova senha</label>
            <input
              type="password"
              value={novaSenhaConfirm}
              onChange={(e) => setNovaSenhaConfirm(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
            />
          </div>
        </div>

        {erroPerfil && <p className="text-sm text-red-600 mb-3">{erroPerfil}</p>}
        {sucessoPerfil && <p className="text-sm text-green-600 mb-3">Dados atualizados!</p>}

        <button
          type="submit"
          disabled={salvandoPerfil}
          className="w-full sm:w-auto bg-brand text-white font-semibold px-5 py-2.5 rounded-full text-sm hover:brightness-95 transition disabled:opacity-60"
        >
          {salvandoPerfil ? 'Salvando...' : 'Salvar dados'}
        </button>
      </form>

      {/* WhatsApp */}
      <form onSubmit={salvarWhatsapp} className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-6 mb-6">
        <h2 className="font-semibold mb-1">WhatsApp da concessionária</h2>
        <p className="text-xs text-gray-400 mb-4">Informe o número de WhatsApp da concessionária.</p>
        <label className="block text-sm font-medium mb-1.5">Número</label>
        <input
          type="tel"
          value={formatarWhatsapp(whatsapp)}
          onChange={(e) => {
            const numeros = e.target.value
              .replace(/\D/g, '')
              .slice(0, 11);

            setWhatsapp(numeros);
          }}
          placeholder="Ex: (61) 9 5821-5252"
          maxLength={16}
          className="w-full sm:w-72 border border-gray-200 rounded-lg px-3 py-2 text-sm mb-4"
        />

        {sucessoWhatsapp && (
          <p className="text-sm text-green-600 mb-3">
            Número atualizado!
          </p>
        )}

        <div>
          <button
            type="submit"
            disabled={salvandoWhatsapp}
            className="w-full sm:w-auto bg-brand text-white font-semibold px-5 py-2.5 rounded-full text-sm hover:brightness-95 transition disabled:opacity-60"
          >
            {salvandoWhatsapp ? 'Salvando...' : 'Salvar número'}
          </button>
        </div>
      </form>

      {/* Fotos da loja */}
      <div className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-6">
        <h2 className="font-semibold mb-1">Fotos da loja</h2>
        <p className="text-xs text-gray-400 mb-4">
          Aparecem na seção "Conheça nossa loja" da página Sobre.
        </p>

        {fotos.length > 0 && (
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-4">
            {fotos.map((foto) => (
              <div key={foto.id} className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 group">
                <img src={foto.url} alt="" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => excluirFoto(foto.id)}
                  className="absolute inset-0 bg-black/40 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition flex items-center justify-center"
                >
                  <Trash2 size={16} className="text-white" />
                </button>
              </div>
            ))}
          </div>
        )}

        <label className="flex items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-xl py-6 text-sm text-gray-500 cursor-pointer hover:border-brand hover:text-brand transition">
          <Upload size={16} />
          {enviandoFoto ? 'Enviando...' : 'Clique pra adicionar fotos'}
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            disabled={enviandoFoto}
            onChange={(e) => enviarFotos(Array.from(e.target.files))}
          />
        </label>
      </div>
    </div>
  );
}