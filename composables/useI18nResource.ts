import {
  ref,
  watch,
  toValue,
  onBeforeMount,
  onServerPrefetch,
  type MaybeRefOrGetter,
} from 'vue';
import { useI18n } from '#imports';

type UnknownRecord = Record<string, unknown>;

function hasIntlifySource(value: unknown): value is { loc?: { source?: unknown } } {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const maybeLoc = (value as { loc?: { source?: unknown } }).loc;
  return !!maybeLoc && typeof maybeLoc === 'object' && 'source' in maybeLoc;
}

export function unwrapIntlifyMessage(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map((item) => unwrapIntlifyMessage(item));
  }

  if (hasIntlifySource(value)) {
    const source = (value as { loc?: { source?: unknown } }).loc?.source;
    return typeof source === 'string' ? source : source ?? null;
  }

  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value as UnknownRecord).map(([key, entry]) => [
        key,
        unwrapIntlifyMessage(entry),
      ])
    );
  }

  return value;
}

function resolveByPath(source: UnknownRecord | null | undefined, path?: string | null) {
  if (!path) {
    return source;
  }

  return path
    .split('.')
    .filter(Boolean)
    .reduce<unknown>((acc, segment) => {
      if (!acc || typeof acc !== 'object') {
        return undefined;
      }

      return (acc as UnknownRecord)[segment];
    }, source as unknown);
}

export function useI18nResource<T = unknown>(
  targetPath?: MaybeRefOrGetter<string | null | undefined>
) {
  const { locale, getLocaleMessage, loadLocaleMessages } = useI18n({ useScope: 'global' });
  const data = ref<T | null>(null);
  const pending = ref(true);

  const sync = async () => {
    pending.value = true;

    try {
      const current = locale.value;
      let messages = getLocaleMessage(current) as UnknownRecord | null | undefined;

      if (!messages || Object.keys(messages).length === 0) {
        await loadLocaleMessages(current);
        messages = getLocaleMessage(current) as UnknownRecord | null | undefined;
      }

      const path = toValue(targetPath);
      const raw = resolveByPath(messages ?? {}, path ?? undefined);
      data.value = (raw == null ? null : (unwrapIntlifyMessage(raw) as T)) ?? null;
    } finally {
      pending.value = false;
    }
  };

  const initialPromise = sync();

  onServerPrefetch(() => initialPromise);

  if (import.meta.client) {
    onBeforeMount(() => {
      if (pending.value) {
        void initialPromise;
      } else {
        void sync();
      }
    });
  }

  watch(
    [locale, () => toValue(targetPath)],
    () => {
      void sync();
    },
    { flush: 'post' }
  );

  return {
    data,
    pending,
    refresh: sync,
  };
}
