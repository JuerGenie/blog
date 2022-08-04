<template>
  <main class="layout-main">
    <div class="first-item">
      <author-card />
    </div>
    <div class="middle-item">
      <template v-for="[date, posts] in dateGroups">
        <section-label>{{ date }}</section-label>
        <post-item v-for="page in posts" :key="page.key" :post="page" />
      </template>
    </div>
    <div class="final-item">
      <div
        class="bg-white bg-opacity-20 backdrop-blur p-8 rounded-lg shadow-2xl max-w-lg"
      >
        <div class="text-2xl">特别鸣谢</div>
        <div class="mt-4 flex flex-row flex-wrap gap-2">
          <el-tag
            v-for="name in specialThanks"
            size="large"
            type="success"
            effect="dark"
          >
            {{ name }}
          </el-tag>
        </div>
      </div>
    </div>

    <!-- <parallax class="chrock-background" :wrapper="layoutMainRef" :speed="1">
      <el-image
        class="w-full h-full"
        :src="`https://picsum.photos/seed/${seed}/1920/1080`"
        fit="cover"
      />
    </parallax> -->
    <el-image
      class="chrock-background"
      :src="`https://picsum.photos/seed/${seed}/1920/1080`"
      fit="cover"
    />
  </main>

  <div class="picsum-summary">
    <el-button
      size="small"
      text
      type="info"
      @click="refreshBackground"
      title="REFRESH IMAGE"
    >
      <i class="mdi mdi-image text-white text-lg" />
    </el-button>
    <span>
      背景随机图片皆由
      <a href="https://picsum.photos/" target="_blank">picsum.photos</a>
      提供
    </span>
  </div>
</template>

<script lang="ts" setup>
import AuthorCard from "../components/author-card.vue";
import PostItem from "../components/post-item.vue";
import { useLocalStorage } from "@vueuse/core";
import { nanoid } from "nanoid";
import { pagesData } from "../composables/posts";
import { PostData } from "../../shared/models/groups";
import { dateFormatter } from "../utils/formatters";
import SectionLabel from "../components/section-label.vue";

const seed = useLocalStorage("picsum.photo.key", "yuwYfO39zMVP");
function refreshBackground() {
  seed.value = nanoid(12);
}

const pages = Object.values(pagesData);
const dateGroups = Object.entries(
  pages.reduce((groups, page) => {
    const date = dateFormatter(page.git.updatedTime ?? page.git.createdTime);
    (groups[date] ??= []).push(page);
    return groups;
  }, {} as Record<string, PostData[]>)
);

const specialThanks = [
  "picsum.photos",
  "vue.js 3.0",
  "element-plus",
  "vueuse",
  "vuepress",
  "💎Krystal💎",
  "🍉阿尼亚·福杰🍉",
];
</script>

<style lang="postcss" scoped>
.layout-main {
  background-image: radial-gradient(#0000, #0000, #0004);
  @apply relative z-10;
  /* @apply snap-y; */
  @apply overflow-auto h-full;
  @apply flex flex-col items-center;

  & > div {
    /* @apply snap-center; */
    @apply relative z-10;
  }

  & > .first-item,
  & > .final-item {
    @apply w-full min-h-screen flex justify-center items-center;
  }

  & > .tab-menu-group {
    @apply w-full flex justify-center items-center;
    @apply sticky top-2 p-2 z-[20];
  }

  & > .middle-item {
    @apply w-full py-64;
    @apply flex flex-col gap-32 justify-center items-center;
    @apply bg-white;

    box-shadow: theme("colors.slate.800") 0 0 100vh;
  }

  & .post-group {
    @apply flex flex-col items-center py-8 gap-16;
  }

  & .chrock-background {
    @apply !fixed inset-0 z-0;
    @apply pointer-events-none;
    @apply overflow-hidden;
  }
}

.picsum-summary {
  @apply absolute left-2 bottom-2;
  @apply flex flex-row items-center gap-2;
  @apply px-4;
  @apply text-white bg-slate-900 bg-opacity-50;
}
</style>
