<template>
  <router-link class="site-logo" :to="routeTarget.home">
    {{ siteData.title }}
  </router-link>
</template>

<script lang="ts" setup>
import { useSiteData } from "@vuepress/client";
import { routeTarget } from "../utils/router";

const siteData = useSiteData();
</script>

<style lang="postcss" scoped>
.site-logo {
  @apply pt-2 pb-4 pl-4 pr-6;
  @apply hover:px-5 hover:py-3;
  @apply text-2xl text-slate-100 text-center font-extralight;
  @apply rounded-br-3xl hover:rounded-br-lg;
  @apply cursor-pointer;
  @apply fixed top-0 left-0 z-[9999] drop-shadow-xl;

  --bg-position: 0%;
  background-image: linear-gradient(
      60deg,
      theme("colors.slate.800"),
      theme("colors.slate.800") calc(25% + var(--bg-position)),
      transparent 0,
      transparent
    ),
    linear-gradient(
      120deg,
      theme("colors.slate.700"),
      theme("colors.slate.700") calc(40% + var(--bg-position)),
      transparent 0,
      transparent
    ),
    linear-gradient(
      60deg,
      theme("colors.slate.600"),
      theme("colors.slate.600") calc(65% + var(--bg-position)),
      transparent 0,
      transparent
    ),
    linear-gradient(
      120deg,
      theme("colors.slate.500"),
      theme("colors.slate.500")
    );
}
</style>
