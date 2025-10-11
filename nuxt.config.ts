// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/fonts.css", "~/assets/css/tailwind.css"],
  modules: ["@nuxt/content"],
  vite: {
    plugins: [tailwindcss()],
  },

  // i18n: {
  //   locales: [
  //     { code: 'en', name: 'English', language: 'en-US', dir: 'ltr' },
  //     { code: 'es', name: 'Spanish', language: 'es-ES' },
  //   ],
  //   strategy: 'prefix_except_default',
  //   defaultLocale: 'en',
  // }
});
