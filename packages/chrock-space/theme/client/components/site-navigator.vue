<template>
  <div :class="{ 'site-navigator': true, 'show-bg': showBg }">
    <div class="buttons">
      <router-link v-for="button in buttons" :key="button.to" :to="button.to">
        <el-button text>{{ button.label }}</el-button>
      </router-link>
    </div>
    <div class="bg-wrapper" />
  </div>
</template>

<script lang="ts" setup>
import { useScroll } from "@vueuse/core";
import { computed } from "vue";
import { RouterLink } from "vue-router";
import { routeTarget } from "../utils/router";

const buttons = [
  {
    label: "GROUPS",
    to: routeTarget.groups,
  },
  {
    label: "TAGS",
    to: routeTarget.tags,
  },
  {
    label: "LINKS",
    to: routeTarget.links,
  },
];

const { y } = useScroll(window);
const showBg = computed(() => y.value > 100);
</script>

<style lang="postcss" scoped>
.site-navigator {
  @apply py-4 pr-6 pl-16;
  @apply text-2xl text-slate-100;
  @apply fixed -top-2 -right-2 z-[9999] drop-shadow-xl;

  & .buttons {
    @apply flex flex-row gap-2 relative z-10;
  }

  & .bg-wrapper {
    @apply opacity-0;
    @apply bg-gradient-to-r from-transparent to-white;
    @apply absolute inset-0 z-0;
  }
  &.show-bg .bg-wrapper {
    @apply opacity-100;
  }
}
</style>
