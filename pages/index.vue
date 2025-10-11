<script setup>
const { data: home } = await useAsyncData('home', () => queryContent('/').findOne())
const homeContent = computed(() => home.value)
const hero = computed(() => {
  const h = (homeContent.value && homeContent.value.hero) ? homeContent.value.hero : {}
  return {
    title: h.title || 'Holistic medical services driven by innovation and years of experience.',
    subtitle: h.subtitle || 'We are team of professionals helping others to feel better with our premium services.',
    cta: {
      label: (h.cta && h.cta.label) || 'Free consultation',
      to: (h.cta && h.cta.to) || '/contact'
    }
  }
})

const portada = computed(() => {
  const p = homeContent.value && homeContent.value.portada ? homeContent.value.portada : {}
  return p.image || 'https://cdn.prod.website-files.com/649be2f4a7f56f80c8b40711/649c0a074b09fc92d787d906_herohome.webp'
})

const sectionA = computed(() => {
  const s = homeContent.value && homeContent.value.sectionA ? homeContent.value.sectionA : {}
  return {
    title: s.title || 'Years of experience and lots of trust',
    text: s.text || 'Vivamus quis mi. Phasellus viverra nulla ut metus varius laoreet. Nunc interdum lacus sit amet orci. Sed magna purus, fermentum eu, tincidunt eu, varius ut, felis.',
    kpis: {
      clients: (s.kpis && s.kpis.clients) || '1000+',
      years: (s.kpis && s.kpis.years) || '25'
    },
    image: s.image || 'https://cdn.prod.website-files.com/649be2f4a7f56f80c8b40711/649c0ef961f883c7e75994fa_combo.webp'
  }
})

const sectionB = computed(() => {
  const s = homeContent.value && homeContent.value.sectionB ? homeContent.value.sectionB : {}
  return {
    title: s.title || 'Years of experience and lots of trust',
    text: s.text || 'Vivamus quis mi. Phasellus viverra nulla ut metus varius laoreet. Nunc interdum lacus sit amet orci. Sed magna purus, fermentum eu, tincidunt eu, varius ut, felis.',
    bullets: Array.isArray(s.bullets) ? s.bullets : ['something amazing about Regler', 'we are commited and hard working', 'we have a lot of experience'],
    cta: {
      label: (s.cta && s.cta.label) || 'About us',
      to: (s.cta && s.cta.to) || '/about'
    },
    image: s.image || 'https://cdn.prod.website-files.com/649be2f4a7f56f80c8b40711/649ccd67f17cef2b13d65115_Combo%20Two.webp'
  }
})

const latest = computed(() => {
  const l = homeContent.value && homeContent.value.latest ? homeContent.value.latest : {}
  return {
    title: l.title || 'Our latest articles',
    description: l.description || 'Vivamus quis mi. Phasellus viverra nulla ut metus varius laoreet.'
  }
})
</script>

<template>
  <div>
    <section id="hero" class="h-[75vh] py-16 bg-secondary flex items-center justify-center">
      <div class="container lg:-mt-[10vh]">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div class="md:col-span-2">
            <div>
              <h1
                class="text-3xl lg:text-5xl xl:text-7xl text-white font-medium leading-tight text-center lg:text-left">
                {{ hero.title }}
              </h1>
            </div>
          </div>
          <div class="md:col-span-1 flex items-end">
            <div>
              <p class="text-white text-lg lg:text-2xl font-medium mb-10 text-center lg:text-left">
                {{ hero.subtitle }}
              </p>

              <NuxtLink :to="hero.cta.to" class="btn primary">
                {{ hero.cta.label }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-10 lg:py-16 bg-secondary-50">
      <div class="container">
        <div class="isolate overflow-hidden relative lg:-mt-[20vh]">
          <img id="portada"
            v-scroll-property="{ property: 'transform', template: 'scale({value})', from: 1, to: 1.08, transition: 'transform 0.3s ease-out' }"
            :src="portada"
            alt="" class="h-full w-full object-center object-cover" />
        </div>
      </div>
    </section>

    <SectionServicesSlider id="home-services" class="pb-10 lg:pb-16 lg:pt-[10vh] bg-secondary-50" />

    <section class="py-16 lg:py-32 bg-secondary-100">
      <div class="container">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <div class="relative overflow-hidden aspect-square">
              <img :src="sectionA.image"
                alt="" class="h-full w-full object-cover object-center">
            </div>
          </div>

          <div class="flex items-center justify-center">
            <div class="max-w-lg">
              <h3 class="text-5xl text-secondary font-medium text-center lg:text-left mb-5">{{ sectionA.title }}</h3>
              <p class="text-lg leading-relaxed text-secondary text-center lg:text-left font-medium">{{ sectionA.text }}</p>

              <div class="mt-10 grid grid-cols-2 gap-10">
                <div class="text-center lg:text-left">
                  <span class="text-primary font-medium text-5xl lg:text-7xl">{{ sectionA.kpis.clients }}</span>
                  <p class="text-lg leading-relaxed text-secondary">
                    clients
                  </p>
                </div>

                <div class="text-center lg:text-left">
                  <span class="text-primary font-medium text-5xl lg:text-7xl">{{ sectionA.kpis.years }}</span>
                  <p class="text-lg leading-relaxed text-secondary">
                    years on the market
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <SectionCTA />

    <SectionValues />

    <SectionTestimonialsSlider class="bg-secondary-50" />

    <section class="py-16 lg:py-32 bg-secondary-50">
      <div class="container">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div class="flex items-center justify-center">
            <div class="max-w-lg">
              <h3 class="text-5xl text-secondary font-medium text-center lg:text-left mb-5">
                {{ sectionB.title }}
              </h3>
              <p class="text-lg leading-relaxed text-secondary text-center lg:text-left font-medium">
                {{ sectionB.text }}
              </p>

              <ul
                class="my-10 list-disc list-inside text-lg leading-relaxed text-secondary text-left marker:text-primary">
                <li v-for="(item, i) in sectionB.bullets" :key="i">{{ item }}</li>
              </ul>

              <div>
                <NuxtLink :to="sectionB.cta.to" class="btn secondary">{{ sectionB.cta.label }}</NuxtLink>
              </div>
            </div>
          </div>

          <div>
            <div class="relative overflow-hidden aspect-square">
              <img
                :src="sectionB.image"
                alt="" class="h-full w-full object-cover object-center">
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 lg:py-32">
      <div class="container">
        <div class="text-center max-w-2xl mx-auto">
          <h2 class="text-5xl text-secondary font-medium mb-5">
            {{ latest.title }}

          </h2>
          <p class="text-lg leading-relaxed text-secondary font-medium">
            {{ latest.description }}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">
          <BlogArticle />
          <BlogArticle />
          <BlogArticle />
        </div>

        <div class="flex items-center justify-center mt-16">
          <NuxtLink to="/blog" class="btn secondary">See all articles</NuxtLink>
        </div>
      </div>

    </section>

    <SectionContact />
  </div>
</template>
