import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface AuthGuardProps {
  children: ReactNode;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthGuard = ({
  children,
  isAuthenticated,
  isLoading,
}: AuthGuardProps) => {
  const location = useLocation();

  if (isLoading) {
    return <div className="loading-spinner">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default AuthGuard;
