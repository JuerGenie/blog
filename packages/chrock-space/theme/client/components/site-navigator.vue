<template>
  <div :class="{ 'site-navigator': true, 'show-bg': showBg }">
    <div class="buttons">
      <router-link v-for="button in buttons" :key="button.to" :to="button.to">
        <el-button text color="#fff0">
          {{ button.label }}
        </el-button>
      </router-link>
      <!-- <chrock-search /> -->
      <el-button class="!text-gray-500" text color="#ddd0" disabled>
        LINKS
      </el-button>
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
  // {
  //   label: "LINKS",
  //   to: routeTarget.links,
  // },
];

const y = __VUEPRESS_SSR__ ? ref(0) : useScroll(window).y;
const showBg = computed(() => y.value > 100);
</script>

<style lang="postcss" scoped>
.site-navigator {
  @apply py-2 px-2;
  @apply text-2xl;
  @apply fixed top-0 right-0 z-[9999];

  & .buttons {
    @apply flex flex-row gap-2 relative z-10 items-center;

    & > a {
      @apply flex;
    }
  }

  & .bg-wrapper {
    @apply opacity-0 duration-500;
    /* @apply bg-gradient-to-r from-transparent via-white to-white; */
    @apply bg-white bg-opacity-60;
    @apply absolute inset-0 z-0 drop-shadow-xl backdrop-blur;
    @apply rounded-bl-md;
  }
  &.show-bg .bg-wrapper {
    @apply opacity-100;
  }
}
</style>
