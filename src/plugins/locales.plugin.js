import Vue from "vue";
import i18next from "i18next";
import VueI18Next from "@panter/vue-i18next";
import en from "@/locales/en";

Vue.use(VueI18Next);

i18next.init({
  lng: "en",
  resources: {
    en,
  },
});

export default new VueI18Next(i18next);
