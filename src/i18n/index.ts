import i18n from 'i18next';
// import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import en from './locales/en/common.json';
import fa from './locales/fa/common.json';

i18n
  // .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: false,

    resources: {
      en: { common: en },
      fa: { common: fa },
    },

    ns: ['common'],
    defaultNS: 'common',

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
