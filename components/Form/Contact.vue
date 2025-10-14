<script setup>
const props = defineProps({
  content: {
    type: Object,
    required: true,
  },
});

const fields = computed(() => props.content?.fields ?? {});
</script>

<template>
  <form class="bg-secondary-50 h-full p-5 lg:p-10 grid grid-cols-1 gap-10">
    <div>
      <label
        for="name"
        class="block text-lg font-normal text-secondary uppercase"
      >
        {{ fields?.name?.label }}
      </label>
      <div class="mt-2.5">
        <input
          type="text"
          name="name"
          id="name"
          class="block w-full rounded-full bg-transparent px-5 py-2.5 text-base text-secondary ring-1 ring-primary focus:ring-secondary placeholder:text-secondary sm:text-lg"
          :placeholder="fields?.name?.placeholder"
        />
      </div>
    </div>

    <div>
      <label
        for="phone"
        class="block text-lg font-normal text-secondary uppercase"
      >
        {{ fields?.phone?.label }}
      </label>
      <div class="mt-2.5">
        <input
          type="tel"
          name="phone"
          id="phone"
          class="block w-full rounded-full bg-transparent px-5 py-2.5 text-base text-secondary ring-1 ring-primary focus:ring-secondary placeholder:text-secondary sm:text-lg"
          :placeholder="fields?.phone?.placeholder"
        />
      </div>
    </div>

    <div>
      <label
        for="email"
        class="block text-lg font-normal text-secondary uppercase"
      >
        {{ fields?.email?.label }}
      </label>
      <div class="mt-2.5">
        <input
          type="email"
          name="email"
          id="email"
          class="block w-full rounded-full bg-transparent px-5 py-2.5 text-base text-secondary ring-1 ring-primary focus:ring-secondary placeholder:text-secondary sm:text-lg"
          :placeholder="fields?.email?.placeholder"
          
        />
      </div>
    </div>

    <div>
      <label
        for="message"
        class="block text-lg font-normal text-secondary uppercase"
      >
        {{ fields?.message?.label }}
      </label>
      <div class="mt-2.5">
        <textarea
          name="message"
          id="message"
          class="block w-full rounded-xl h-32 bg-transparent px-5 py-2.5 text-base text-secondary ring-1 ring-primary focus:ring-secondary placeholder:text-secondary sm:text-lg"
          :placeholder="fields?.message?.placeholder"
        />
      </div>
    </div>

    <div>
      <button class="btn secondary w-full">
        {{ props.content?.submitBtn }}
      </button>
    </div>
  </form>
</template>
