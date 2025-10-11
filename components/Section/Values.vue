<script setup>
const values = [
    {
        title: "Your smile is our success",
        description: "Vivamus quis mi. Phasellus viverra nulla ut metus varius laoreet. Nunc interdum lacus sit amet orci. Sed magna purus, fermentum eu, tincidunt eu, varius ut, felis.",
        image: "https://cdn.prod.website-files.com/649be2f4a7f56f80c8b40711/649c130e8119dc7e03401459_value%201.webp"
    },
    {
        title: "Communication",
        description: "Vivamus quis mi. Phasellus viverra nulla ut metus varius laoreet. Nunc interdum lacus sit amet orci. Sed magna purus, fermentum eu, tincidunt eu, varius ut, felis.",
        image: "https://cdn.prod.website-files.com/649be2f4a7f56f80c8b40711/649c130e3cca037a7a73db21_value%202.webp"
    },
    {
        title: "Professionalism",
        description: "Vivamus quis mi. Phasellus viverra nulla ut metus varius laoreet. Nunc interdum lacus sit amet orci. Sed magna purus, fermentum eu, tincidunt eu, varius ut, felis.",
        image: "https://cdn.prod.website-files.com/649be2f4a7f56f80c8b40711/649c130ee68c4b1212f89840_value%203.webp"
    }
]
</script>

<template>
    <section id="values" class="py-16 lg:py-32 bg-secondary-100">
        <div class="container">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                    <div class="max-w-lg sticky top-10">
                        <h2 class="text-5xl text-secondary font-medium text-center lg:text-left mb-5">Our core values
                        </h2>
                        <p class="text-lg leading-relaxed text-secondary mb-10 font-medium">
                            Vestibulum volutpat pretium libero. Vestibulum facilisis, purus nec pulvinar iaculis, ligula
                            mi congue nunc, vitae euismod ligula urna in dolor.
                            Suspendisse nisl.
                        </p>

                        <button class="btn secondary">
                            About us
                        </button>
                    </div>
                </div>
                <div>
                    <div class="grid grid-cols-1 gap-10">
                        <div v-for="(value, index) in values" :key="index"
                            class="relative overflow-hidden aspect-2/3 lg:aspect-square flex items-end justify-center">
                            <img :src="value?.image" :alt="value?.title"
                                class="h-full w-full object-center object-cover">

                            <div class="bg-gradient-to-t from-0% from-secondary to-80% to-transparent inset-0 absolute">
                            </div>

                            <div class="text-center text-white absolute inset-x-5 lg:inset-x-10 bottom-5 lg:bottom-10">
                                <h5 class="text-xl lg:text-4xl font-medium mb-5">
                                    {{ value?.title }}
                                </h5>
                                <p class="text-lg leading-relaxed">
                                    {{ value?.description }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>