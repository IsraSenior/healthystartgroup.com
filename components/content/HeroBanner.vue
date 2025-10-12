<script setup>
const props = defineProps({
    cta: {
        type: Object,
        default: () => ({}),
    },
});

const { cta } = toRefs(props);
const hasCta = computed(() => Boolean(cta.value?.label && cta.value?.to));
</script>

<template>
    <section id="hero" class="h-[75vh] py-16 bg-secondary flex items-center justify-center">
        <div class="container lg:-mt-[10vh]">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div class="md:col-span-2">
                    <div>
                        <h1
                            class="text-3xl lg:text-5xl xl:text-7xl text-white font-medium leading-tight text-center lg:text-left">
                            <slot name="title">Título por defecto</slot>
                        </h1>
                    </div>
                </div>
                <div class="md:col-span-1 flex items-end">
                    <div>
                        <p class="text-white text-lg lg:text-2xl font-medium mb-10 text-center lg:text-left">
                            <slot name="description">
                                Descripción por defecto para resiliencia de contenido.
                            </slot>
                        </p>
                        <NuxtLink v-if="hasCta" :to="cta?.to" class="btn primary">
                            {{ cta?.label }}
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
