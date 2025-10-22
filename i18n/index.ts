import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as RNLocalize from "react-native-localize";

import en from "./locales/en.json";
import es from "./locales/es.json";

const resources = {
  en: { translation: en },
  es: { translation: es },
};

export const supportedLanguages = Object.keys(resources);

function detectDeviceLanguage(): string {
  const locales = RNLocalize.getLocales();
  if (Array.isArray(locales) && locales.length > 0) {
    const deviceLang = locales[0].languageCode.toLowerCase();
    return supportedLanguages.includes(deviceLang) ? deviceLang : "en";
  }
  return "en";
}

export function initI18n() {
  if (i18n.isInitialized) return i18n;

  i18n.use(initReactI18next).init({
    compatibilityJSON: "v4",
    resources,
    lng: detectDeviceLanguage(),
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });

  return i18n;
}

export default i18n;


