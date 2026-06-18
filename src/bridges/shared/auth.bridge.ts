import { useConfirm } from '@/hooks';
import { useAuthStore } from '@/stores';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

export function useAuthBridge() {
  const logout = useAuthStore((s) => s.logout);
  const { confirm } = useConfirm();
  const { t } = useTranslation('auth');

  const logoutWithConfirm = useCallback(async () => {
    await confirm({
      title: t('logout.confirmTitle'),
      message: t('logout.confirmMessage'),
      confirmText: t('logout.confirmButton'),
      cancelText: t('logout.cancelButton'),
      variant: 'danger',
      onConfirm: async () => {
        await logout();
        toast.success(t('logout.success'));
        // navigateTo(baseRoutes.home.name as string, { replace: true });
      },
    });
  }, [confirm, logout, t]);

  return { logoutWithConfirm };
}
