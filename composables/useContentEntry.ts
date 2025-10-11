import type { AsyncDataOptions } from "nuxt/app";
import type { WatchSource } from "vue";

interface UseContentEntryOptions<T>
  extends Omit<AsyncDataOptions<T | null>, "watch"> {
  /**
   * Locale code to use when the localized collection has no entry.
   * Defaults to English (`en`).
   */
  fallbackLocale?: string;
  /**
   * Additional reactive sources to watch alongside the locale collection.
   */
  watch?: WatchSource[];
}

export function useContentEntry<T = unknown>(
  key: string,
  path: string,
  options: UseContentEntryOptions<T> = {}
) {
  const { collection } = useContentCollection();
  const { locale } = useI18n();

  const {
    fallbackLocale = "en",
    watch: extraWatch = [],
    ...asyncOptions
  } = options;

  return useAsyncData<T | null>(
    key,
    async () => {
      let content = await queryCollection(collection.value)
        .path(path)
        .first<T>();

      if (!content && locale.value !== fallbackLocale) {
        content = await queryCollection(`content_${fallbackLocale}`)
          .path(path)
          .first<T>();
      }

      return content ?? null;
    },
    {
      ...asyncOptions,
      watch: [collection, ...extraWatch],
    }
  );
}
