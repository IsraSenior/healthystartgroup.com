<script setup>
const { data: contact } = await useAsyncData('contact-section', () => {
    return queryCollection('sections').path('contact').first()
})
</script>

<template>
    <section id="contact" class="bg-secondary py-16 lg:py-32">
        <div class="container">
            <pre>{{ contact }}</pre>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div class="md:col-span-2">
                    <h2 class="text-5xl text-white font-medium text-center lg:text-left">
                        Book a free consultation
                    </h2>
                </div>
                <div class="md:col-span-1 flex items-end justify-center lg:justify-end">
                    <p class="text-lg leading-relaxed text-white font-medium text-center lg:text-right">
                        Fill in the form or choose one of other options.
                    </p>
                </div>
            </div>

            <div class="mt-16 grid grid-cols-1 md:grid-cols-6 gap-10 lg:gap-32">
                <div class="md:col-span-3">
                    <FormContact />
                </div>

                <div class="md:col-start-4 md:col-end-6 flex items-center">
                    <div class="flex flex-col items-center justify-start space-y-10 divide-primary divide-y">
                        <ul class="flex flex-col space-y-10 w-full max-w-xl pb-10">
                            <li class="group text-white flex items-center justify-start gap-5">
                                <div>
                                    <span class="bg-primary size-16 rounded-full flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            stroke-width="1.5" stroke="currentColor" class="size-8">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M21.75 9v.906a2.25 2.25 0 0 1-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 0 0 1.183 1.981l6.478 3.488m8.839 2.51-4.66-2.51m0 0-1.023-.55a2.25 2.25 0 0 0-2.134 0l-1.022.55m0 0-4.661 2.51m16.5 1.615a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V8.844a2.25 2.25 0 0 1 1.183-1.981l7.5-4.039a2.25 2.25 0 0 1 2.134 0l7.5 4.039a2.25 2.25 0 0 1 1.183 1.98V19.5Z" />
                                        </svg>
                                    </span>
                                </div>
                                <div class="text-white">
                                    <p class="font-medium text-3xl">Our email</p>
                                    <p class="text-lg leading-relaxed font-medium"><a
                                            href="mailto:templates@wavesdesign.io">templates@wavesdesign.io</a></p>
                                </div>
                            </li>

                            <li class="group text-white flex items-center justify-start gap-5">
                                <div>
                                    <span class="bg-primary size-16 rounded-full flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            stroke-width="1.5" stroke="currentColor" class="size-8">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                                        </svg>
                                    </span>
                                </div>
                                <div class="text-white">
                                    <p class="font-medium text-3xl">WhatsApp</p>
                                    <p class="text-lg leading-relaxed font-medium">
                                        <a href="#">+1 600 000 000</a>
                                    </p>
                                </div>
                            </li>

                            <li class="group text-white flex items-center justify-start gap-5">
                                <div>
                                    <span class="bg-primary size-16 rounded-full flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            stroke-width="1.5" stroke="currentColor" class="size-8">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                        </svg>
                                    </span>
                                </div>
                                <div class="text-white">
                                    <p class="font-medium text-3xl">Find us</p>
                                    <p class="text-lg leading-relaxed font-medium">
                                        <a href="#">Open Google Maps</a>
                                    </p>
                                </div>
                            </li>
                        </ul>

                        <div class="text-white w-full pb-10">
                            <p class="font-medium text-3xl mb-5">Visit us</p>
                            <p class="text-lg leading-relaxed font-medium">
                                91020131 <br>
                                Sunset Surf Road <br>
                                San Francisco, CA
                            </p>
                        </div>

                        <div id="socials" class="flex items-center justify-start gap-5 w-full">
                            <a href="#"
                                class="group inline-flex items-center justify-center rounded-full p-3 transition hover:bg-primary text-white"
                                aria-label="Instagram">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                                    viewBox="0 0 24 24">
                                    <path
                                        d="M20.947 8.305a6.5 6.5 0 0 0-.419-2.216 4.6 4.6 0 0 0-2.633-2.633 6.6 6.6 0 0 0-2.186-.42c-.962-.043-1.267-.055-3.709-.055s-2.755 0-3.71.055a6.6 6.6 0 0 0-2.185.42 4.6 4.6 0 0 0-2.633 2.633 6.6 6.6 0 0 0-.419 2.185c-.043.963-.056 1.268-.056 3.71s0 2.754.056 3.71c.015.748.156 1.486.419 2.187a4.6 4.6 0 0 0 2.634 2.632 6.6 6.6 0 0 0 2.185.45c.963.043 1.268.056 3.71.056s2.755 0 3.71-.056a6.6 6.6 0 0 0 2.186-.419 4.62 4.62 0 0 0 2.633-2.633c.263-.7.404-1.438.419-2.187.043-.962.056-1.267.056-3.71-.002-2.442-.002-2.752-.058-3.709m-8.953 8.297c-2.554 0-4.623-2.069-4.623-4.623s2.069-4.623 4.623-4.623a4.623 4.623 0 0 1 0 9.246m4.807-8.339a1.077 1.077 0 0 1-1.078-1.078 1.077 1.077 0 1 1 2.155 0c0 .596-.482 1.078-1.077 1.078">
                                    </path>
                                    <path d="M11.994 8.976a3.003 3.003 0 1 0 0 6.006 3.003 3.003 0 1 0 0-6.006"></path>
                                </svg>
                            </a>
                            <a href="#"
                                class="group inline-flex items-center justify-center rounded-full p-3 transition hover:bg-primary text-white"
                                aria-label="Facebook">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                                    viewBox="0 0 24 24">
                                    <path
                                        d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22 22 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202z">
                                    </path>
                                </svg>
                            </a>
                            <a href="#"
                                class="group inline-flex items-center justify-center rounded-full p-3 transition hover:bg-primary text-white"
                                aria-label="YouTube">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                                    viewBox="0 0 24 24">
                                    <path
                                        d="M21.593 7.203a2.5 2.5 0 0 0-1.762-1.766C18.265 5.007 12 5 12 5s-6.264-.007-7.831.404a2.56 2.56 0 0 0-1.766 1.778c-.413 1.566-.417 4.814-.417 4.814s-.004 3.264.406 4.814c.23.857.905 1.534 1.763 1.765 1.582.43 7.83.437 7.83.437s6.265.007 7.831-.403a2.52 2.52 0 0 0 1.767-1.763c.414-1.565.417-4.812.417-4.812s.02-3.265-.407-4.831M9.996 15.005l.005-6 5.207 3.005z">
                                    </path>
                                </svg>
                            </a>
                            <a href="#"
                                class="group inline-flex items-center justify-center rounded-full p-3 transition hover:bg-primary text-white"
                                aria-label="TikTok">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                                    viewBox="0 0 24 24">
                                    <path
                                        d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 3 3 0 0 1 .88.13V9.4a7 7 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a5 5 0 0 1-1-.1z">
                                    </path>
                                </svg>
                            </a>
                            <a href="#"
                                class="group inline-flex items-center justify-center rounded-full p-3 transition hover:bg-primary text-white"
                                aria-label="LinkedIn">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                                    viewBox="0 0 24 24">
                                    <path
                                        d="M4.983 2.821a2.188 2.188 0 1 0 0 4.376 2.188 2.188 0 1 0 0-4.376M9.237 8.855v12.139h3.769v-6.003c0-1.584.298-3.118 2.262-3.118 1.937 0 1.961 1.811 1.961 3.218v5.904H21v-6.657c0-3.27-.704-5.783-4.526-5.783-1.835 0-3.065 1.007-3.568 1.96h-.051v-1.66zm-6.142 0H6.87v12.139H3.095z">
                                    </path>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
