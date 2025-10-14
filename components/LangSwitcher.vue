<script setup>
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const availableLocales = computed(() => {
    return locales.value.filter(i => i.code !== locale.value)
})
</script>

<template>
    <NuxtLink v-for="locale in availableLocales" :key="locale.code" :to="switchLocalePath(locale.code)" :title="locale.name" class="flex items-center justify-center space-x-2.5 text-white hover:text-secondary font-medium">
        <img :src="locale.flag" :alt="locale.name" class="w-auto h-6 rounded-sm">
        <span>{{ locale.name }}</span>
    </NuxtLink>
</template>