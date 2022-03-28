import Vue from "vue";
import VueI18n from "vue-i18n";
import localeEnTranslation from "./locales/en.json";
import localeViTranslation from "./locales/vi.json";

const enTranslation = { ...localeEnTranslation };
const viTranslation = { ...localeViTranslation };

Vue.use(VueI18n);

export default new VueI18n({
  locale: process.env.VUE_APP_I18N_LOCALE || "vi",
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || "vi",
  messages: {
    vi: viTranslation,
    en: enTranslation,
  },
});
