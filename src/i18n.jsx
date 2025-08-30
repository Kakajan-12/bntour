import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en/translation.json';
import rus from './locales/rus/translation.json';
import tkm from './locales/tkm/translation.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      rus: { translation: rus },
      tkm: { translation: tkm },
    },
    lng: localStorage.getItem('lng') || 'en', // 👈 загружаем язык из localStorage
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
