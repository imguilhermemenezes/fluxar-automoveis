import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RotaProtegida({ children }) {
  const { usuario, carregando } = useAuth();

  if (carregando) {
    return <p className="p-10 text-sm text-gray-500">Carregando...</p>;
  }

  if (!usuario) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}