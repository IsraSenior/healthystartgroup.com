<script setup>
defineProps({
  service: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <article
    class="relative w-full flex flex-col min-h-[35vh] justify-between gap-6 bg-secondary-100 px-10 py-12 text-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-secondary-50 hover:bg-secondary-200 transition-colors duration-300 ease-in"
  >
    <div class="text-secondary">
      <template v-if="service?.meta?.icon">
        <span
          class="inline-flex h-12 w-full items-center justify-center lg:justify-start"
          aria-hidden="true"
          v-html="service?.meta?.icon"
        />
      </template>
      <slot v-else name="icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="h-12 w-12"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 21s-6.75-4.5-9-8.25c-2.25-3.75 0-8.25 4.5-8.25 2.438 0 4.5 2.25 4.5 2.25s2.062-2.25 4.5-2.25c4.5 0 6.75 4.5 4.5 8.25C18.75 16.5 12 21 12 21z"
          />
        </svg>
      </slot>

      <h3
        class="mt-6 text-4xl font-medium leading-tight text-center lg:text-left line-clamp-3"
      >
        {{ service?.title }}
      </h3>
    </div>

    <p class="text-lg leading-relaxed text-secondary text-center lg:text-left">
      {{ service?.description }}
    </p>
    <NuxtLink :to="service?.meta?.link" class="absolute inset-0" />
  </article>
</template>
