import { DIRECTIONS, LANGUAGES } from '@/constants';
import { useTranslation } from 'react-i18next';

export const useI18n = () => {
  const { i18n } = useTranslation();

  const direction = i18n.dir();
  const language = i18n.resolvedLanguage || i18n.language || LANGUAGES.en;
  const isRTL = direction === DIRECTIONS.rtl;
  const isLTR = direction === DIRECTIONS.ltr;
  const isEnglish = language === LANGUAGES.en;
  const isPersian = language === LANGUAGES.fa;

  return {
    direction,
    language,
    isRTL,
    isLTR,
    isEnglish,
    isPersian,
    getDirectionalClass: (rtlClass: string, ltrClass: string) =>
      isRTL ? rtlClass : ltrClass,
  };
};
