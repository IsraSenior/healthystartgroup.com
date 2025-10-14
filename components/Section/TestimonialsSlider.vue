<script setup>
defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const { locale } = useI18n();

const testimonialsCollection = computed(() => `testimonials_${locale.value}`);

const { data: testimonialsEntries } = await useAsyncData(
  'section-testimonials',
  async () => {
    let entries = await queryCollection(testimonialsCollection.value).all();

    if ((!entries || entries.length === 0) && locale.value !== 'en') {
      entries = await queryCollection('testimonials_en').all();
    }

    return entries ?? [];
  },
  {
    watch: [testimonialsCollection],
  }
);

const testimonials = computed(() => {
  const entries = testimonialsEntries.value;

  if (Array.isArray(entries) && entries.length) {
    return entries;
  }

  return entries || [];
});

const sliderWrapper = ref(null);
const sliderTrack = ref(null);

const sliderState = reactive({
  current: 0,
  disableTransition: false,
  height: 0,
  slideWidth: 0,
});

const activeIndex = ref(0);
const pendingDirection = ref(null);
const isHovering = ref(false);

const totalSlides = computed(() => testimonials.value.length);
const hasLoop = computed(() => totalSlides.value > 1);

const baseSlides = computed(() =>
  testimonials.value.map((testimonial, index) => ({
    testimonial,
    key: `testimonial-${index}`,
  }))
);

const extendedSlides = computed(() => {
  const base = baseSlides.value;

  if (!base.length) {
    return [];
  }

  if (!hasLoop.value) {
    return base;
  }

  const first = base[0];
  const last = base[base.length - 1];

  return [
    {
      testimonial: last.testimonial,
      key: `tail-${last.key}`,
    },
    ...base,
    {
      testimonial: first.testimonial,
      key: `head-${first.key}`,
    },
  ];
});

const canSlide = computed(() => hasLoop.value);
const totalExtended = computed(() => extendedSlides.value.length);

const trackStyles = computed(() => ({
  transform: `translateX(-${sliderState.slideWidth ? sliderState.current * sliderState.slideWidth : 0}px)`,
  transition: sliderState.disableTransition ? 'none' : 'transform 0.45s ease',
}));

const slideStyles = computed(() => {
  if (!sliderState.slideWidth) {
    return {};
  }

  return {
    width: `${sliderState.slideWidth}px`,
  };
});

const wrapperStyles = computed(() => {
  if (!sliderState.height) {
    return {};
  }

  return {
    height: `${sliderState.height}px`,
    minHeight: `${sliderState.height}px`,
  };
});

const syncCurrentToActive = (instant = false) => {
  if (!totalSlides.value) {
    return;
  }

  if (instant) {
    sliderState.disableTransition = true;
  }

  sliderState.current = hasLoop.value
    ? activeIndex.value + 1
    : activeIndex.value;

  if (instant) {
    requestAnimationFrame(() => {
      sliderState.disableTransition = false;
    });
  }
};

const measureSlider = () => {
  if (!sliderWrapper.value || !sliderTrack.value) {
    return;
  }

  const wrapperRect = sliderWrapper.value.getBoundingClientRect();
  sliderState.slideWidth = wrapperRect.width;

  const items = sliderTrack.value.querySelectorAll('li');

  if (!items.length) {
    return;
  }

  const heights = Array.from(items).map(
    (item) => item.getBoundingClientRect().height
  );
  const fallback = items[0].getBoundingClientRect().height || 0;

  sliderState.height = Math.max(0, fallback, ...heights);
  syncCurrentToActive(true);
};

let autoplayTimer = null;
const autoplayDelay = 3500;
let deferredMeasureTimer = null;

const stopAutoplay = () => {
  if (!autoplayTimer) {
    return;
  }

  clearInterval(autoplayTimer);
  autoplayTimer = null;
};

const startAutoplay = () => {
  if (autoplayTimer || !canSlide.value || isHovering.value) {
    return;
  }

  autoplayTimer = setInterval(() => {
    goNext(true);
  }, autoplayDelay);
};

const restartAutoplay = () => {
  if (isHovering.value) {
    stopAutoplay();
    return;
  }

  stopAutoplay();
  startAutoplay();
};

const goNext = (auto = false) => {
  if (!totalSlides.value || pendingDirection.value) {
    return;
  }

  if (!hasLoop.value && activeIndex.value >= totalSlides.value - 1) {
    return;
  }

  pendingDirection.value = 'next';
  sliderState.disableTransition = false;
  sliderState.current += 1;

  if (!auto) {
    restartAutoplay();
  }
};

const goPrev = () => {
  if (!totalSlides.value || pendingDirection.value) {
    return;
  }

  if (!hasLoop.value && activeIndex.value <= 0) {
    return;
  }

  pendingDirection.value = 'prev';
  sliderState.disableTransition = false;
  sliderState.current -= 1;

  restartAutoplay();
};

const handleNextClick = () => {
  goNext(false);
};

const handlePrevClick = () => {
  goPrev();
};

const onTransitionEnd = (event) => {
  if (
    !sliderTrack.value ||
    event.target !== sliderTrack.value ||
    event.propertyName !== 'transform'
  ) {
    return;
  }

  if (!totalSlides.value || !pendingDirection.value) {
    return;
  }

  const direction = pendingDirection.value;
  pendingDirection.value = null;

  if (direction === 'next') {
    if (hasLoop.value) {
      activeIndex.value = (activeIndex.value + 1) % totalSlides.value;

      if (sliderState.current === totalExtended.value - 1) {
        syncCurrentToActive(true);
      }
    } else if (activeIndex.value < totalSlides.value - 1) {
      activeIndex.value += 1;
    }
  } else {
    if (hasLoop.value) {
      activeIndex.value =
        (activeIndex.value - 1 + totalSlides.value) % totalSlides.value;

      if (sliderState.current === 0) {
        syncCurrentToActive(true);
      }
    } else if (activeIndex.value > 0) {
      activeIndex.value -= 1;
    }
  }
};

const handleMouseEnter = () => {
  isHovering.value = true;
  stopAutoplay();
};

const handleMouseLeave = () => {
  isHovering.value = false;
  startAutoplay();
};

watch(canSlide, (value) => {
  stopAutoplay();

  if (!value) {
    activeIndex.value = 0;
    sliderState.current = 0;
    sliderState.disableTransition = true;
    requestAnimationFrame(() => {
      sliderState.disableTransition = false;
    });
    return;
  }

  syncCurrentToActive(true);

  if (!isHovering.value) {
    startAutoplay();
  }
});

watch(totalSlides, (value, previous) => {
  if (!value) {
    activeIndex.value = 0;
    sliderState.current = 0;
    return;
  }

  if (previous && activeIndex.value >= value) {
    activeIndex.value = value - 1;
  }

  syncCurrentToActive(true);

  nextTick(() => {
    measureSlider();
    syncCurrentToActive(true);
    if (!isHovering.value) {
      restartAutoplay();
    }
  });
});

onMounted(() => {
  nextTick(() => {
    measureSlider();
    syncCurrentToActive(true);
    startAutoplay();
    deferredMeasureTimer = setTimeout(() => {
      measureSlider();
      deferredMeasureTimer = null;
    }, 250);
  });

  window.addEventListener('resize', measureSlider);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', measureSlider);
  stopAutoplay();
  if (deferredMeasureTimer) {
    clearTimeout(deferredMeasureTimer);
    deferredMeasureTimer = null;
  }
});
</script>

<template>
  <section class="py-16 lg:py-32">
    <div class="container">
      <div class="text-center max-w-2xl mx-auto">
        <h2 v-if="data?.title" class="text-5xl text-secondary font-normal mb-5">
          {{ data?.title }}
        </h2>
        <p
          v-if="data?.intro"
          class="text-lg leading-relaxed text-secondary font-normal"
        >
          {{ data?.intro }}
        </p>
      </div>
    </div>

    <div class="mt-8 flex justify-center space-x-5 lg:hidden" v-if="canSlide">
      <button
        type="button"
        class="text-secondary hover:text-primary cursor-pointer prev disabled:opacity-40 disabled:cursor-not-allowed"
        @click="handlePrevClick"
        :disabled="!canSlide"
        aria-label="Previous testimonial"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-10"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        </svg>
      </button>

      <button
        type="button"
        class="text-secondary hover:text-primary cursor-pointer next disabled:opacity-40 disabled:cursor-not-allowed"
        @click="handleNextClick"
        :disabled="!canSlide"
        aria-label="Next testimonial"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-10"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
          />
        </svg>
      </button>
    </div>

    <div class="mt-10 lg:mt-16 max-w-5xl mx-auto">
      <div class="relative">
        <button
          v-if="canSlide"
          type="button"
          class="hidden lg:flex items-center justify-center text-secondary hover:text-primary cursor-pointer prev disabled:opacity-40 disabled:cursor-not-allowed absolute inset-y-0 -left-20"
          @click="handlePrevClick"
          :disabled="!canSlide"
          aria-label="Previous testimonial"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-10"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
        </button>

        <div
          id="testimonials-slider"
          ref="sliderWrapper"
          :style="wrapperStyles"
          class="overflow-hidden"
          @mouseenter="handleMouseEnter"
          @mouseleave="handleMouseLeave"
        >
          <ul
            ref="sliderTrack"
            :style="trackStyles"
            @transitionend="onTransitionEnd"
            class="flex items-stretch justify-start gap-0 will-change-transform"
          >
            <li
              class="w-full flex-shrink-0 flex flex-col"
              :style="slideStyles"
              v-for="slide in extendedSlides"
              :key="slide.key"
            >
              <TestimonialsCard :testimonial="slide?.testimonial?.meta" />
            </li>
          </ul>
        </div>

        <button
          v-if="canSlide"
          type="button"
          class="hidden lg:flex items-center justify-center text-secondary hover:text-primary cursor-pointer next disabled:opacity-40 disabled:cursor-not-allowed absolute inset-y-0 -right-20"
          @click="handleNextClick"
          :disabled="!canSlide"
          aria-label="Next testimonial"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-10"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
            />
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>
