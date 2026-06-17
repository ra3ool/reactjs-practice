import { useConfirm } from '@/hooks';
import { useAuthStore } from '@/stores';
import { useCallback } from 'react';
import { toast } from 'react-toastify';

export function useAuthBridge() {
  const logout = useAuthStore((s) => s.logout);
  const { confirm } = useConfirm();

  const logoutWithToast = useCallback(async () => {
    const ok = await confirm({
      title: 'Log out?',
      message: "You'll need to sign in again to access your account.",
      confirmText: 'Log out',
      variant: 'danger',
    });
    if (!ok) return;

    const response = await logout();
    if (response.status) {
      toast.success(response.message);
      // navigateTo(baseRoutes.home.name as string, { replace: true });
    }
  }, [logout, confirm]);

  return { logoutWithToast };
}
