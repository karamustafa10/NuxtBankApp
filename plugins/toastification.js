// plugins/toastification.js
import { defineNuxtPlugin } from "#app";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Toast, {
    // You can set your default options here
  });
});
