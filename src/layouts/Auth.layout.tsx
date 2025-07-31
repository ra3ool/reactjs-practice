import { LayoutContent } from '@/components';
import { Outlet } from 'react-router';

export default function AuthLayout() {
  return (
    <LayoutContent className="auth-layout flex h-full w-full gap-4">
      <Outlet />
    </LayoutContent>
  );
}
