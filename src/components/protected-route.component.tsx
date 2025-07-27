import { Navigate } from 'react-router';
import { useAuthStore } from '@/stores';
import { ProtectedRouteProps } from '@/types';
// import { Loading } from '@/components';
import { authRoutes } from '@/constants';
import { useRouteNavigation } from '@/hooks';

export default function ProtectedRoute({
  children,
  meta,
}: ProtectedRouteProps) {
  const { user, isAuthenticated /*isLoading*/ } = useAuthStore();
  const { currentPath } = useRouteNavigation();

  // // Show loading state for async auth
  // if (isLoading) {
  //   return <Loading />;
  // }

  // Check if authentication is required
  if (meta?.requiresAuth && !isAuthenticated) {
    return (
      <Navigate
        to={authRoutes.login.path}
        state={{ from: currentPath }}
        replace
      />
    );
  }

  // Check role-based access
  if (meta?.roles?.length && user) {
    const userRoles = user.roles ?? [];
    const hasRequiredRole = meta.roles.some((role) => userRoles.includes(role));

    if (!hasRequiredRole) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center p-6 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold text-red-600 mb-4">
              Access Denied
            </h1>
            <p className="text-gray-600 mb-4">
              You don't have permission to access this page.
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Required roles: {meta.roles.join(', ')}
            </p>
            <a href="/" className="text-blue-600 hover:underline">
              Return to Home
            </a>
          </div>
        </div>
      );
    }
  }

  // Redirect authenticated users from auth routes
  if (isAuthenticated && currentPath.startsWith('/auth')) {
    return <Navigate to="/" replace />;
  }

  return children;
}
