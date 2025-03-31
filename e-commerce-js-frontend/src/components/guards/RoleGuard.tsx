import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { User } from "../../models/user.interface";

interface RoleGuardProps {
  children: ReactNode;
  allowedRoles: string[];
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
}

const RoleGuard = ({
  children,
  allowedRoles,
  isAuthenticated,
  user,
  isLoading,
}: RoleGuardProps) => {
  const location = useLocation();

  if (isLoading) {
    return <div className="loading-spinner">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default RoleGuard;
