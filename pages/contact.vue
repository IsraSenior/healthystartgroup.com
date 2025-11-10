<script setup>
    const { data: page } = useI18nResource('sections.contact');
    const { locale } = useI18n();

    useSeoMeta({
        title: page?.value?.title,
        description: page?.value?.intro,
        ogTitle: page?.value?.title,
        ogDescription: page?.value?.intro,
        ogImage: '/HealthyStart_Group_og2.webp',
        ogImageAlt: locale.value === 'es' ? 'HealthyStart Group - Servicios de Salud' : 'HealthyStart Group - Healthcare Services',
        twitterCard: 'summary_large_image',
        twitterTitle: page?.value?.title,
        twitterDescription: page?.value?.intro,
        twitterImage: '/HealthyStart_Group_og2.webp',
    });
</script>

<template>
    <div>
        
    </div>
</template>