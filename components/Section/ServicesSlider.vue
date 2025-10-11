<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        title?: string
    }>(),
    {
        title: 'Our custom services',
    },
)

interface ServiceItem {
    title: string
    description: string
    icon: string
    link: string
}

type SlideDirection = 'next' | 'prev'

const sliderWrapper = ref<HTMLElement | null>(null)
const sliderTrack = ref<HTMLElement | null>(null)

const sliderState = reactive({
    current: 0,
    slideWidth: 0,
    gap: 0,
    visible: 1,
    disableTransition: false,
})

const activeIndex = ref(0)
const pendingDirection = ref<SlideDirection | null>(null)
const isHovering = ref(false)
const hasMeasured = ref(false)

const services: ServiceItem[] = [
    {
        title: 'Cardiology Care',
        description:
            'Comprehensive heart health programs supported by advanced diagnostics and ongoing monitoring.',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="h-12 w-12" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M12 21s-6.75-4.5-9-8.25c-2.25-3.75 0-8.25 4.5-8.25 2.438 0 4.5 2.25 4.5 2.25s2.062-2.25 4.5-2.25c4.5 0 6.75 4.5 4.5 8.25C18.75 16.5 12 21 12 21z" />
                </svg>`,
        link: '/services/cardiology-care',
    },
    {
        title: 'Pediatric Wellness',
        description:
            'Preventive care and developmental tracking tailored for infants, children, and young adults.',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="h-12 w-12" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M15 19a3 3 0 1 0-6 0m9-7.5a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3v-3a6 6 0 1 1 12 0v3z" />
                </svg>`,
        link: '/services/pediatric-wellness',
    },
    {
        title: 'Dermatology Studio',
        description:
            'Regenerative skin treatments and minimally invasive procedures guided by board-certified specialists.',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="h-12 w-12" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M12 3v3m0 12v3m9-9h-3M6 12H3m13.364-7.364-2.121 2.121m-7.071 7.071-2.121 2.121m12.313 0-2.121-2.121m-7.071-7.071-2.121-2.121" />
                </svg>`,
        link: '/services/dermatology-studio',
    },
    {
        title: 'Mental Health Coaching',
        description:
            'Evidence-based therapy and mindfulness training to build resilience and emotional balance.',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="h-12 w-12" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M12 6c1.5-3 7.5-3 7.5 3 0 4.5-3 9-7.5 9S4.5 13.5 4.5 9c0-6 6-6 7.5-3z" />
                </svg>`,
        link: '/services/mental-health-coaching',
    },
    {
        title: 'Orthopedic Recovery',
        description:
            'Integrated musculoskeletal rehabilitation with personalized mobility plans and modern equipment.',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="h-12 w-12" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M12 6V4.5m0 1.5a3 3 0 0 1 3 3v1.098a8.966 8.966 0 0 1 3.75 2.21l.75.692M12 6a3 3 0 0 0-3 3v1.098a8.966 8.966 0 0 0-3.75 2.21l-.75.692M12 18v1.5m0-1.5a3 3 0 0 1-3-3v-1.098a8.966 8.966 0 0 0-3.75-2.21l-.75-.692m7.5 7.5a3 3 0 0 0 3-3v-1.098a8.966 8.966 0 0 1 3.75-2.21l.75-.692" />
                </svg>`,
        link: '/services/orthopedic-recovery',
    },
    {
        title: 'Nutrition Blueprint',
        description:
            'Functional nutrition plans combining biomarker insights with culinary coaching for daily life.',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="h-12 w-12" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M3 12c0 5.25 4.5 9 9 9s9-3.75 9-9-4.5-9-9-9-9 3.75-9 9z" />
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M12 3c.75 3.75 3.75 5.25 6 6-1.5 2.25-3.75 5.25-6 12-2.25-6.75-4.5-9.75-6-12 2.25-.75 5.25-2.25 6-6z" />
                </svg>`,
        link: '/services/nutrition-blueprint',
    },
    {
        title: 'Telemedicine Support',
        description:
            'Secure remote consultations with same-day follow-up and care coordination across specialties.',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="h-12 w-12" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M16.5 2.25H7.5A2.25 2.25 0 0 0 5.25 4.5v15a2.25 2.25 0 0 0 2.25 2.25h9A2.25 2.25 0 0 0 18.75 19.5v-15A2.25 2.25 0 0 0 16.5 2.25z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 6.75h6m-6 4.5h3" />
                </svg>`,
        link: '/services/telemedicine-support',
    },
]

const totalSlides = computed(() => services.length)

const cloneCount = computed(() => {
    if (!totalSlides.value || !hasMeasured.value) {
        return 0
    }

    return Math.min(sliderState.visible, totalSlides.value)
})

type SlideEntry = {
    service: ServiceItem
    key: string
}

const baseSlides = computed<SlideEntry[]>(() =>
    services.map((service, index) => ({
        service,
        key: `service-${index}`,
    })),
)

const extendedSlides = computed<SlideEntry[]>(() => {
    const base = baseSlides.value
    const clones = cloneCount.value

    if (!base.length) {
        return []
    }

    if (!clones) {
        return base
    }

    const tail = base.slice(-clones).map((slide, idx) => ({
        service: slide.service,
        key: `tail-${idx}-${slide.key}`,
    }))

    const head = base.slice(0, clones).map((slide, idx) => ({
        service: slide.service,
        key: `head-${idx}-${slide.key}`,
    }))

    return [...tail, ...base, ...head]
})

const canSlide = computed(() => totalSlides.value > sliderState.visible)

const trackStyles = computed(() => {
    const transition = sliderState.disableTransition ? 'none' : 'transform 0.45s ease'

    if (!sliderState.slideWidth) {
        return {
            transition,
        }
    }

    const offset = sliderState.current * (sliderState.slideWidth + sliderState.gap)

    return {
        transform: `translateX(-${offset}px)`,
        transition,
    }
})

const syncCurrentToActive = (instant = false) => {
    if (!totalSlides.value) {
        return
    }

    if (instant) {
        sliderState.disableTransition = true
    }

    const baseIndex = hasMeasured.value ? sliderState.visible + activeIndex.value : activeIndex.value
    sliderState.current = baseIndex

    if (instant) {
        requestAnimationFrame(() => {
            sliderState.disableTransition = false
        })
    }
}

const measureSlider = () => {
    if (!sliderWrapper.value || !sliderTrack.value || !totalSlides.value) {
        return
    }

    const items = sliderTrack.value.querySelectorAll('li')

    if (!items.length) {
        return
    }

    const firstRect = items[0].getBoundingClientRect()
    sliderState.slideWidth = firstRect.width

    if (items.length > 1) {
        const secondRect = items[1].getBoundingClientRect()
        sliderState.gap = Math.max(0, secondRect.left - firstRect.right)
    } else {
        sliderState.gap = 0
    }

    const wrapperRect = sliderWrapper.value.getBoundingClientRect()
    const itemWidthWithGap = sliderState.slideWidth + sliderState.gap

    if (itemWidthWithGap > 0) {
        sliderState.visible = Math.max(1, Math.floor((wrapperRect.width + sliderState.gap) / itemWidthWithGap))
    } else {
        sliderState.visible = 1
    }

    sliderState.visible = Math.min(sliderState.visible, totalSlides.value)
    hasMeasured.value = true
    syncCurrentToActive(true)
}

let autoplayTimer: ReturnType<typeof setInterval> | null = null
const autoplayDelay = 3500

const stopAutoplay = () => {
    if (!autoplayTimer) {
        return
    }

    clearInterval(autoplayTimer)
    autoplayTimer = null
}

const startAutoplay = () => {
    if (autoplayTimer || !canSlide.value || isHovering.value) {
        return
    }

    autoplayTimer = setInterval(() => {
        goNext(true)
    }, autoplayDelay)
}

const restartAutoplay = () => {
    if (isHovering.value) {
        stopAutoplay()
        return
    }

    stopAutoplay()
    startAutoplay()
}

const goNext = (auto = false) => {
    if (!hasMeasured.value || !canSlide.value || pendingDirection.value) {
        return
    }

    pendingDirection.value = 'next'
    sliderState.disableTransition = false
    sliderState.current += 1

    if (!auto) {
        restartAutoplay()
    }
}

const goPrev = () => {
    if (!hasMeasured.value || !canSlide.value || pendingDirection.value) {
        return
    }

    pendingDirection.value = 'prev'
    sliderState.disableTransition = false
    sliderState.current -= 1

    restartAutoplay()
}

const handleNextClick = () => {
    goNext(false)
}

const handlePrevClick = () => {
    goPrev()
}

const onTransitionEnd = (event: TransitionEvent) => {
    if (!sliderTrack.value || event.target !== sliderTrack.value || event.propertyName !== 'transform') {
        return
    }

    if (!totalSlides.value || !pendingDirection.value) {
        return
    }

    const direction = pendingDirection.value
    pendingDirection.value = null

    if (direction === 'next') {
        activeIndex.value = (activeIndex.value + 1) % totalSlides.value

        if (sliderState.current >= sliderState.visible + totalSlides.value) {
            syncCurrentToActive(true)
        }
    } else {
        activeIndex.value = (activeIndex.value - 1 + totalSlides.value) % totalSlides.value

        if (sliderState.current < sliderState.visible) {
            syncCurrentToActive(true)
        }
    }
}

const handleMouseEnter = () => {
    isHovering.value = true
    stopAutoplay()
}

const handleMouseLeave = () => {
    isHovering.value = false
    startAutoplay()
}

watch(canSlide, (value) => {
    if (!value) {
        stopAutoplay()
        syncCurrentToActive(true)
        return
    }

    if (!isHovering.value) {
        startAutoplay()
    }
})

onMounted(() => {
    nextTick(() => {
        measureSlider()
        syncCurrentToActive(true)
        startAutoplay()
    })

    window.addEventListener('resize', measureSlider)
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', measureSlider)
    stopAutoplay()
})
</script>

<template>
    <section>
        <div class="container">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div class="md:col-span-2">
                    <h2 class="text-5xl text-secondary font-medium text-center lg:text-left">{{ props.title }}</h2>
                </div>
                <div class="md:col-span-1 flex items-end justify-center lg:justify-end">
                    <div class="space-x-5">
                        <button type="button"
                            class="text-secondary hover:text-primary cursor-pointer prev disabled:opacity-40 disabled:cursor-not-allowed"
                            @click="handlePrevClick" :disabled="!canSlide" aria-label="Previous service">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="size-10">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                            </svg>
                        </button>

                        <button type="button"
                            class="text-secondary hover:text-primary cursor-pointer next disabled:opacity-40 disabled:cursor-not-allowed"
                            @click="handleNextClick" :disabled="!canSlide" aria-label="Next service">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="size-10">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div id="services-slider" ref="sliderWrapper"
            class="mt-10 lg:mt-16 mr-0 ml-auto max-w-[calc(((100vw-80rem)/2)+80rem+20px)] overflow-hidden px-5 lg:px-0"
            @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
            <ul ref="sliderTrack" :style="trackStyles" @transitionend="onTransitionEnd"
                class="flex items-center justify-start max-w-full gap-10 will-change-transform">
                <li class="min-w-[100%] md:min-w-[50%] lg:min-w-[33%]" v-for="slide in extendedSlides" :key="slide.key">
                    <ServicesCard :title="slide.service.title" :description="slide.service.description"
                        :icon="slide.service.icon" :link="slide.service.link" />
                </li>
            </ul>
        </div>
    </section>
</template>
