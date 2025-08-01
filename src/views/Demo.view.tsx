import { useRouteNavigation } from '@/hooks';
import { useAuthStore } from '@/stores';
import { CustomButton } from '@/components';
import { User, UserRole } from '@/types';

export default function DemoView() {
  const { navigateTo, isCurrentRoute } = useRouteNavigation();
  const { user, isAuthenticated, logout, updateUser } = useAuthStore();

  const handleLogin = () => {
    navigateTo('auth.login');
  };

  const handleLogout = async () => {
    await logout();
    navigateTo('home', { replace: true });
  };

  const handleAdminRoute = () => {
    navigateTo('components.input');
  };

  const handleRoleChanges = (role: UserRole) => {
    updateUser({ ...user, role } as User);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        React Router Best Practices Demo
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Route Navigation Demo */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Route Navigation</h2>
          <div className="space-y-3">
            <CustomButton onClick={() => navigateTo('home')}>
              Go to Home
            </CustomButton>
            <CustomButton onClick={() => navigateTo('about')}>
              Go to About
            </CustomButton>
            {isAuthenticated && (
              <div className="flex gap-2">
                <CustomButton
                  variant={'guest' === user?.role ? 'primary' : 'outline'}
                  onClick={() => handleRoleChanges('guest')}
                >
                  guest
                </CustomButton>
                <CustomButton
                  variant={'user' === user?.role ? 'primary' : 'outline'}
                  onClick={() => handleRoleChanges('user')}
                >
                  user
                </CustomButton>
                <CustomButton
                  variant={'admin' === user?.role ? 'primary' : 'outline'}
                  onClick={() => handleRoleChanges('admin')}
                >
                  admin
                </CustomButton>
              </div>
            )}
          </div>
        </div>

        {/* Authentication Demo */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Authentication Status</h2>
          <div className="space-y-3">
            <p>
              Status: {isAuthenticated ? 'Authenticated' : 'Not Authenticated'}
            </p>
            {user && (
              <div>
                <p>User: {user.username}</p>
                <p>Email: {user.email}</p>
                <p>Role: {user.role}</p>
              </div>
            )}
            {!isAuthenticated ? (
              <CustomButton onClick={handleLogin}>Login</CustomButton>
            ) : (
              <CustomButton onClick={handleLogout}>Logout</CustomButton>
            )}
          </div>
        </div>

        {/* ACL Demo */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Access Control (ACL)</h2>
          <div className="space-y-3">
            <p>Components section requires admin role</p>
            {isAuthenticated && user?.role === 'admin' ? (
              <CustomButton onClick={handleAdminRoute}>
                Access Admin Route
              </CustomButton>
            ) : (
              <p className="text-red-600">
                You need admin role to access components
              </p>
            )}
          </div>
        </div>

        {/* Route Information */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Current Route Info</h2>
          <div className="space-y-2">
            <p>Home: {isCurrentRoute('home') ? '✓' : '✗'}</p>
            <p>About: {isCurrentRoute('about') ? '✓' : '✗'}</p>
            <p>Login: {isCurrentRoute('auth.login') ? '✓' : '✗'}</p>
            <p>Register: {isCurrentRoute('auth.register') ? '✓' : '✗'}</p>
          </div>
        </div>
      </div>

      {/* Features List */}
      <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Implemented Features</h2>
        <ul className="space-y-2 list-disc list-inside">
          <li>✅ Route names and meta tags (like Vue Router)</li>
          <li>✅ Role-based access control (ACL)</li>
          <li>✅ Authentication guards</li>
          <li>✅ Route builder pattern</li>
          <li>✅ Type-safe route definitions</li>
          <li>✅ Programmatic navigation with route names</li>
          <li>✅ Breadcrumb navigation</li>
          <li>✅ Dynamic sidebar based on user role</li>
          <li>✅ Route protection components</li>
          <li>✅ Document title updates</li>
        </ul>
      </div>
    </div>
  );
}
