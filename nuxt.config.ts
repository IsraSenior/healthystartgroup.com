// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/fonts.css', '~/assets/css/tailwind.css'],
  modules: ['@nuxtjs/seo', '@nuxtjs/i18n', '@nuxt/content'],
  vite: {
    plugins: [tailwindcss()],
  },

  app: {
    head: {
      titleTemplate: '%s',
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },

  content: {
    build: {
      markdown: {
        toc: {
          depth: 3,
          searchDepth: 2,
        },
      },
    },
    preview: {
      api: 'https://healthystartgroup-com.vercel.app',
    },
  },

  i18n: {
    locales: [
      { code: 'en', name: 'English', language: 'en-US', file: 'en.ts', flag: 'https://flagicons.lipis.dev/flags/4x3/us.svg' },
      { code: 'es', name: 'Spanish', language: 'es-DO', file: 'es.ts', flag: 'https://flagicons.lipis.dev/flags/4x3/do.svg' },
    ],
    strategy: 'prefix_except_default',
    defaultLocale: 'en',
    langDir: 'locales',
    compilation: {
      strictMessage: false,
      escapeHtml: false,
    },
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root', // Recommended for SEO
    },
  },
});
