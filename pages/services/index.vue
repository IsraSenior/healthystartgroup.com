<script setup>
    const { data: page } = useI18nResource('services');
    const { data: services } = await useLocalizedCollection('services', {
        key: 'services',
        limit: -1,
    });
</script>

<template>
    <div>
        <section class="py-16 lg:py-32">
            <div class="container">
                <div class="text-center max-w-2xl mx-auto">
                    <h2 v-if="page?.title" class="text-5xl text-secondary font-medium mb-5">
                    {{ page?.title }}
                    </h2>
                    <p
                    v-if="page?.intro"
                    class="text-lg leading-relaxed text-secondary font-medium"
                    >
                    {{ page?.intro }}
                    </p>
                </div>

                <div class="my-16 grid grid-cols-1 md:grid-cols-3 gap-10">
                    <ServicesCard  v-for="(service, index) in services" :key="index" :service="service" />
                </div>

                <hr class="text-primary">

                <div class="pt-16 flex flex-col md:flex-row items-center justify-between gap-10">
                    <div>
                        <h3 class="text-5xl text-secondary font-medium">{{ page?.cta?.title }}</h3>
                    </div>

                    <div>
                        <NuxtLink :to="page?.cta?.to" class="btn secondary">{{ page?.cta?.label }}</NuxtLink>
                    </div>
                </div>
            </div>

        </section>
        <div class="isolate overflow-hidden relative h-[100vh]">
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