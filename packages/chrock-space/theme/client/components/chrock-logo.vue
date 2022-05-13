<template>
  <chrock-icon-btn
    class="chrock-logo"
    :icon="siteName"
    :description="siteDescription"
    size="1.5rem"
  />
</template>

<script lang="ts" setup>
import {} from "@vuepress/client";

defineProps<{
  siteName: string;
  siteDescription?: string;
}>();
</script>

<style lang="postcss" scoped>
.chrock-logo {
  @apply bg-slate-800 text-slate-300;
}
</style>
