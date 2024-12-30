import en from "./locales/en.json";
import fr from "./locales/fr.json";
import tr from "./locales/tr.json";

export default defineI18nConfig(() => {
  const locale =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("locale") || "en"
      : "en";
  return {
    legacy: false,
    locale,
    messages: {
      en,
      fr,
      tr,
    },
  };
});
