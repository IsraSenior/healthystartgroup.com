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
      { code: 'en', name: 'English', language: 'en-US', file: 'en.ts' },
      { code: 'es', name: 'Spanish', language: 'es-ES', file: 'es.ts' },
    ],
    strategy: 'prefix_except_default',
    defaultLocale: 'en',
    langDir: 'locales',
  },
});
