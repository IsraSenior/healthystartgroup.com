<script setup>
    const { data: page } = useI18nResource('services');
    const { data: services } = await useLocalizedCollection('services', {
        key: 'services',
        limit: -1,
    });

    const { locale } = useI18n();
    const localePath = useLocalePath();

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
        <section class="py-16 lg:py-32">
            <div class="container">
                <div class="text-center max-w-2xl mx-auto">
                    <h2 v-if="page?.title" class="text-5xl text-secondary font-normal mb-5">
                    {{ page?.title }}
                    </h2>
                    <p
                    v-if="page?.intro"
                    class="text-lg leading-relaxed text-secondary font-normal"
                    >
                    {{ page?.intro }}
                    </p>
                </div>

                <div class="my-16 grid grid-cols-1 md:grid-cols-3 gap-10">
                    <ServicesCard  v-for="(service, index) in services" :key="index" :service="service" />
                </div>

                <hr class="text-primary">

                <div class="pt-16 md:flex flex-col md:flex-row items-center justify-between gap-10 hidden">
                    <div>
                        <h3 class="text-5xl text-secondary font-normal">{{ page?.cta?.title }}</h3>
                    </div>

                    <div class="w-full md:w-auto">
                        <NuxtLink :to="localePath(page?.cta?.to)" class="btn secondary">{{ page?.cta?.label }}</NuxtLink>
                    </div>
                </div>
            </div>

        </section>

        <div class="isolate overflow-hidden relative h-[100vh] hidden md:block">
            <img
                id="portada"
                v-scroll-property="{
                property: 'transform',
                template: 'scale({value})',
                from: 1,
                to: 1.08,
                transition: 'transform 0.3s ease-out',
                }"
                :src="page?.cta?.image"
                :alt="age?.cta?.title"
                class="h-full w-full object-center object-cover"
            />
        </div>
    </div>
</template>