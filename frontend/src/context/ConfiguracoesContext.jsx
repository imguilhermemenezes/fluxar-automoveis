import { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';

const ConfiguracoesContext = createContext(null);

export function ConfiguracoesProvider({ children }) {
  const [configuracoes, setConfiguracoes] = useState(null);

  useEffect(() => {
    api
      .get('/configuracoes')
      .then((res) => setConfiguracoes(res.data))
      .catch(() => setConfiguracoes({ whatsapp_numero: null }));
  }, []);

  return (
    <ConfiguracoesContext.Provider value={configuracoes}>
      {children}
    </ConfiguracoesContext.Provider>
  );
}

export function useConfiguracoes() {
  return useContext(ConfiguracoesContext);
}