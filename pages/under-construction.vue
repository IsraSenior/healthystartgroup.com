<template>
  <div class="min-h-screen bg-secondary flex items-center justify-center px-4 py-16 relative overflow-hidden">
    <!-- Animated Ripples Background -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="ripple ripple-1"></div>
      <div class="ripple ripple-2"></div>
      <div class="ripple ripple-3"></div>
    </div>

    <div class="text-center max-w-5xl w-full relative z-10">
      <!-- Logo -->
      <div class="flex justify-center mb-12">
        <NuxtLink to="/" class="w-64 md:w-80 lg:w-96">
          <Logo primary="text-primary" secondary="text-white" />
        </NuxtLink>
      </div>

      <h1 class="text-5xl md:text-7xl lg:text-8xl font-normal text-white mb-6 tracking-tight">
        Under Construction
      </h1>
      <p class="text-xl md:text-2xl text-white/80 font-light mb-12">
        We're building something great. Check back soon.
      </p>
      <div class="flex items-center justify-center gap-2 mb-16">
        <div class="w-2 h-2 bg-primary rounded-full animate-bounce" style="animation-delay: 0ms"></div>
        <div class="w-2 h-2 bg-primary rounded-full animate-bounce" style="animation-delay: 150ms"></div>
        <div class="w-2 h-2 bg-primary rounded-full animate-bounce" style="animation-delay: 300ms"></div>
      </div>

      <!-- Contact Information -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 text-left">
        <!-- Email -->
        <div>
          <h3 class="text-white/60 text-sm font-light mb-3">Our email</h3>
          <a href="mailto:info@healthystartgroup.com" class="text-white text-base hover:text-primary transition-colors">
            info@healthystartgroup.com
          </a>
        </div>

        <!-- WhatsApp -->
        <div>
          <h3 class="text-white/60 text-sm font-light mb-3">WhatsApp</h3>
          <a href="https://wa.me/19142141242" target="_blank" class="text-white text-base hover:text-primary transition-colors">
            +1 (914) 2141242
          </a>
        </div>

        <!-- Google Maps -->
        <div>
          <h3 class="text-white/60 text-sm font-light mb-3">Find us</h3>
          <a href="https://maps.google.com/?q=731+James+St,+Syracuse,+NY+13203" target="_blank" class="text-white text-base hover:text-primary transition-colors">
            Open Google Maps
          </a>
        </div>
      </div>

      <!-- Visit us - Expandable Section -->
      <div class="mb-12">
        <details class="group bg-white/5 backdrop-blur-sm rounded-lg p-6 hover:bg-white/10 transition-colors">
          <summary class="cursor-pointer list-none flex items-center justify-between text-white/80 hover:text-white transition-colors">
            <div class="flex items-center gap-3">
              <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span class="font-medium">Visit our locations</span>
            </div>
            <svg class="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <!-- New York Locations -->
            <div>
              <h4 class="text-white font-semibold mb-3 flex items-center gap-2">
                <span class="text-primary">●</span>
                New York
              </h4>
              <div class="text-white/70 text-sm space-y-3 pl-4">
                <div class="hover:text-white transition-colors">
                  <p class="font-medium text-white/90">Syracuse</p>
                  <p>731 James St, 2nd Floor<br>Syracuse, NY 13203</p>
                </div>
                <div class="hover:text-white transition-colors">
                  <p class="font-medium text-white/90">Buffalo (Broadway)</p>
                  <p>1049 Broadway St<br>Buffalo, NY 14212</p>
                </div>
                <div class="hover:text-white transition-colors">
                  <p class="font-medium text-white/90">Buffalo (Grant)</p>
                  <p>96 Grant St<br>Buffalo, NY 14213</p>
                </div>
                <div class="hover:text-white transition-colors">
                  <p class="font-medium text-white/90">Binghamton</p>
                  <p>328 Clinton St<br>Binghamton, NY 13905</p>
                </div>
              </div>
            </div>

            <!-- Pennsylvania Location -->
            <div>
              <h4 class="text-white font-semibold mb-3 flex items-center gap-2">
                <span class="text-primary">●</span>
                Pennsylvania
              </h4>
              <div class="text-white/70 text-sm space-y-3 pl-4">
                <div class="hover:text-white transition-colors">
                  <p class="font-medium text-white/90">Lancaster</p>
                  <p>Lower Level Manor Shopping Center<br>1250 Millersville Pike<br>Lancaster, PA 17603</p>
                </div>
              </div>
            </div>
          </div>
        </details>
      </div>

      <!-- Social Media Links -->
      <div class="flex items-center justify-center gap-6 mb-12">
        <a href="https://www.facebook.com/healthystartgroup" target="_blank" rel="noopener noreferrer" class="text-white/60 hover:text-primary transition-colors">
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" />
          </svg>
        </a>
        <a href="https://www.instagram.com/healthystartgroup" target="_blank" rel="noopener noreferrer" class="text-white/60 hover:text-primary transition-colors">
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd" />
          </svg>
        </a>
        <a href="https://www.linkedin.com/company/healthystartgroup" target="_blank" rel="noopener noreferrer" class="text-white/60 hover:text-primary transition-colors">
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
          </svg>
        </a>
        <a href="https://wa.me/19142141242" target="_blank" rel="noopener noreferrer" class="text-white/60 hover:text-primary transition-colors">
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
        </a>
      </div>

      <!-- Copyright -->
      <div class="text-white/50 text-sm">
        <p>© HealthyStart Group 2025. All rights reserved. Developed by <a href="https://zunami.studio" target="_blank" class="hover:text-primary transition-colors underline decoration-dotted underline-offset-4">Zunami</a>.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: false
});

useSeoMeta({
  title: 'Under Construction | HealthyStart Group',
  description: 'Our website is currently under construction. We\'re building something great.',
  robots: 'noindex, nofollow'
});
</script>

<style scoped>
/* Ripple Animation */
.ripple {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  animation: ripple 12s infinite ease-in-out;
}

.ripple-1 {
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(14, 170, 149, 0.4) 0%, rgba(14, 170, 149, 0.2) 40%, transparent 70%);
  top: -10%;
  left: -10%;
  animation-delay: 0s;
}

.ripple-2 {
  width: 800px;
  height: 800px;
  background: radial-gradient(circle, rgba(0, 45, 116, 0.35) 0%, rgba(0, 45, 116, 0.15) 40%, transparent 70%);
  top: 30%;
  right: -15%;
  animation-delay: 4s;
}

.ripple-3 {
  width: 700px;
  height: 700px;
  background: radial-gradient(circle, rgba(14, 170, 149, 0.3) 0%, rgba(14, 170, 149, 0.15) 40%, transparent 70%);
  bottom: -15%;
  left: 30%;
  animation-delay: 8s;
}

@keyframes ripple {
  0% {
    transform: scale(0.7) translate(0, 0);
    opacity: 0;
  }
  15% {
    opacity: 1;
  }
  50% {
    transform: scale(1.1) translate(20px, -20px);
    opacity: 0.8;
  }
  85% {
    opacity: 0.3;
  }
  100% {
    transform: scale(1.4) translate(40px, -40px);
    opacity: 0;
  }
}
</style>
