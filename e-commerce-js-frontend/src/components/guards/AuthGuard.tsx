import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirigir al login si no está autenticado, guardando la ruta de origen
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default AuthGuard; 