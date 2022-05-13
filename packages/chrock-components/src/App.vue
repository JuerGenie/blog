<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import ShowButton from "./components/ShowButton.vue";
</script>

<template>
  <div class="max-w-[32rem] w-[80vw]">
    <ShowButton />
  </div>
</template>

<style lang="postcss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;

  @apply w-full h-full overflow-auto;
  @apply pt-8;
  @apply flex flex-col items-center;
}
</style>
