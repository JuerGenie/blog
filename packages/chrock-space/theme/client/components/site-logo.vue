<template>
  <router-link class="site-logo" to="/">
    {{ siteData.title }}
  </router-link>
</template>

<script lang="ts" setup>
import { useSiteData } from "@vuepress/client";

const siteData = useSiteData();
</script>

<style lang="postcss" scoped>
.site-logo {
  @apply py-4 px-6;
  @apply text-2xl text-slate-100 text-center;
  @apply rounded-br-2xl;
  @apply cursor-pointer;
  @apply fixed -top-2 -left-2 z-[9999] drop-shadow-xl;
  @apply hover:top-0 hover:left-0 transition-all;

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
