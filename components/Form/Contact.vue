<script setup>

</script>

<template>
    <form class="bg-secondary-50 p-5 lg:p-10 grid grid-cols-1 gap-10">
        <div>
            <label for="name" class="block text-lg font-medium text-secondary uppercase">Full name</label>
            <div class="mt-2.5">
                <input type="text" name="name" id="name"
                    class="block w-full rounded-full bg-transparent px-5 py-2.5 text-base text-secondary ring-2 ring-primary focus:ring-secondary placeholder:text-secondary sm:text-lg"
                    placeholder="Joe Doe" />
            </div>
        </div>

        <div>
            <label for="phone" class="block text-lg font-medium text-secondary uppercase">Phone</label>
            <div class="mt-2.5">
                <input type="tel" name="phone" id="phone"
                    class="block w-full rounded-full bg-transparent px-5 py-2.5 text-base text-secondary ring-2 ring-primary focus:ring-secondary placeholder:text-secondary sm:text-lg"
                    placeholder="+1 800 000 0000" />
            </div>
        </div>

        <div>
            <label for="email" class="block text-lg font-medium text-secondary uppercase">Email</label>
            <div class="mt-2.5">
                <input type="email" name="email" id="email"
                    class="block w-full rounded-full bg-transparent px-5 py-2.5 text-base text-secondary ring-2 ring-primary focus:ring-secondary placeholder:text-secondary sm:text-lg"
                    placeholder="j.doe@gmail.com" />
            </div>
        </div>

        <div>
            <label for="message" class="block text-lg font-medium text-secondary uppercase">How can we help you?</label>
            <div class="mt-2.5">
                <textarea name="message" id="message"
                    class="block w-full rounded-xl h-32 bg-transparent px-5 py-2.5 text-base text-secondary ring-2 ring-primary focus:ring-secondary placeholder:text-secondary sm:text-lg"
                    placeholder="I have a problem with..." />
            </div>
        </div>

        <div>
            <button class="btn secondary w-full">
                Submit
            </button>
        </div>
    </form>
</template>