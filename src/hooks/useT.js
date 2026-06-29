import { useLanguage } from "../context/LanguageContext";
import { dict } from "../i18n/dict";

export function useT() {
  const { lang } = useLanguage();
  return dict[lang];
}