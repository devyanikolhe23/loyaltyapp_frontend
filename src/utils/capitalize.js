import i18n from "../i18n";

export function capitalizeTranslation(key) {
  const text = i18n.t(key);
  // If current language is English, capitalize first letter
  if (i18n.language === "en") {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
  // For other languages, return as is
  return text;
}
