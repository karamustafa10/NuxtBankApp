import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@pinia/nuxt", "@nuxtjs/i18n"],
  i18n: { vueI18n: "./i18n.config.ts" },
  pinia: {
    storesDirs: ["./stores/**", "./custom-folder/stores/**"],
  },
  plugins: ["~/plugins/toastification.js"],
});
