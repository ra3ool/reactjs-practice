import { useTranslation } from 'react-i18next';

export function Loading({ loadingText }: { loadingText?: string }) {
  const { t } = useTranslation('common');
  if (loadingText) return loadingText;

  return (
    <div className="text-gray-900 dark:text-gray-100 flex items-center justify-center h-full">
      <span>{t('loading')}</span>
    </div>
  );
}
