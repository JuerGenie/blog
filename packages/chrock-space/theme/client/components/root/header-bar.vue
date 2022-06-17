<template>
  <div class="header-bar">
    <div class="header-bar-wrapper">
      <site-logo />
      <div class="title-bar flex-1"></div>
      <site-navigator />
    </div>
  </div>
</template>

<script lang="ts" setup>
import SiteLogo from "./site-logo.vue";
import SiteNavigator from "./site-navigator.vue";
</script>

<style lang="postcss" scoped>
.header-bar {
  @apply fixed top-0 inset-x-0 p-2 z-[9999];
  @apply pointer-events-none;

  & > * {
    @apply pointer-events-auto;
  }

  & > .header-bar-wrapper {
    @apply flex flex-row gap-8;
    @apply h-12;

    /* & > .title-bar {
      @apply bg-slate-800 bg-opacity-50 backdrop-blur text-white;
      @apply rounded-xl;
    } */
  }
}
</style>
