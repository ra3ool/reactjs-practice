import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import enCommon from './locales/en/common.json';
import enAuth from './locales/en/auth.json';
import enPanel from './locales/en/panel.json';
import faCommon from './locales/fa/common.json';
import faAuth from './locales/fa/auth.json';
import faPanel from './locales/fa/panel.json';

const detectionOptions = {
  order: ['localStorage', 'navigator'],
  caches: ['localStorage'],
};

const applyDirection = (lng?: string) => {
  const dir = lng === 'fa' ? 'rtl' : 'ltr';
  document.documentElement.dir = dir;
  if (lng) {
    document.documentElement.lang = lng;
  }
};

i18n.use(LanguageDetector).use(initReactI18next).init({
  fallbackLng: 'en',
  debug: false,
  detection: detectionOptions,

  resources: {
    en: { common: enCommon, auth: enAuth, panel: enPanel },
    fa: { common: faCommon, auth: faAuth, panel: faPanel },
  },

  ns: ['common', 'auth', 'panel'],
  defaultNS: 'common',

  interpolation: {
    escapeValue: false,
  },

  initImmediate: false,
});

i18n.on('languageChanged', (lng) => applyDirection(lng));
applyDirection(i18n.resolvedLanguage);

export default i18n;
