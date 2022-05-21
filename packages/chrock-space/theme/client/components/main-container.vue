<template>
  <div class="main-container">
    <site-logo />
    <site-navigator />
    <site-copyright />

    <slot />
  </div>
</template>

<script lang="ts" setup>
import SiteLogo from "../components/site-logo.vue";
import SiteNavigator from "../components/site-navigator.vue";
import SiteCopyright from "../components/site-copyright.vue";
</script>

<style lang="postcss" scoped>
.main-container {
  @apply relative z-10;
}
</style>
