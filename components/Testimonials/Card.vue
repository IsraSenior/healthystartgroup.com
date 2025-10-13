<script setup>
defineProps({
  testimonial: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <article
    class="relative w-full h-full flex flex-col min-h-[35vh] justify-between gap-6 bg-secondary-100 px-10 py-12 text-secondary transition-colors duration-300 ease-in"
  >
    <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
      <div class="flex items-center justify-center md:col-span-1">
        <div
          v-if="testimonial?.avatar"
          class="rounded-full aspect-square size-24 lg:size-auto lg:min-h-[90%] lg:min-w-[90%] overflow-hidden relative"
        >
          <img
            :src="testimonial?.avatar"
            :alt="testimonial?.name"
            class="min-h-full min-w-full w-full h-full bg-primary object-center object-cover text-center"
          />
        </div>
      </div>

      <div class="flex items-center justify-center md:col-span-2">
        <div class="max-w-xl text-center lg:text-left">
          <q class="mt-6 text-2xl font-medium leading-tight">
            {{ testimonial?.quote }}
          </q>
          <p class="text-lg leading-relaxed text-secondary mt-5">
            {{ testimonial?.name }} 
            <span v-if="testimonial?.role"><br />{{ testimonial?.role }}</span>
          </p>
        </div>
      </div>
    </div>
  </article>
</template>
