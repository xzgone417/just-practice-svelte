import { dictionary, locale, _ } from "svelte-i18n";
import { init, register, getLocaleFromNavigator } from "svelte-i18n";

register("en", () => import("../locale/en.json"));
register("zh-CN", () => import("../locale/zh-CN.json"));
register("zh-TW", () => import("../locale/zh-TW.json"));
register("th", () => import("../locale/th.json"));
init({
  fallbackLocale: "en",
  initialLocale: getLocaleFromNavigator(),
});

// function setupI18n(withLocale = "en") {
//   //   dictionary.set({
//   //     en: {
//   //     },
//   //     zh: {
//   //     },
//   //   });
//   //   locale.set(_locale);
//   locale.set(withLocale);
// }
export { _ as t, locale };
