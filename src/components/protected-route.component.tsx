import { authRoutes } from '@/constants';
import { useAcl, useRouteNavigation } from '@/hooks';
import { useAuthStore } from '@/stores';
import { ProtectedRouteProps } from '@/types';
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
    return <div>Access Denied, 403</div>; //TODO create 403 and 404 page later
  }

  if (
    isAuthenticated &&
    currentPath.startsWith(authRoutes.root.path as string)
  ) {
    return <Navigate to="/" replace />;
  }

  return children;
}
