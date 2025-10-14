<script setup>
    const { data: page } = useI18nResource('about');
</script>

<template>
    <div>
        <ClientOnly>
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

                    <div class="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10">
                        <div v-if="page?.image" class="md:col-span-2 relative md:h-[65vh] overflow-hidden bg-secondary">
                            <img class="h-full w-full object-cover object-center" :src="page?.image" :alt="page?.title">
                        </div>

                        <div v-if="page?.video" class="relative md:h-[65vh] overflow-hidden bg-secondary hidden md:block">
                            <video class="h-full w-full object-cover object-center" autoplay muted playsinline="" :src="page?.video"></video>
                        </div>
                    </div>

                    <div class="mt-16 grid grid-cols-2 md:grid-cols-4 gap-10">
                        <div
                            v-for="(stat, index) in page?.indicators"
                            :key="index"
                            class="text-center lg:text-left lg:px-10"
                        >
                            <span class="text-primary font-normal  text-3xl lg:text-5xl">
                                {{ stat?.value }}
                            </span>
                            <p class="text-base leading-relaxed text-secondary">
                                {{ stat?.label }}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <SectionCTA v-if="page?.quote" :data="page?.quote" />

            <div class="isolate overflow-hidden relative h-[100vh]">
                <img
                v-if="page?.imageSection"
                    v-scroll-property="{
                    property: 'transform',
                    template: 'scale({value})',
                    from: 1,
                    to: 1.08,
                    transition: 'transform 0.3s ease-out',
                    }"
                    :src="page?.imageSection"
                    alt=""
                    class="h-full w-full object-center object-cover"
                />
            </div>

            <SectionValues v-if="page?.values" :data="page?.values" />

            <section v-if="page?.exp" class="py-16 lg:py-32 bg-secondary-50">
                <div class="container">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div class="flex items-center justify-center">
                        <div class="max-w-lg">
                        <h3
                            class="text-3xl md:text-5xl text-secondary font-normal text-center lg:text-left mb-5"
                        >
                            {{ page?.exp?.title }}
                        </h3>
                        <p
                            class="text-lg leading-relaxed text-secondary text-center lg:text-left font-normal"
                        >
                            {{ page?.exp?.intro }}
                        </p>

                        <ul
                            class="my-10 list-disc list-inside text-lg leading-relaxed text-secondary text-left marker:text-primary"
                        >
                            <li v-for="(item, index) in page?.exp?.list" :key="index">
                            {{ item }}
                            </li>
                        </ul>

                        <div>
                            <NuxtLink :to="page?.exp?.cta.to" class="btn secondary">{{
                            page?.exp?.cta.label
                            }}</NuxtLink>
                        </div>
                        </div>
                    </div>

                    <div>
                        <div class="relative overflow-hidden aspect-square">
                        <img
                            :src="page?.exp?.image"
                            :alt="page?.exp?.title"
                            class="h-full w-full object-cover object-center"
                        />
                        </div>
                    </div>
                    </div>
                </div>
                </section>
        </ClientOnly>

        <!-- <div class="isolate overflow-hidden relative h-[100vh] hidden md:block">
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
        </div> -->
    </div>
</template>