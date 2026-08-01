import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { ConfiguracoesProvider } from './context/ConfiguracoesContext'
import { AuthProvider } from './context/AuthContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ConfiguracoesProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ConfiguracoesProvider>
    </BrowserRouter>
  </StrictMode>,
)