import { useAuthBridge } from '@/bridges';
import { CustomButton } from '@/components';
import { userRoles } from '@/constants';
import { useRouteNavigation } from '@/hooks';
import { useAuthStore } from '@/stores';
import { User, UserRole } from '@/types';

export default function DemoView() {
  const { navigateTo, isCurrentRoute } = useRouteNavigation();
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const updateUser = useAuthStore((s) => s.updateUser);
  const { logoutWithToast } = useAuthBridge();

  const handleLogin = () => navigateTo('login');
  const handleLogout = async () => {
    await logoutWithToast();
    navigateTo('home', { replace: true });
  };
  const handleAdminRoute = () => navigateTo('components.input');
  const handleRoleChanges = (role: UserRole) =>
    updateUser({ ...user, role } as User);

  return (
    <>
      <h1 className="text-3xl font-bold mb-8">
        React Router Best Practices Demo
      </h1>

      {/* 2-column grid for main sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Route Navigation Demo */}
        <section className="p-6 rounded-2xl bg-bg-secondary shadow-md space-y-4">
          <h2 className="text-xl font-semibold">Route Navigation</h2>
          <div className="space-y-3">
            <CustomButton onClick={() => navigateTo('home')}>
              Go to Home
            </CustomButton>
            <CustomButton onClick={() => navigateTo('about')}>
              Go to About
            </CustomButton>

            {isAuthenticated && (
              <div className="flex gap-2 flex-wrap">
                <CustomButton
                  variant={
                    userRoles.guest === user?.role ? 'primary' : 'outline'
                  }
                  onClick={() => handleRoleChanges(userRoles.guest)}
                >
                  Guest
                </CustomButton>
                <CustomButton
                  variant={
                    userRoles.user === user?.role ? 'primary' : 'outline'
                  }
                  onClick={() => handleRoleChanges(userRoles.user)}
                >
                  User
                </CustomButton>
                <CustomButton
                  variant={
                    userRoles.admin === user?.role ? 'primary' : 'outline'
                  }
                  onClick={() => handleRoleChanges(userRoles.admin)}
                >
                  Admin
                </CustomButton>
              </div>
            )}
          </div>
        </section>

        {/* Authentication Demo */}
        <section className="p-6 rounded-2xl bg-bg-secondary shadow-md space-y-4">
          <h2 className="text-xl font-semibold">Authentication Status</h2>
          <p>
            Status: {isAuthenticated ? 'Authenticated' : 'Not Authenticated'}
          </p>
          {user && (
            <div className="space-y-1">
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
        </section>

        {/* ACL Demo */}
        <section className="p-6 rounded-2xl bg-bg-secondary shadow-md space-y-4">
          <h2 className="text-xl font-semibold">Access Control (ACL)</h2>
          <p>Components section requires admin role</p>
          {isAuthenticated && user?.role === userRoles.admin ? (
            <CustomButton onClick={handleAdminRoute}>
              Access Admin Route
            </CustomButton>
          ) : (
            <p className="text-red-500 font-medium">
              You need admin role to access components
            </p>
          )}
        </section>

        {/* Route Info */}
        <section className="p-6 rounded-2xl bg-bg-secondary shadow-md space-y-3">
          <h2 className="text-xl font-semibold">Current Route Info</h2>
          <p>Home: {isCurrentRoute('home') ? '✓' : '✗'}</p>
          <p>About: {isCurrentRoute('about') ? '✓' : '✗'}</p>
          <p>Login: {isCurrentRoute('login') ? '✓' : '✗'}</p>
          <p>Register: {isCurrentRoute('register') ? '✓' : '✗'}</p>
        </section>
      </div>

      {/* Features List */}
      <section className="mt-8 p-6 rounded-2xl bg-bg-secondary shadow-md">
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
      </section>
    </>
  );
}
