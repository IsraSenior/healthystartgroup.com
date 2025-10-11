<script setup>
import { computed } from 'vue'

const { data: home } = await useAsyncData('home', () => queryCollection('content').path('/').first())
const homeContent = computed(() => home.value)
</script>

<template>
  <div>
    <ContentRenderer v-if="homeContent" :value="homeContent" />

    <section class="py-10 lg:py-16 bg-secondary-50">
      <div class="container">
        <div class="isolate overflow-hidden relative lg:-mt-[20vh]">
          <img id="portada"
            v-scroll-property="{ property: 'transform', template: 'scale({value})', from: 1, to: 1.08, transition: 'transform 0.3s ease-out' }"
            src="https://cdn.prod.website-files.com/649be2f4a7f56f80c8b40711/649c0a074b09fc92d787d906_herohome.webp"
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
              <img src="https://cdn.prod.website-files.com/649be2f4a7f56f80c8b40711/649c0ef961f883c7e75994fa_combo.webp"
                alt="" class="h-full w-full object-cover object-center">
            </div>
          </div>

          <div class="flex items-center justify-center">
            <div class="max-w-lg">
              <h3 class="text-5xl text-secondary font-medium text-center lg:text-left mb-5">Years of experience and lots
                of trust</h3>
              <p class="text-lg leading-relaxed text-secondary text-center lg:text-left font-medium">Vivamus quis mi.
                Phasellus
                viverra nulla ut metus varius laoreet. Nunc interdum lacus sit amet orci. Sed magna purus, fermentum eu,
                tincidunt eu, varius ut, felis.</p>

              <div class="mt-10 grid grid-cols-2 gap-10">
                <div class="text-center lg:text-left">
                  <span class="text-primary font-medium text-5xl lg:text-7xl">1000+</span>
                  <p class="text-lg leading-relaxed text-secondary">
                    clients
                  </p>
                </div>

                <div class="text-center lg:text-left">
                  <span class="text-primary font-medium text-5xl lg:text-7xl">25</span>
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
                Years of experience and lots of trust
              </h3>
              <p class="text-lg leading-relaxed text-secondary text-center lg:text-left font-medium">
                Vivamus quis mi. Phasellus viverra nulla ut metus varius laoreet. Nunc interdum lacus sit amet orci. Sed
                magna purus, fermentum eu, tincidunt eu, varius ut, felis.
              </p>

              <ul
                class="my-10 list-disc list-inside text-lg leading-relaxed text-secondary text-left marker:text-primary">
                <li>something amazing about Regler</li>
                <li>we are commited and hard working</li>
                <li>we have a lot of experience</li>
              </ul>

              <div>
                <NuxtLink to="/about" class="btn secondary">About us</NuxtLink>
              </div>
            </div>
          </div>

          <div>
            <div class="relative overflow-hidden aspect-square">
              <img
                src="https://cdn.prod.website-files.com/649be2f4a7f56f80c8b40711/649ccd67f17cef2b13d65115_Combo%20Two.webp"
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
            Our latest articles

          </h2>
          <p class="text-lg leading-relaxed text-secondary font-medium">
            Vivamus quis mi. Phasellus viverra nulla ut metus varius laoreet.
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
