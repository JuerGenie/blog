<template>
  <main class="layout-main" ref="layoutMainRef">
    <div class="first-panel">
      <author-card />
      <div class="down-bar">
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
            所有随机图片皆由
            <a href="https://picsum.photos/" target="_blank">picsum.photos</a>
            提供
          </span>
        </div>
        <i class="mdi mdi-chevron-down down-btn" @click="scrollToPosts" />
      </div>
    </div>
    <div ref="postsPanelRef" class="posts-panel">
      <div v-for="[date, sections] in dateGroups" class="post-group">
        <section-label>
          <a
            :id="`group_${date.replaceAll('/', '_')}`"
            class="header-anchor vuepress-toc-link"
            :href="`#group_${date.replaceAll('/', '_')}`"
          >
            <i class="mdi mdi-calendar-month text-4xl" />
          </a>
          {{ date }}
        </section-label>

        <post-item v-for="post in sections" :key="post.key" :post="post" />
      </div>
    </div>
  </main>

  <el-image
    class="chrock-background"
    :src="`https://picsum.photos/seed/${seed}/1920/1080`"
    fit="cover"
  />
</template>

<script lang="ts" setup>
import AuthorCard from "../components/author-card.vue";
import PostItem from "../components/post-item.vue";
import { computed, ref } from "vue";
import { useLocalStorage } from "@vueuse/core";
import { nanoid } from "nanoid";
import { Post, postList } from "../composables/posts";
import { dateFormatter } from "../utils/formatters";
import SectionLabel from "../components/section-label.vue";

const layoutMainRef = ref<HTMLDivElement>();

const postsPanelRef = ref<HTMLDivElement>();
function scrollToPosts() {
  window.scrollTo({
    behavior: "smooth",
    top: postsPanelRef.value?.offsetTop,
  });
}

const seed = useLocalStorage("picsum.photo.key", "yuwYfO39zMVP");
function refreshBackground() {
  seed.value = nanoid(12);
}

const dateGroups = computed(() => {
  const result: Record<string, Post[]> = {};
  postList.value.forEach((post) => {
    const date = dateFormatter(post.git.updatedTime ?? post.git.createdTime);
    (result[date] ??= []).push(post);
  });
  return Object.entries(result).sort((a, b) => b[0].localeCompare(a[0]));
});
</script>

<style lang="postcss" scoped>
.layout-main {
  background-image: radial-gradient(#0000, #0000, #0004);
  @apply relative z-10;
  @apply snap-y;
  @apply overflow-auto h-full;

  & > div {
    @apply snap-start;
  }

  & .first-panel {
    @apply w-screen h-screen;
    @apply flex flex-col justify-center items-center;
    @apply relative;

    & .down-bar {
      @apply absolute bottom-0 inset-x-0;
      @apply flex flex-row items-center justify-center;

      & .picsum-summary {
        @apply absolute left-0 inset-y-0;
        @apply flex flex-row items-center gap-2;
        @apply px-4;
        @apply text-white bg-slate-900 bg-opacity-50;
      }

      & .down-btn {
        @apply text-4xl text-slate-800 text-opacity-50;
        @apply animate-bounce;
        @apply cursor-pointer;
      }
    }
  }

  & .posts-panel {
    @apply bg-white;
    box-shadow: 0 -0.5rem 8rem 0 #0004;

    @apply flex flex-col items-center py-48 gap-16;

    & .post-group {
      @apply flex flex-col items-center py-8 gap-16;
    }
  }
}

.chrock-background {
  @apply !fixed inset-0 z-0;
  @apply pointer-events-none;
  @apply overflow-hidden;
}
</style>
