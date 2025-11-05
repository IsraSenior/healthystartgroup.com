<script setup>
    defineProps({
        person: {
            type: Object,
            required: true
        }
    })
</script>

<template>
    <div>
        <!-- <div class="aspect-square overflow-hidden">
            <img :src="person?.image" :alt="person?.name" class="h-full w-full object-cover object-center">
        </div> -->
        <div class="p-5 text-center space-y-5">
            <h4 class="text-2xl text-secondary font-normal">
                {{ person?.name }}
            </h4>
            <p class="text-primary text-lg">
                {{ person?.role }}
            </p>
        </div>
    </div>
</template>