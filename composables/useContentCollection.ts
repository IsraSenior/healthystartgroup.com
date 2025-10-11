export function useContentCollection() {
  const { locale } = useI18n();
  const collection = computed(() => `content_${locale.value}`);

  return { collection };
}
