<script setup>
defineProps({
  data: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <section id="cta" class="py-16 lg:py-32 bg-secondary">
    <div class="max-w-5xl mx-auto px-5 lg:px-0 text-center lg:text-left">
      <q
        v-if="data?.phrase"
        class="text-white text-3xl lg:text-6xl leading-tight font-medium"
      >
        {{ data?.phrase }}
      </q>
      <div
        class="mt-10 flex flex-col lg:flex-row items-center justify-center lg:justify-start gap-5"
      >
        <div class="rounded-full size-12 lg:size-24 overflow-hidden relative">
          <img
            v-if="data?.author_avatar"
            :src="data?.author_avatar"
            :alt="data?.author"
            class="h-full w-full object-center object-cover"
          />
        </div>
        <p class="text-lg leading-relaxed text-white">
          {{ data?.author }} <br />
          {{ data?.author_title }}
        </p>
      </div>
    </div>
  </section>
</template>
