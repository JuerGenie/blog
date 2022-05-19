<template>
  <el-container class="main-container">
    <site-logo />

    <main ref="layoutMainRef" class="layout-main">
      <div class="first-panel">
        <author-card />
        <i class="mdi mdi-chevron-down down-btn" @click="scrollToPosts" />
      </div>
      <div ref="postsPanelRef" class="posts-panel">
        <post-item v-for="post in posts" :key="post.key" :post="post" />
      </div>
    </main>
  </el-container>
  <scale-wrapper class="chrock-background" :target="layoutMainRef">
    <chrock-background />
  </scale-wrapper>
</template>

<script lang="ts" setup>
import { useSiteData } from "@vuepress/client";
import AuthorCard from "../components/author-card.vue";
import ChrockBackground from "../components/chrock-background.vue";
import PostItem from "../components/post-item.vue";
import { usePosts } from "../compositablies/posts";
import { ref } from "vue";
import SiteLogo from "../components/site-logo.vue";
import ScaleWrapper from "../components/scale-wrapper.vue";

const siteData = useSiteData();

const { posts } = usePosts();

const layoutMainRef = ref<HTMLElement>();

const postsPanelRef = ref<HTMLDivElement>();
function scrollToPosts() {
  layoutMainRef.value?.scrollTo({
    behavior: "smooth",
    top: postsPanelRef.value?.offsetTop,
  });
}
</script>

<style lang="postcss" scoped>
.main-container {
  @apply h-full;
  @apply relative z-10;

  & .layout-main {
    @apply overflow-auto;
    background-image: radial-gradient(#0000, #0000, #0004);

    & .first-panel {
      @apply w-screen h-screen;
      @apply flex flex-col justify-center items-center;
      @apply relative;

      & .down-btn {
        @apply absolute bottom-0;
        @apply text-4xl text-slate-800 text-opacity-50;
        @apply animate-bounce;
        @apply cursor-pointer;
      }
    }

    & .posts-panel {
      @apply bg-white;
      box-shadow: 0 -0.5rem 8rem 0 #0004;

      @apply flex flex-col items-center py-24 gap-16;
    }
  }
}

.chrock-background {
  @apply !absolute inset-0 z-0;
  @apply opacity-50;
  @apply pointer-events-none;
  @apply overflow-hidden;
}
</style>
