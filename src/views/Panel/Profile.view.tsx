import { CustomInput } from '@/components/custom-input.component';
import { useHeader } from '@/contexts';
import { useAuthStore } from '@/stores';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function ProfileView() {
  const user = useAuthStore((s) => s.user);
  const { setHeaderTitle } = useHeader();
  const { t } = useTranslation('panel');

  useEffect(() => {
    setHeaderTitle(t('profile.header'));
  }, [setHeaderTitle, t]);

  if (!user) {
    return (
      <div className="text-center text-gray-500 mt-10">
        {t('profile.noUser')}
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto space-y-6 w-full">
      <h1 className="text-3xl font-bold text-text-primary">
        {t('profile.title')}
      </h1>

      <div className="rounded-xl bg-bg-primary text-text-primary p-6 shadow space-y-4">
        <CustomInput
          name="username"
          label={t('profile.username')}
          value={user.username}
          disabled
        />
        <CustomInput
          name="email"
          label={t('profile.email')}
          value={user.email}
          disabled
        />
        <CustomInput
          name="role"
          label={t('profile.role')}
          value={user.role}
          disabled
        />
      </div>
    </div>
  );
}
