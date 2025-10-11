<script setup>
const props = defineProps({
  ctaLabel: {
    type: String,
    default: 'Free consultation',
  },
  ctaTo: {
    type: String,
    default: '/contact',
  },
})
</script>

<template>
  <section id="hero" class="h-[75vh] py-16 bg-secondary flex items-center justify-center">
    <div class="container lg:-mt-[10vh]">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div class="md:col-span-2">
          <div>
            <h1 class="text-3xl lg:text-5xl xl:text-7xl text-white font-medium leading-tight text-center lg:text-left">
              <slot mdc-unwrap="p" />
            </h1>
          </div>
        </div>
        <div class="md:col-span-1 flex items-end">
          <div>
            <p class="text-white text-lg lg:text-2xl font-medium mb-10 text-center lg:text-left">
              <slot name="description" mdc-unwrap="p" />
            </p>

            <NuxtLink v-if="props.ctaTo" :to="props.ctaTo" class="btn primary">
              {{ props.ctaLabel }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
