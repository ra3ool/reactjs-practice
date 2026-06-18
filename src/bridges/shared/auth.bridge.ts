import { useConfirm } from '@/hooks';
import { useAuthStore } from '@/stores';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

export function useAuthBridge() {
  const logout = useAuthStore((s) => s.logout);
  const { confirm } = useConfirm();
  const { t } = useTranslation('auth');

  const logoutWithToast = useCallback(async () => {
    await confirm({
      title: 'Log out?',
      message: "You'll need to sign in again to access your account.",
      confirmText: 'Log out',
      variant: 'danger',
      onConfirm: async () => {
        await logout();
        toast.success(t('logout.success'));
        // navigateTo(baseRoutes.home.name as string, { replace: true });
      },
    });
  }, [confirm, logout, t]);

  return { logoutWithToast };
}
