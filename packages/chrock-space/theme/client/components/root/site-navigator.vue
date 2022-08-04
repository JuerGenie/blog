<template>
  <div :class="{ 'site-navigator': true, 'show-bg': showBg }">
    <div class="buttons">
      <router-link v-for="button in buttons" :key="button.to" :to="button.to">
        <el-button text color="#00000040">
          {{ button.label }}
        </el-button>
      </router-link>
      <!-- <chrock-search /> -->
      <el-button class="!text-gray-500" text color="#dddddd00" disabled>
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
import { routeTarget } from "../../utils/router";

const buttons = [
  {
    label: "HOME",
    to: routeTarget.home,
  },
  {
    label: "GROUPS",
    to: routeTarget.groups,
  },
  {
    label: "TAGS",
    to: routeTarget.tags,
  },
];

const y = __VUEPRESS_SSR__ ? ref(0) : useScroll(window).y;
const showBg = computed(() => y.value > 100);
</script>

<style lang="postcss" scoped>
.site-navigator {
  @apply text-2xl relative;
  @apply flex flex-row justify-center items-center py-[auto] px-2;

  & .buttons {
    @apply flex flex-row gap-2 relative z-10 items-center;

    & > a {
      @apply flex;
    }

    & button {
      @apply bg-black bg-opacity-0 !important;

      &:hover {
        @apply bg-opacity-10 !important;
      }
    }
  }

  & .bg-wrapper {
    @apply opacity-100 duration-500;
    @apply bg-slate-600 bg-opacity-60;
    @apply absolute inset-0 z-0 drop-shadow-xl backdrop-blur;
    @apply rounded-md;
  }
  /* &.show-bg {
    & .bg-wrapper {
      @apply opacity-100;
    }
  } */
}
</style>
