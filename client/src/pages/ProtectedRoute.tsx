import { Navigate, useLocation } from 'react-router-dom';
import { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  authPath?: string; // path to redirect when not authenticated
  isAuthPath?: boolean; // is this an auth page (login/register)
  moveTo?: string; // if is an auth path then move to
}

const ProtectedRoute = ({
  children,
  authPath = '/admin/login',
  isAuthPath = false,
  moveTo = '/admin/dashboard',
}: ProtectedRouteProps) => {
  const isAuthenticated = localStorage.getItem('token');
  const location = useLocation();

  if (isAuthPath && isAuthenticated && moveTo) {
    return <Navigate to={moveTo} replace state={{ from: location }} />;
  }

  if (!isAuthPath && !isAuthenticated) {
    return <Navigate to={authPath} replace state={{ from: location }} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
