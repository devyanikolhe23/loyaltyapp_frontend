import { useTranslation } from "react-i18next";

export default function useAppTranslation() {
  const { t, i18n } = useTranslation();

  // ✅ Always capitalize first letter in English, others unchanged
  const tCap = (key) => {
    const text = t(key);

    // Only capitalize for English
    if (i18n.language === "en" && text && text.length > 0) {
      return text.charAt(0).toUpperCase() + text.slice(1);
    }

    // For all other languages, return as-is
    return text;
  };

  return { t: tCap, i18n };
  
}
