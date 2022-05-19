<template>
  <div class="site-aside">
    <router-link to="/">
      <div class="site-logo">
        {{ siteData.title }}
      </div>
    </router-link>
    <el-divider />
    <router-link v-for="nav in navMenu" :to="nav.to">
      <el-button
        class="w-full"
        size="large"
        text
        :type="currentType === nav.to.query.type ? 'primary' : 'default'"
      >
        {{ nav.label }}
      </el-button>
    </router-link>
  </div>
</template>

<script lang="ts" setup>
import { useSiteData } from "@vuepress/client";
import { computed } from "vue";
import { RouterLink, useRoute } from "vue-router";

const siteData = useSiteData();

const navMenu = [
  {
    label: "文章 | POSTS",
    to: {
      path: "/",
      query: {
        type: "posts",
      },
    },
  },
  {
    label: "分组 | GROUPS",
    to: {
      path: "/",
      query: {
        type: "group",
      },
    },
  },
  {
    label: "标签 | TAGS",
    to: {
      path: "/",
      query: {
        type: "tags",
      },
    },
  },
];
const currentRoute = useRoute();
const currentType = computed(() => currentRoute.query.type);
</script>

<style lang="postcss" scoped>
.site-aside {
  @apply flex flex-col;

  & .site-logo {
    @apply w-full h-auto py-2;
    @apply text-4xl text-slate-200 text-center;
    @apply rounded;
    @apply cursor-pointer;

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

    @apply opacity-80 hover:opacity-100 transition-all;
  }
}
</style>
