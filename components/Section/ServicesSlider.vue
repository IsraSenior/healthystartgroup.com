<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  intro: {
    type: String,
    required: true,
  },
  services: {
    type: Array,
    default: () => [],
  },
});

const sliderWrapper = ref(null);
const sliderTrack = ref(null);

const sliderState = reactive({
  current: 0,
  slideWidth: 0,
  gap: 0,
  visible: 1,
  disableTransition: false,
});

const activeIndex = ref(0);
const pendingDirection = ref(null);
const isHovering = ref(false);
const hasMeasured = ref(false);
const isMounted = ref(false);

const servicesList = computed(() => props.services ?? []);

const totalSlides = computed(() => servicesList.value.length);

const cloneCount = computed(() => {
  if (!totalSlides.value || !hasMeasured.value) {
    return 0;
  }

  return Math.min(sliderState.visible, totalSlides.value);
});

const baseSlides = computed(() =>
  servicesList.value.map((service, index) => ({
    service,
    key: `service-${index}`,
  }))
);

const extendedSlides = computed(() => {
  const base = baseSlides.value;
  const clones = cloneCount.value;

  if (!base.length) {
    return [];
  }

  if (!clones) {
    return base;
  }

  const tail = base.slice(-clones).map((slide, idx) => ({
    service: slide.service,
    key: `tail-${idx}-${slide.key}`,
  }));

  const head = base.slice(0, clones).map((slide, idx) => ({
    service: slide.service,
    key: `head-${idx}-${slide.key}`,
  }));

  return [...tail, ...base, ...head];
});

const canSlide = computed(() => totalSlides.value > sliderState.visible);

const trackStyles = computed(() => {
  const transition = sliderState.disableTransition
    ? 'none'
    : 'transform 0.45s ease';

  if (!sliderState.slideWidth) {
    return {
      transition,
    };
  }

  const offset =
    sliderState.current * (sliderState.slideWidth + sliderState.gap);

  return {
    transform: `translateX(-${offset}px)`,
    transition,
  };
});

const syncCurrentToActive = (instant = false) => {
  if (!totalSlides.value) {
    return;
  }

  if (instant) {
    sliderState.disableTransition = true;
  }

  const baseIndex = hasMeasured.value
    ? sliderState.visible + activeIndex.value
    : activeIndex.value;
  sliderState.current = baseIndex;

  if (instant) {
    requestAnimationFrame(() => {
      sliderState.disableTransition = false;
    });
  }
};

const measureSlider = () => {
  if (!sliderWrapper.value || !sliderTrack.value || !totalSlides.value) {
    return;
  }

  const items = sliderTrack.value.querySelectorAll('li');

  if (!items.length) {
    return;
  }

  const firstRect = items[0].getBoundingClientRect();
  sliderState.slideWidth = firstRect.width;

  if (items.length > 1) {
    const secondRect = items[1].getBoundingClientRect();
    sliderState.gap = Math.max(0, secondRect.left - firstRect.right);
  } else {
    sliderState.gap = 0;
  }

  const wrapperRect = sliderWrapper.value.getBoundingClientRect();
  const itemWidthWithGap = sliderState.slideWidth + sliderState.gap;

  if (itemWidthWithGap > 0) {
    sliderState.visible = Math.max(
      1,
      Math.floor((wrapperRect.width + sliderState.gap) / itemWidthWithGap)
    );
  } else {
    sliderState.visible = 1;
  }

  sliderState.visible = Math.min(sliderState.visible, totalSlides.value);
  hasMeasured.value = true;
  syncCurrentToActive(true);
};

const resetSliderState = () => {
  sliderState.current = 0;
  sliderState.slideWidth = 0;
  sliderState.gap = 0;
  sliderState.visible = 1;
  hasMeasured.value = false;
};

let autoplayTimer = null;
const autoplayDelay = 3500;

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
  if (!hasMeasured.value || !canSlide.value || pendingDirection.value) {
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
  if (!hasMeasured.value || !canSlide.value || pendingDirection.value) {
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
    activeIndex.value = (activeIndex.value + 1) % totalSlides.value;

    if (sliderState.current >= sliderState.visible + totalSlides.value) {
      syncCurrentToActive(true);
    }
  } else {
    activeIndex.value =
      (activeIndex.value - 1 + totalSlides.value) % totalSlides.value;

    if (sliderState.current < sliderState.visible) {
      syncCurrentToActive(true);
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
  if (!value) {
    stopAutoplay();
    syncCurrentToActive(true);
    return;
  }

  if (!isHovering.value) {
    startAutoplay();
  }
});

watch(
  totalSlides,
  (newTotal) => {
    activeIndex.value = 0;

    if (!isMounted.value) {
      return;
    }

    if (!newTotal) {
      stopAutoplay();
      resetSliderState();
      return;
    }

    resetSliderState();
    nextTick(() => {
      measureSlider();
      syncCurrentToActive(true);
      restartAutoplay();
    });
  },
  { flush: 'post' }
);

onMounted(() => {
  isMounted.value = true;

  nextTick(() => {
    measureSlider();
    syncCurrentToActive(true);
    startAutoplay();
  });

  window.addEventListener('resize', measureSlider);
});

onBeforeUnmount(() => {
  isMounted.value = false;
  window.removeEventListener('resize', measureSlider);
  stopAutoplay();
});
</script>

<template>
  <section>
    <div class="container">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div class="md:col-span-2">
          <h2
            class="text-5xl text-secondary font-normal text-center lg:text-left mb-5"
          >
            {{ props.title }}
          </h2>
          <p
            v-if="props?.intro"
            class="text-lg leading-relaxed text-secondary font-normal text-center lg:text-left"
          >
            {{ props?.intro }}
          </p>
        </div>
        <div class="md:col-span-1 flex items-end justify-center lg:justify-end">
          <div class="space-x-5">
            <button
              type="button"
              class="text-secondary hover:text-primary cursor-pointer prev disabled:opacity-40 disabled:cursor-not-allowed"
              @click="handlePrevClick"
              :disabled="!canSlide"
              aria-label="Previous service"
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
              aria-label="Next service"
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
      </div>
    </div>

    <div
      id="services-slider"
      ref="sliderWrapper"
      class="mt-10 lg:mt-16 mr-0 ml-auto max-w-[calc(((100vw-80rem)/2)+80rem+20px)] overflow-hidden px-5 lg:px-0"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <ul
        ref="sliderTrack"
        :style="trackStyles"
        @transitionend="onTransitionEnd"
        class="flex items-center justify-start max-w-full gap-10 will-change-transform"
      >
        <li
          class="min-w-[100%] md:min-w-[50%] lg:min-w-[33%]"
          v-for="slide in extendedSlides"
          :key="slide.key"
        >
          <ServicesCard :service="slide.service" />
        </li>
      </ul>
    </div>
  </section>
</template>
