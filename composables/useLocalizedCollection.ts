import { toValue, type MaybeRefOrGetter } from 'vue';
import { useI18n, useAsyncData, queryCollection } from '#imports';

type CollectionQueryBuilder = ReturnType<typeof queryCollection>;

function configureBuilder(
  builder: CollectionQueryBuilder,
  limit?: number,
  configure?: (builder: CollectionQueryBuilder) => CollectionQueryBuilder
) {
  let configured = builder;

  if (configure) {
    const result = configure(configured);
    if (result) {
      configured = result;
    }
  }

  if (typeof limit === 'number' && typeof configured.limit === 'function') {
    configured = configured.limit(limit);
  }

  return configured;
}

export interface LocalizedCollectionOptions<TEntry = unknown, TResult = TEntry[]> {
  limit?: number;
  fallbackLocale?: string;
  fallbackLimit?: number;
  transform?: (entries: TEntry[]) => TResult;
  key?: MaybeRefOrGetter<string | undefined>;
  watch?: Array<MaybeRefOrGetter<unknown>>;
  query?: (builder: CollectionQueryBuilder) => CollectionQueryBuilder;
  fallbackQuery?: (builder: CollectionQueryBuilder) => CollectionQueryBuilder;
}

export function useLocalizedCollection<TEntry = unknown, TResult = TEntry[]>(
  baseName: MaybeRefOrGetter<string>,
  options: LocalizedCollectionOptions<TEntry, TResult> = {}
) {
  const { locale } = useI18n();
  const fallbackLocale = options.fallbackLocale ?? 'en';

  const keyGetter = () =>
    toValue(options.key) ?? `${toValue(baseName)}-${locale.value}`;

  const watchSources = [
    () => locale.value,
    () => toValue(baseName),
    ...((options.watch ?? []).map((source) => () => toValue(source))),
  ];

  const handler = async () => {
    const base = toValue(baseName);
    const currentCollection = `${base}_${locale.value}`;

    let entries = await configureBuilder(
      queryCollection(currentCollection),
      options.limit,
      options.query
    ).all();

    if ((!entries || entries.length === 0) && locale.value !== fallbackLocale) {
      entries = await configureBuilder(
        queryCollection(`${base}_${fallbackLocale}`),
        options.fallbackLimit ?? options.limit,
        options.fallbackQuery ?? options.query
      ).all();
    }

    const normalized = (entries ?? []) as TEntry[];

    return options.transform
      ? options.transform(normalized)
      : (normalized as unknown as TResult);
  };

  return useAsyncData<TResult>(keyGetter, handler, {
    watch: watchSources,
  });
}
