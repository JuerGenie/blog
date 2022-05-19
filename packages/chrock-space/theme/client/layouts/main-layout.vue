<template>
  <el-container class="main-container">
    <site-logo />

    <main class="layout-main">
      <post-content />
    </main>
  </el-container>
</template>

<script lang="ts" setup>
import { useSiteData } from "@vuepress/client";
import PostContent from "../components/post-content.vue";
import SiteLogo from "../components/site-logo.vue";

const siteData = useSiteData();
</script>

<style lang="postcss" scoped>
.main-container {
  @apply h-full;
  @apply relative z-10;

  & .layout-main {
    @apply scroll-py-16;
  }
}

.chrock-background {
  @apply !absolute inset-0 z-0;
  @apply opacity-50;
  @apply pointer-events-none;
}
</style>
