<template>
  <router-link class="site-logo" :to="routeTarget.home">
    {{ siteData.title }}
  </router-link>
</template>

<script lang="ts" setup>
import { useSiteData } from "@vuepress/client";
import { routeTarget } from "../../utils/router";
import { RouterLink } from "vue-router";

const siteData = useSiteData();
</script>

<style lang="postcss" scoped>
.site-logo {
  @apply px-4 py-2;
  @apply hover:scale-110 duration-500;
  @apply text-2xl text-slate-100 text-center font-extralight;
  @apply cursor-pointer rounded-xl drop-shadow-xl;

  @apply bg-slate-800;
}
</style>
