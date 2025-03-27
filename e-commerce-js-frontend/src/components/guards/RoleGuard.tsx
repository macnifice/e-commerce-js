import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

interface RoleGuardProps {
  children: ReactNode;
  allowedRoles: string[];
}

const RoleGuard = ({ children, allowedRoles }: RoleGuardProps) => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  // Si no está autenticado, redirigir al login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Si está autenticado pero no tiene un rol permitido, redirigir a página de acceso denegado
  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  // Si está autenticado y tiene el rol adecuado, mostrar el contenido
  return <>{children}</>;
};

export default RoleGuard; 