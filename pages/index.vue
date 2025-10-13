<script setup>
const { locale } = useI18n();

const { data: page } = await useContentEntry('page-home', '/');
const sections = computed(() => page.value?.meta?.sections || {});

const servicesCollection = computed(() => `services_${locale.value}`);

const { data: serviceEntries } = await useAsyncData(
  'home-services',
  async () => {
    let entries = await queryCollection(servicesCollection.value).all();

    if ((!entries || entries.length === 0) && locale.value !== 'en') {
      entries = await queryCollection('services_en').all();
    }

    return entries ?? [];
  },
  {
    watch: [servicesCollection],
  }
);

const services = computed(() => serviceEntries.value ?? []);
</script>

<template>
  <div>
    <LangSwitcher />

    <section
      v-if="sections?.hero"
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
                {{ sections?.hero?.title }}
              </h1>
            </div>
          </div>
          <div class="md:col-span-1 flex items-end">
            <div>
              <p
                class="text-white text-lg lg:text-2xl font-medium mb-10 text-center lg:text-left"
              >
                {{ sections?.hero?.description }}
              </p>
              <NuxtLink
                :to="sections?.hero?.cta?.to || '/'"
                class="btn primary"
              >
                {{ sections?.hero?.cta?.label }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section v-if="sections?.hero" class="py-10 lg:py-16 bg-secondary-50">
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
            :src="sections?.hero?.image"
            alt=""
            class="h-full w-full object-center object-cover"
          />
        </div>
      </div>
    </section>

    <SectionServicesSlider
      v-if="sections?.services"
      id="home-services"
      class="pb-10 lg:pb-16 lg:pt-0 bg-secondary-50"
      :title="sections?.services?.title"
      :services="services"
    />

    <section v-if="sections?.stats" class="py-16 lg:py-32 bg-secondary-100">
      <div class="container">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <div class="relative overflow-hidden aspect-square">
              <img
                :src="sections?.stats?.image"
                :alt="sections?.stats?.title"
                class="h-full w-full object-cover object-center"
              />
            </div>
          </div>

          <div class="flex items-center justify-center">
            <div class="max-w-lg">
              <h3
                class="text-5xl text-secondary font-medium text-center lg:text-left mb-5"
              >
                {{ sections?.stats?.title }}
              </h3>
              <p
                class="text-lg leading-relaxed text-secondary text-center lg:text-left font-medium"
              >
                {{ sections?.stats?.intro }}
              </p>

              <div class="mt-10 grid grid-cols-2 gap-10">
                <div
                  v-for="(stat, index) in sections?.stats?.stats"
                  class="text-center lg:text-left"
                >
                  <span class="text-primary font-medium text-5xl lg:text-7xl">
                    {{ stat?.value }}
                  </span>
                  <p class="text-lg leading-relaxed text-secondary">
                    {{ stat?.label }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <SectionCTA v-if="sections?.quote" :data="sections?.quote" />

    <SectionValues v-if="sections?.values" :data="sections?.values" />

    <SectionTestimonialsSlider
      v-if="sections?.testimonials"
      :data="sections?.testimonials"
      class="bg-secondary-50"
    />

    <section v-if="sections?.years" class="py-16 lg:py-32 bg-secondary-50">
      <div class="container">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div class="flex items-center justify-center">
            <div class="max-w-lg">
              <h3
                class="text-5xl text-secondary font-medium text-center lg:text-left mb-5"
              >
                {{ sections?.years?.title }}
              </h3>
              <p
                class="text-lg leading-relaxed text-secondary text-center lg:text-left font-medium"
              >
                {{ sections?.years?.intro }}
              </p>

              <ul
                class="my-10 list-disc list-inside text-lg leading-relaxed text-secondary text-left marker:text-primary"
              >
                <li v-for="(item, index) in sections?.years?.list" :key="index">
                  {{ item }}
                </li>
              </ul>

              <div>
                <NuxtLink :to="sections?.years?.cta.to" class="btn secondary">{{
                  sections?.years?.cta.label
                }}</NuxtLink>
              </div>
            </div>
          </div>

          <div>
            <div class="relative overflow-hidden aspect-square">
              <img
                :src="sections?.years?.image"
                :alt="sections?.years?.title"
                class="h-full w-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section v-if="sections?.blog" class="py-16 lg:py-32">
      <div class="container">
        <div class="text-center max-w-2xl mx-auto">
          <h2 class="text-5xl text-secondary font-medium mb-5">
            {{ sections?.blog?.title }}
          </h2>
          <p class="text-lg leading-relaxed text-secondary font-medium">
            {{ sections?.blog?.intro }}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">
          <BlogArticle />
        </div>

        <div class="flex items-center justify-center mt-16">
          <NuxtLink :to="sections?.blog?.cta.to" class="btn secondary">{{
            sections?.blog?.cta.label
          }}</NuxtLink>
        </div>
      </div>
    </section>

    <SectionContact />
  </div>
</template>
