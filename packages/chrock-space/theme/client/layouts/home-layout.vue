<template>
  <main-container ref="layoutMainRef">
    <main class="layout-main">
      <div class="first-panel">
        <author-card />
        <div class="down-bar">
          <div class="picsum-summary">
            <el-tooltip content="REFRESH IMAGE" placement="top">
              <el-button
                size="small"
                text
                type="info"
                @click="refreshBackground"
              >
                <i class="mdi mdi-image text-slate-600 text-lg" />
              </el-button>
            </el-tooltip>
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
        <div v-for="[date, sections] in groupPosts" class="post-group">
          <div class="post-group-label">
            <a
              :id="date"
              class="header-anchor vuepress-toc-link"
              :href="`#${date}`"
            >
              <i class="mdi mdi-calendar-month text-4xl" />
            </a>
            {{ date }}
          </div>

          <post-item v-for="post in sections" :key="post.key" :post="post" />
        </div>
      </div>
    </main>
  </main-container>
  <client-only>
    <scale-wrapper class="chrock-background">
      <!-- <chrock-background /> -->
      <el-image
        :src="`https://picsum.photos/seed/${seed}/1920/1080`"
        fit="cover"
      />
    </scale-wrapper>
  </client-only>
</template>

<script lang="ts" setup>
import AuthorCard from "../components/author-card.vue";
import PostItem from "../components/post-item.vue";
import { usePosts } from "../composables/posts";
import { computed, ref } from "vue";
import ScaleWrapper from "../components/scale-wrapper.vue";
import dayjs from "dayjs";
import MainContainer from "../components/main-container.vue";
import { useLocalStorage } from "@vueuse/core";
import { nanoid } from "nanoid";
import { ClientOnly } from "@vuepress/client";

const { dateMap } = usePosts();

const layoutMainRef = ref<InstanceType<typeof MainContainer>>();

const postsPanelRef = ref<HTMLDivElement>();
function scrollToPosts() {
  window.scrollTo({
    behavior: "smooth",
    top: postsPanelRef.value?.offsetTop,
  });
}

const groupPosts = computed(() => {
  return Object.entries(dateMap.value).sort(([a], [b]) =>
    dayjs(a).isAfter(b) ? -1 : 1
  );
});

const seed = useLocalStorage("picsum.photo.key", "yuwYfO39zMVP");
function refreshBackground() {
  seed.value = nanoid(12);
}
</script>

<style lang="postcss" scoped>
.layout-main {
  background-image: radial-gradient(#0000, #0000, #0004);

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
        @apply text-transparent bg-slate-900 bg-opacity-50;
        background-clip: text;
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

    & .post-group-label {
      @apply text-2xl text-slate-500 font-light tracking-widest;
      @apply flex flex-row items-center justify-center gap-2;
      @apply select-none;

      &::before,
      &::after {
        content: "";

        @apply w-32;
        @apply border rounded;
      }
    }

    & .post-group {
      @apply flex flex-col items-center py-8 gap-16;
    }
  }
}

.chrock-background {
  @apply !fixed inset-0 z-0;
  @apply pointer-events-none;
  @apply overflow-hidden;

  & .el-image {
    @apply w-full h-full;
    @apply relative;

    /* &::after {
      content: "";

      @apply absolute inset-0;
      mask-image: radial-gradient(#ffff, #fff4, #fff0);
      @apply bg-white bg-opacity-50;
      @apply backdrop-blur-lg;
    } */
  }
}
</style>
