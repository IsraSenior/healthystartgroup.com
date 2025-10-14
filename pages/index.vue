<script setup>
const { data: page } = useI18nResource('home');

const { data: services } = await useLocalizedCollection('services', {
  key: 'home-services',
});

const { data: articles } = await useLocalizedCollection('articles', {
  key: 'home-articles',
  limit: 3,
});

useSeoMeta(page?.value?.seo);
</script>

<template>
  <div>
    <section
      v-if="page?.hero"
      id="hero"
      class="h-[75vh] py-16 bg-secondary flex items-center justify-center"
    >
      <div class="container lg:-mt-[10vh]">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div class="md:col-span-2">
            <div>
              <h1
                class="text-3xl lg:text-5xl xl:text-7xl text-white font-medium leading-tight text-center lg:text-left"
              >
                {{ page?.hero?.title }}
              </h1>
            </div>
          </div>
          <div class="md:col-span-1 flex items-end">
            <div>
              <p
                class="text-white text-lg lg:text-2xl font-medium mb-10 text-center lg:text-left"
              >
                {{ page?.hero?.description }}
              </p>
              <NuxtLink :to="page?.hero?.cta?.to || '/'" class="btn primary">
                {{ page?.hero?.cta?.label }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section v-if="page?.hero" class="py-10 lg:py-16 bg-secondary-50">
      <div class="container">
        <div class="isolate overflow-hidden relative h-[60vh] lg:-mt-[20vh]">
          <img
            id="portada"
            v-scroll-property="{
              property: 'transform',
              template: 'scale({value})',
              from: 1,
              to: 1.08,
              transition: 'transform 0.3s ease-out',
            }"
            :src="page?.hero?.image"
            alt=""
            class="h-full w-full object-center object-cover"
          />
        </div>
      </div>
    </section>

    <SectionServicesSlider
      v-if="page?.services"
      id="home-services"
      class="pb-10 lg:pb-16 lg:pt-0 bg-secondary-50"
      :title="page?.services?.title"
      :intro="page?.services?.intro"
      :services="services"
    />

    <section v-if="page?.stats" class="py-16 lg:py-32 bg-secondary-100">
      <div class="container">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <div class="relative overflow-hidden aspect-square">
              <img
                :src="page?.stats?.image"
                :alt="page?.stats?.title"
                class="h-full w-full object-cover object-center"
              />
            </div>
          </div>

          <div class="flex items-center justify-center">
            <div class="max-w-lg">
              <h3
                class="text-3xl md:text-5xl text-secondary font-medium text-center lg:text-left mb-5"
              >
                {{ page?.stats?.title }}
              </h3>
              <div
                class="text-lg leading-relaxed text-secondary text-center lg:text-left font-medium"
                v-html="page?.stats?.intro"
              >
              </div>

              <div class="mt-10 grid grid-cols-2 md:grid-cols-3 gap-10">
                <div
                  v-for="(stat, index) in page?.stats?.stats"
                  :key="index"
                  class="text-center lg:text-left"
                >
                  <span class="text-primary font-medium  text-3xl lg:text-5xl">
                    {{ stat?.value }}
                  </span>
                  <p class="text-base leading-relaxed text-secondary">
                    {{ stat?.label }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <SectionCTA v-if="page?.quote" :data="page?.quote" />

    <SectionValues v-if="page?.values" :data="page?.values" />

    <SectionTestimonialsSlider
      v-if="page?.testimonials"
      :data="page?.testimonials"
      class="bg-secondary-50"
    />

    <section v-if="page?.years" class="py-16 lg:py-32 bg-secondary-50">
      <div class="container">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div class="flex items-center justify-center">
            <div class="max-w-lg">
              <h3
                class="text-3xl md:text-5xl text-secondary font-medium text-center lg:text-left mb-5"
              >
                {{ page?.years?.title }}
              </h3>
              <p
                class="text-lg leading-relaxed text-secondary text-center lg:text-left font-medium"
              >
                {{ page?.years?.intro }}
              </p>

              <ul
                class="my-10 list-disc list-inside text-lg leading-relaxed text-secondary text-left marker:text-primary"
              >
                <li v-for="(item, index) in page?.years?.list" :key="index">
                  {{ item }}
                </li>
              </ul>

              <div>
                <NuxtLink :to="page?.years?.cta.to" class="btn secondary">{{
                  page?.years?.cta.label
                }}</NuxtLink>
              </div>
            </div>
          </div>

          <div>
            <div class="relative overflow-hidden aspect-square">
              <img
                :src="page?.years?.image"
                :alt="page?.years?.title"
                class="h-full w-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section v-if="page?.blog" class="py-16 lg:py-32">
      <div class="container">
        <div class="text-center max-w-2xl mx-auto">
          <h2 class="text-5xl text-secondary font-medium mb-5">
            {{ page?.blog?.title }}
          </h2>
          <p class="text-lg leading-relaxed text-secondary font-medium">
            {{ page?.blog?.intro }}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">
          <BlogArticle
            v-for="(article, index) in articles"
            :key="index"
            :article="article"
          />
        </div>

        <div class="flex items-center justify-center mt-16">
          <NuxtLink :to="page?.blog?.cta.to" class="btn secondary">{{
            page?.blog?.cta.label
          }}</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>
