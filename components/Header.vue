<script setup>
const isFixed = ref(false);

const handleScroll = () => {
  isFixed.value = window.scrollY > 1;
};

onMounted(() => {
  handleScroll();
  window.addEventListener('scroll', handleScroll, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});

const toogleOffcanva = function() {
    offcanvasStatus.value = !offcanvasStatus.value
}
const offcanvasStatus = ref(false)
</script>

<template>
    <header :class="['bg-secondary z-10', isFixed ? 'fixed top-0 inset-x-0' : 'relative']">
        <div class="container py-3.5 relative">
            <div class="flex items-center justify-between">
                <div>
                    <NuxtLink to="/">
                        <Logo class="h-8 md:h-12" primary="text-primary" secondary="text-white" />
                    </NuxtLink>
                </div>
                <div class="flex items-center justify-end space-x-10">
                    <nav class="items-center justify-center space-x-5 nav-header hidden lg:flex">
                        <NuxtLink to="/about">About us</NuxtLink>
                        <NuxtLink to="/services">Services</NuxtLink>
                        <NuxtLink to="/articles">Blog</NuxtLink>
                        <NuxtLink to="/contact">Contact us</NuxtLink>
                    </nav>
                    
                    <div class="lg:flex">
                        <NuxtLink to="/contact" class="btn primary hidden lg:block">Request a consultation</NuxtLink>
                        <button class="text-white hover:text-primary lg:hidden" @click.prevent="toogleOffcanva">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8">
                                <path v-if="!offcanvasStatus" stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                <path v-else stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
                
            </div>

            <div v-if="offcanvasStatus" class="bg-secondary w-full  min-h-[70vh] absolute inset-x-0 top-full py-10">
                <div class="space-y-10 px-5">
                    <div class="flex flex-col items-center justify-center space-y-2.5 nav-header-mobile">
                        <NuxtLink @click.native="toogleOffcanva" to="/about">About us</NuxtLink>
                        <NuxtLink @click.native="toogleOffcanva" to="/services">Services</NuxtLink>
                        <NuxtLink @click.native="toogleOffcanva" to="/articles">Blog</NuxtLink>
                        <NuxtLink @click.native="toogleOffcanva" to="/contact">Contact us</NuxtLink>
                    </div>
                    <div class="space-y-10 flex flex-col items-center justify-center">
                        <NuxtLink @click.native="toogleOffcanva" to="/contact" class="btn primary">Request a consultation</NuxtLink>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>
