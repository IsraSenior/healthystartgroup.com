<script setup>
defineProps({
  article: {
    type: Object,
    require: true,
  },
});
</script>

<template>
  <article
    class="bg-secondary-100 p-5 group hover:bg-secondary-200 transition duration-300 ease-in relative transform hover:scale-105"
  >
    <div v-if="article?.meta?.coverImage">
      <div class="overflow-hidden relative aspect-video">
        <img
          :src="article?.meta?.coverImage"
          :alt="article?.title"
          class="w-full h-full object-top object-cover group-hover:scale-110 transform transition-all duration-300 ease-in"
        />
      </div>
    </div>

    <div class="text-center lg:text-left py-5">
      <time
        v-if="article?.meta?.publishedAt"
        :datetime="article?.meta?.publishedAt"
        >{{ article?.meta?.publishedAt }}</time
      >

      <h6 class="my-5 text-2xl font-normal leading-tight">
        {{ article?.title }}
      </h6>

      <p class="text-lg leading-relaxed text-secondary">
        {{ article?.description }}
      </p>
    </div>
    <NuxtLink :to="`/articles${article?.path}`" class="absolute inset-0" />
  </article>
</template>
