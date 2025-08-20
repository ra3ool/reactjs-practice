import { authRoutes } from '@/constants';
import { useAcl } from '@/hooks';
import { useAuthStore } from '@/stores';
import { ProtectedRouteProps } from '@/types';
import AccessDeniedView from '@/views/Errors/AccessDenied.view';
import { Navigate } from 'react-router';

export default function ProtectedRoute({
  children,
  routMeta,
  routeName,
}: ProtectedRouteProps) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  // const { currentPath } = useRouteNavigation();
  const acl = useAcl();

  if (routMeta?.requiresAuth && !isAuthenticated) {
    return (
      <Navigate
        to={authRoutes?.login?.path as string}
        // state={{ from: currentPath }} //TODO work with states later
        replace
      />
    );
  }

  if (!acl.canAccessRoute(routeName)) {
    return <AccessDeniedView />;
  }

  if (
    isAuthenticated &&
    routeName?.startsWith(authRoutes?.root?.name as string)
  ) {
    return <Navigate to="/" replace />;
  }

  return children;
}
