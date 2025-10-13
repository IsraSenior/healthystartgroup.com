<script setup>
const props = defineProps({
  image: {
    type: String,
    default: '',
  },
  cta: {
    type: Object,
    default: () => ({}),
  },
});

const { image, cta } = toRefs(props);
</script>

<template>
  <div>
    <section
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
                <slot name="title">Título por defecto</slot>
              </h1>
            </div>
          </div>
          <div class="md:col-span-1 flex items-end">
            <div>
              <p
                class="text-white text-lg lg:text-2xl font-medium mb-10 text-center lg:text-left"
              >
                <slot name="description">
                  Descripción por defecto para resiliencia de contenido.
                </slot>
              </p>
              <NuxtLink
                v-if="Boolean(cta.value?.label && cta.value?.to)"
                :to="cta?.to"
                class="btn primary"
              >
                {{ cta?.label }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-10 lg:py-16 bg-secondary-50">
      <div class="container">
        <div class="isolate overflow-hidden relative h-[55vh] lg:-mt-[20vh]">
          <img
            id="portada"
            v-scroll-property="{
              property: 'transform',
              template: 'scale({value})',
              from: 1,
              to: 1.08,
              transition: 'transform 0.3s ease-out',
            }"
            :src="image"
            alt=""
            class="h-full w-full object-center object-cover"
          />
        </div>
      </div>
    </section>
  </div>
</template>
