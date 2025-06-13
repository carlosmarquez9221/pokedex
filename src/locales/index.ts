import { createI18n } from 'vue-i18n';
import en from './en';
import es from './es';

type MessageSchema = {
  pokemon: {
    name: string;
    height: string;
    weight: string;
  };
  buttons: {
    search: string;
  };
};

const getBrowserLanguage = (): 'es' | 'en' => {
  const browserLang = navigator.language || 'es';
  return browserLang.startsWith('es') ? 'es' : 'en';
};

const i18n = createI18n<[MessageSchema], 'es' | 'en'>({
  legacy: false,
  locale: getBrowserLanguage(),
  fallbackLocale: 'en',
  messages: { en, es },
});

export default i18n;