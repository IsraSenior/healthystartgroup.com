<script setup>
defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const localePath = useLocalePath();
</script>

<template>
  <section id="values" class="py-16 lg:py-32 bg-secondary-100">
    <div class="container">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <div class="max-w-lg sticky top-32">
            <h2
              class="text-5xl text-secondary font-normal text-center lg:text-left mb-5"
            >
              {{ data?.title }}
            </h2>
            <p class="text-lg leading-relaxed text-secondary mb-10 font-normal">
              {{ data?.intro }}
            </p>

            <NuxtLink :to="localePath(data?.cta?.to)" class="btn secondary">
              {{ data?.cta?.label }}
            </NuxtLink>
          </div>
        </div>
        <div>
          <div class="grid grid-cols-1 gap-10">
            <div
              v-for="(value, index) in data?.values"
              :key="index"
              class="relative overflow-hidden aspect-2/3 lg:aspect-square flex items-end justify-center"
            >
              <img
                :src="value?.image"
                :alt="value?.title"
                class="h-full w-full object-center object-cover"
              />

              <div
                class="bg-gradient-to-t from-0% from-secondary to-80% to-transparent inset-0 absolute"
              ></div>

              <div
                class="text-center text-white absolute inset-x-5 lg:inset-x-10 bottom-5 lg:bottom-10"
              >
                <h5 class="text-xl lg:text-4xl font-normal mb-5">
                  {{ value?.title }}
                </h5>
                <p class="text-lg leading-relaxed">
                  {{ value?.intro }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
