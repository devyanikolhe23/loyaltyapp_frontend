import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// ✅ Import JSON translations
import en from "./locales/en.json";
import hi from "./locales/hi.json";

// ... import all other languages

const resources = {
  en: { translation: en },
  hi: { translation: hi },

  // ... add all other languages
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // default language
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
