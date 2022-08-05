<template>
  <main-page :cover="cover">
    <template #header>
      <div class="header-panel">
        <div class="title">
          {{ title }}
        </div>
        <div class="divider" />
        <div class="subtitle">{{ subtitle }}</div>
      </div>
    </template>

    <section-label>子分组({{ groups.length }})</section-label>
    <div class="group-list">
      <router-link v-if="!!parentNode" :to="`/groups${parentNode.path}`">
        <div class="group-item">
          <i class="mdi mdi-arrow-left-circle" />
          <div>返回</div>
          <!-- <el-image class="group-background" fit="cover" lazy>
            <template #error>
              <div class="failed-slot" />
            </template>
          </el-image> -->
        </div>
      </router-link>
      <group-item v-for="group in groups" :key="group.path" :group="group" />
    </div>
    <section-label>分组文章({{ posts.length }})</section-label>
    <div class="post-list">
      <post-item
        v-for="page in posts"
        :key="page.name"
        :post="pagesData[page.name as string]"
      />
      <div v-if="!posts.length">分组下没有文章哦</div>
    </div>
  </main-page>
</template>

<script lang="ts" setup>
import { computed, watchEffect } from "vue";
import { useRouter } from "vue-router";
import MainPage from "../components/main-page.vue";
import PostItem from "../components/post-item.vue";
import GroupItem from "../components/group-item.vue";
import SectionLabel from "../components/section-label.vue";
import { usePageData } from "@vuepress/client";
import { excludePages } from "../utils/constants";
import { pagesData } from "../composables/posts";

const router = useRouter();
const routes = router
  .getRoutes()
  .filter((route) => !route.redirect && !excludePages.includes(route.path));

const cover = computed(() => "https://picsum.photos/seed/group-page/1920/1080");

watchEffect(() => {
  if (!router.currentRoute.value.path.endsWith("/")) {
    router.replace(`${router.currentRoute.value.path}/`);
  }
});

const pageData = usePageData();

const title = computed(
  () =>
    pageData.value.title ||
    router.currentRoute.value.path
      .split("/")
      .filter((path) => !!path)
      .pop() ||
    router.currentRoute.value.meta.title ||
    "GROUPS"
);
const subtitle = computed(
  () =>
    pageData.value.frontmatter.description ||
    router.currentRoute.value.meta.subtitle ||
    "Rage, rage against the dying of the light."
);

const subPages = computed(() =>
  routes.filter((route) => route.meta.parentGroup === pageData.value.key)
);
const posts = computed(() => subPages.value.filter((page) => !page.meta.group));
const groups = computed(() => subPages.value.filter((page) => page.meta.group));
const parentNode = computed(() =>
  router
    .getRoutes()
    .find((route) => route.name === router.currentRoute.value.meta.parentGroup)
);
</script>

<style lang="postcss" scoped>
.header-panel {
  @apply relative z-10;
  @apply h-48;
  @apply flex flex-col justify-center items-center;
  @apply text-white text-6xl font-extralight;
  @apply drop-shadow;

  .title {
    @apply tracking-widest;
  }

  .divider {
    @apply w-full border rounded my-2;
  }

  .subtitle {
    @apply text-xl;
  }
}

.group-list {
  @apply flex flex-row flex-wrap gap-8 pt-4 py-24;
}

.post-list {
  @apply bg-white;
  @apply flex flex-col items-center pt-8 py-24 gap-24;

  .post-list-enter-from,
  .post-list-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }

  .post-list-leave-active {
    position: absolute;
  }
}

.group-item {
  @apply flex flex-col justify-center items-center;
  @apply w-56 h-48;
  @apply rounded-lg;
  @apply overflow-hidden;
  @apply hover:shadow-lg;
  @apply select-none cursor-pointer;
  @apply relative;

  & > .mdi {
    @apply text-6xl mt-4;
  }
  /* &:hover > .mdi {
    @apply text-8xl;
  } */
  & > .mdi + div {
    @apply text-2xl;
  }

  & .group-background {
    @apply absolute inset-0 z-0;

    @apply pointer-events-none;
    @apply opacity-40;

    & .failed-slot {
      @apply w-full h-full;

      background-image: linear-gradient(
        60deg,
        theme("colors.slate.300"),
        theme("colors.slate.200") 60%,
        theme("colors.slate.300") 0
      );
    }
  }
}
</style>
