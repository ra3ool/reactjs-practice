import { SvgLoader } from '@/components/svg-loader.component';
import { baseRoutes } from '@/constants';
import { useI18n } from '@/hooks';
import { cn } from '@/utils/cn';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

export default function HomeView() {
  const { t } = useTranslation('home');
  const { isEnglish } = useI18n();

  return (
    <div className="flex items-center justify-center h-full">
      <div className="max-w-4xl mx-auto rounded-lg shadow-xl overflow-hidden text-center py-12 px-6 sm:px-10">
        <h1
          className={cn(
            'text-5xl text-gray-900 dark:text-white mb-4',
            isEnglish ? 'font-extrabold' : 'font-bold',
          )}
        >
          {t('title')}
        </h1>
        <p className="text-xl mb-8">{t('subtitle')}</p>
        <div className="flex justify-center mb-8">
          <SvgLoader name="react" className="h-24 w-24 animate-spin-slow" />
        </div>
        <div className="space-y-4">
          <p className="text-lg">{t('description1')}</p>
          <p className="text-lg">{t('description2')}</p>
        </div>
        <div className="mt-10">
          <Link
            to={baseRoutes?.about?.path as string}
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 shadow-sm transition-colors duration-300"
          >
            {t('learnMoreButton')}
          </Link>
        </div>
      </div>
    </div>
  );
}
