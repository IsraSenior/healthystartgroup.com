<script setup lang="ts">
const defaultAvatar =
    'https://cdn.prod.website-files.com/649be2f4a7f56f80c8b40711/649c107dbf28ab02a455276e_SmallPerson.webp'

const props = withDefaults(
    defineProps<{
        quote: string
        name: string
        role?: string
        avatar?: string
    }>(),
    {
        quote: 'Vestibulum volutpat pretium libero. Vestibulum facilisis, purus nec pulvinar iaculis.',
        name: 'Kelly John',
        role: 'Head Chief Doctor',
        avatar: defaultAvatar,
    },
)
</script>

<template>
    <article
        class="relative w-full h-full flex flex-col min-h-[35vh] justify-between gap-6 bg-secondary-100 px-10 py-12 text-secondary transition-colors duration-300 ease-in">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-10">

            <div class="flex items-center justify-center md:col-span-1">
                <div class="rounded-full aspect-square size-24 lg:size-auto lg:min-h-[90%] lg:min-w-[90%] overflow-hidden relative">
                    <img :src="props.avatar || defaultAvatar" :alt="props.name"
                        class="min-h-full min-w-full w-full h-full bg-primary object-center object-cover text-center" />
                </div>
            </div>


            <div class="flex items-center justify-center md:col-span-2">
                <div class="max-w-xl text-center lg:text-left">
                    <q class="mt-6 text-2xl font-medium leading-tight">
                        {{ props.quote }}
                    </q>
                    <p class="text-lg leading-relaxed text-secondary mt-5">
                        {{ props.name }} <br />
                        <span v-if="props.role">{{ props.role }}</span>
                    </p>
                </div>
            </div>
        </div>
    </article>
</template>
