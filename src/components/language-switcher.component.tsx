import { useMemo, type ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';

const AVAILABLE_LANGS = [
  { code: 'en', labelKey: 'navigation.languageOptions.en' },
  { code: 'fa', labelKey: 'navigation.languageOptions.fa' },
];

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation('common');

  const value = i18n.resolvedLanguage || i18n.language || 'en';
  const options = useMemo(() => AVAILABLE_LANGS, []);

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const lng = event.target.value;
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex items-center gap-2 w-full">
      <select
        id="language-select"
        value={value}
        onChange={handleChange}
        className="flex-1 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        {options.map((opt) => (
          <option key={opt.code} value={opt.code} className="text-text-primary">
            {t(opt.labelKey)}
          </option>
        ))}
      </select>
    </div>
  );
}
