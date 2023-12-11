import { createI18n } from "vue-i18n";
import en from "@/assets/locales/en.json";
import fr from "@/assets/locales/fr.json";

type MessageSchema = typeof en;

type Lang = "en" | "fr";

function getDefaultLocale() {
  return window.navigator.language.split("-")[0] || "en";
}

const i18n = createI18n<[MessageSchema], Lang>({
  locale: getDefaultLocale(),
  fallbackLocale: "en",
  messages: {
    en: en,
    fr: fr,
  },
});

function changeLanguage(lang: Lang) {
  i18n.global.locale = lang;
}

export { i18n, changeLanguage };
