import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

function getTokenSalvo() {
  return localStorage.getItem('token') || sessionStorage.getItem('token');
}

function limparToken() {
  localStorage.removeItem('token');
  sessionStorage.removeItem('token');
}

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    if (!getTokenSalvo()) {
      setCarregando(false);
      return;
    }
    api
      .get('/me')
      .then((res) => setUsuario(res.data))
      .catch(() => limparToken())
      .finally(() => setCarregando(false));
  }, []);

  const login = async (email, password, lembrar) => {
    const res = await api.post('/login', { email, password });
    const storage = lembrar ? localStorage : sessionStorage;
    storage.setItem('token', res.data.token);
    setUsuario(res.data.user);
  };

  const logout = async () => {
    try {
      await api.post('/logout');
    } catch {
      // segue o baile mesmo se a chamada falhar — o importante é limpar localmente
    }
    limparToken();
    setUsuario(null);
  };

  const atualizarUsuario = (dadosNovos) => {
    setUsuario((u) => ({ ...u, ...dadosNovos }));
  };

  return (
    <AuthContext.Provider value={{ usuario, carregando, login, logout, atualizarUsuario }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}