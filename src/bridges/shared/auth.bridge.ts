import { baseRoutes } from '@/constants';
import { useRouteNavigation } from '@/hooks';
import { useAuthStore } from '@/stores';
import { useCallback } from 'react';
import { toast } from 'react-toastify';

export function useAuthBridge() {
  const logout = useAuthStore((s) => s.logout);
  const { navigateTo } = useRouteNavigation();

  const logoutWithToast = useCallback(async () => {
    const response = await logout();
    if (response.status) {
      toast.success(response.message);
      navigateTo(baseRoutes.home.name as string, { replace: true });
    }
  }, [logout, navigateTo]);

  return logoutWithToast;
}
