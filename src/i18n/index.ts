import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import enCommon from './locales/en/common.json';
import enAuth from './locales/en/auth.json';
import faCommon from './locales/fa/common.json';
import faAuth from './locales/fa/auth.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: false,

    resources: {
      en: { common: enCommon, auth: enAuth },
      fa: { common: faCommon, auth: faAuth },
    },

    ns: ['common', 'auth'],
    defaultNS: 'common',

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
