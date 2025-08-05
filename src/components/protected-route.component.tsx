import { authRoutes } from '@/constants';
import { useAcl, useRouteNavigation } from '@/hooks';
import { useAuthStore } from '@/stores';
import { ProtectedRouteProps } from '@/types';
import AccessDeniedView from '@/views/Errors/AccessDenied.view';
import { Navigate } from 'react-router';

export default function ProtectedRoute({
  children,
  meta,
}: ProtectedRouteProps) {
  const { isAuthenticated } = useAuthStore();
  const { currentPath, currentName } = useRouteNavigation();
  const acl = useAcl();

  if (meta?.requiresAuth && !isAuthenticated) {
    return (
      <Navigate
        to={authRoutes.login.path as string}
        state={{ from: currentPath }} //TODO work with states later
        replace
      />
    );
  }

  if (!acl.canAccessRoute(currentName)) {
    // return <Navigate to="/" replace />;
    return <AccessDeniedView />;
  }

  if (
    isAuthenticated &&
    currentPath.startsWith(authRoutes.root.path as string)
  ) {
    return <Navigate to="/" replace />;
  }

  return children;
}
