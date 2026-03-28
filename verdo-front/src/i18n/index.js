import { createI18n } from "vue-i18n";
import en from "./en";
import fr from "./fr";
import ar from "./ar";

const normalizedFr = {
  ...fr,
  header: {
    ...fr.header,
    geoai: fr.header?.geoai || "Service GeoAI",
    themes: {
      standard: fr.header?.themes?.standard || "Theme Standard",
      dark: fr.header?.themes?.dark || "Sombre",
      light: fr.header?.themes?.light || "Clair",
      spring: fr.header?.themes?.spring || "Printemps",
    },
  },
  footer: fr.footer || fr.about?.footer,
  login: fr.login || fr.about?.login,
  register: fr.register || fr.about?.register,
  profile: fr.profile || fr.about?.profile,
};

const normalizedAr = {
  ...ar,
  header: {
    ...ar.header,
    geoai: ar.header?.geoai || "خدمة GeoAI",
    themes: {
      standard: ar.header?.themes?.standard || "السمة القياسية",
      dark: ar.header?.themes?.dark || "داكن",
      light: ar.header?.themes?.light || "فاتح",
      spring: ar.header?.themes?.spring || "ربيعي",
    },
  },
};

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem("language")?.toLowerCase() || "en",
  fallbackLocale: "en",
  messages: {
    en,
    fr: normalizedFr,
    ar: normalizedAr,
  },
  globalInjection: true,
});

export default i18n;
