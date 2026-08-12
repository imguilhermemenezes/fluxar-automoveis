import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import logoFluxarBranca from '../../assets/logo-fluxar-branca.png';
import logoFluxar from '../../assets/logo-fluxar.png';

export default function Login() {
  const { usuario, login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [lembrar, setLembrar] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erro, setErro] = useState(null);
  const [enviando, setEnviando] = useState(false);

  if (usuario) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro(null);
    setEnviando(true);
    try {
      await login(email, senha, lembrar);
      navigate('/admin');
    } catch {
      setErro('E-mail ou senha inválidos.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      <div className="hidden md:flex flex-col justify-between bg-[#1b1b18] text-white p-10">
        <div>
          <img src={logoFluxarBranca} alt="Fluxar Automóveis" className="h-9 w-auto" />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold mb-2">
            <span className="text-brand">Bem-vindo</span> de volta!
          </h1>
          <p className="text-gray-300 max-w-xs">
            Acesse o painel administrativo para gerenciar os veículos da vitrine.
          </p>
        </div>
        <p className="text-xs text-gray-500">
          © 2026 Fluxar Automóveis. Todos os direitos reservados.
        </p>
      </div>

      <div className="flex items-center justify-center p-6 sm:p-8">
        <div className="w-full max-w-sm">
          <img src={logoFluxar} alt="Fluxar Automóveis" className="h-8 w-auto mx-auto mb-6 md:hidden" />

          <h2 className="text-2xl font-extrabold text-center mb-1">Login</h2>
          <p className="text-sm text-gray-500 text-center mb-8">
            Entre com suas credenciais para continuar
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">E-mail</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Digite seu e-mail"
                  className="w-full border border-gray-200 rounded-lg pl-9 pr-3 py-2.5 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Senha</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={mostrarSenha ? 'text' : 'password'}
                  required
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  placeholder="Digite sua senha"
                  className="w-full border border-gray-200 rounded-lg pl-9 pr-9 py-2.5 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setMostrarSenha((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {mostrarSenha ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between flex-wrap gap-2 text-sm">
              <label className="flex items-center gap-2 text-gray-600">
                <input
                  type="checkbox"
                  checked={lembrar}
                  onChange={(e) => setLembrar(e.target.checked)}
                  className="accent-brand"
                />
                Lembrar de mim
              </label>
              <span
                className="text-brand cursor-not-allowed opacity-60"
                title="Em breve"
              >
                Esqueci minha senha
              </span>
            </div>

            {erro && <p className="text-sm text-red-600">{erro}</p>}

            <button
              type="submit"
              disabled={enviando}
              className="w-full bg-brand text-white font-semibold py-2.5 rounded-lg hover:brightness-95 transition disabled:opacity-60"
            >
              {enviando ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <p className="text-xs text-gray-400 text-center mt-6">
            Acesso restrito · Esta área é exclusiva para administradores.
          </p>
        </div>
      </div>
    </div>
  );
}