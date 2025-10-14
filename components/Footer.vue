<script setup>
const { data: footer } = useI18nResource('sections.footer');
</script>

<template>
  <footer class="bg-primary py-10">
    <div class="container">
      <div class="flex flex-col md:flex-row space-y-6 md:space-y-0 items-center justify-between">
        <p class="text-white text-lg font-normal text-center mg:text-left">
          ©
          <a
            href="https://healthystargroup.com"
            target="_parent"
            rel="noopener noreferrer"
            class="hover:underline underline-offset-4"
            >HealthyStart Group</a
          >
          {{ new Date().getFullYear() }}. <br class="md:hidden">
          {{ footer?.rights }}. <br class="md:hidden"></br>
          {{ footer?.developed }}
          <a
            href="https://zunamicorp.com"
            target="_blank"
            rel="noopener noreferrer"
            class="hover:underline underline-offset-4"
            >Zunami</a
          >.
        </p>
        <div class="flex flex-col lg:flex-row items-center justify-between space-y-5 md:space-y-0 md:space-x-10">
          <NuxtLink
            to="/privacy-policies"
            class="text-white text-lg hover:underline hover:text-secondary font-meidum underline-offset-4 font-normal"
          >
            Privacy Policy
          </NuxtLink>

          <LangSwitcher />
        </div>
      </div>
    </div>
  </footer>
</template>
