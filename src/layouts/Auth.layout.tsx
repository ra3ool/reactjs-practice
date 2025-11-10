import { Outlet } from 'react-router';

export default function AuthLayout() {
  return (
    <div className="auth-layout flex h-full w-full gap-4">
      <Outlet />
    </div>
  );
}
