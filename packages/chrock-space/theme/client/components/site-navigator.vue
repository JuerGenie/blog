<template>
  <div :class="{ 'site-navigator': true, 'show-bg': showBg }">
    <div class="buttons">
      <router-link v-for="button in buttons" :key="button.to" :to="button.to">
        <el-button text color="#fff0">{{ button.label }}</el-button>
      </router-link>
      <!-- <chrock-search /> -->
    </div>
    <div class="bg-wrapper" />
  </div>
</template>

<script lang="ts" setup>
import { useScroll } from "@vueuse/core";
import { computed, ref } from "vue";
import { RouterLink } from "vue-router";
import { routeTarget } from "../utils/router";
import ChrockSearch from "./chrock-search.vue";

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

const y = __VUEPRESS_SSR__ ? ref(0) : useScroll(window).y;
const showBg = computed(() => y.value > 100);
</script>

<style lang="postcss" scoped>
.site-navigator {
  @apply py-4 pr-6 pl-24;
  @apply text-2xl text-slate-100;
  @apply fixed top-0 right-0 z-[9999];

  & .buttons {
    @apply flex flex-row gap-2 relative z-10 items-center;
  }

  & .bg-wrapper {
    @apply opacity-0 duration-500;
    @apply bg-gradient-to-r from-transparent via-white to-white;
    @apply absolute inset-0 z-0 drop-shadow-xl;
  }
  &.show-bg .bg-wrapper {
    @apply opacity-100;
  }
}
</style>
