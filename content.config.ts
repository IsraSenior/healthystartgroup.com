import { defineContentConfig, defineCollection } from '@nuxt/content';
import { asSeoCollection } from '@nuxtjs/seo/content';

export default defineContentConfig({
  collections: {
    services_en: defineCollection(
      asSeoCollection({
        type: 'page',
        source: {
          include: 'en/services/**',
          prefix: '',
        },
      })
    ),

    testimonials_en: defineCollection(
      asSeoCollection({
        type: 'page',
        source: {
          include: 'en/testimonials/**',
          prefix: '',
        },
      })
    ),

    articles_en: defineCollection(
      asSeoCollection({
        type: 'page',
        source: {
          include: 'en/articles/**',
          prefix: '',
        },
      })
    ),

    services_es: defineCollection(
      asSeoCollection({
        type: 'page',
        source: {
          include: 'es/services/**',
          prefix: '',
        },
      })
    ),

    testimonials_es: defineCollection(
      asSeoCollection({
        type: 'page',
        source: {
          include: 'es/testimonials/**',
          prefix: '',
        },
      })
    ),

    articles_es: defineCollection(
      asSeoCollection({
        type: 'page',
        source: {
          include: 'es/articles/**',
          prefix: '',
        },
      })
    ),
  },
});
