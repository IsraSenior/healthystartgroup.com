import { defineContentConfig, defineCollection } from "@nuxt/content";
import { asSeoCollection } from "@nuxtjs/seo/content";

export default defineContentConfig({
  collections: {
    content_en: defineCollection(
      asSeoCollection({
        type: "page",
        source: {
          include: "en/**",
          prefix: "",
        },
      })
    ),

    content_es: defineCollection(
      asSeoCollection({
        type: "page",
        source: {
          include: "es/**",
          prefix: "",
        },
      })
    ),
  },
});