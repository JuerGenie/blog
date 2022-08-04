<template>
  <main-page class="post-content" :cover="cover">
    <template #header>
      <div
        :class="{
          'h-[32rem]': true,
          'information': true,
          'no-background': !cover,
        }"
      >
        <div class="group">
          <group-link v-if="!!group" :post="currentPage">
            <el-button round color="#0004">{{ group }}</el-button>
          </group-link>
        </div>
        <div class="title">
          <div>{{ currentPage.title }}</div>
          <div v-if="subtitle" class="subtitle">{{ subtitle }}</div>
        </div>
        <div class="flex flex-col gap-2">
          <div class="flex flex-row flex-wrap gap-8">
            <post-author :post="currentPage" />
            <post-update-time :post="currentPage" />
          </div>
          <post-tags class="flex-wrap" :post="currentPage" />
        </div>
      </div>
    </template>

    <main>
      <div class="content">
        <content></content>
      </div>

      <div class="post-right">
        <toc :headers="currentPage.headers" />
      </div>

      <div
        v-if="!currentPage.frontmatter.hideLicenses"
        class="wrapper licenses-summary"
      >
        <p>
          本文为 {{ authorData.name }} 原创，依据
          <b>{{ licenses }}</b>
          许可进行授权。
        </p>
        <p>
          商业转载请联系
          {{ authorData.name }}
          获得授权，非商业转载请注明出处。转载请附上出处链接及本声明。
        </p>
      </div>

      <div class="wrapper pb-16">
        <el-divider />
        <giscus
          v-if="!currentPage.frontmatter.hideGiscus && ready"
          repo="juergenie/blog"
          repo-id="R_kgDOG0CKgw"
          category="Announcements"
          category-id="DIC_kwDOG0CKg84CPQtU"
          mapping="pathname"
          reactions-enabled="1"
          emit-metadata="0"
          input-position="top"
          theme="light"
          lang="zh-CN"
          loading="lazy"
        />
      </div>
    </main>
  </main-page>
</template>

<script lang="ts" setup>
import { useEventListener, useTimeoutFn } from "@vueuse/core";
import dayjs from "dayjs";
import { computed, onMounted, ref } from "vue";
import { Toc } from "@vuepress/plugin-toc/lib/client";
import GroupLink from "./linker/group-link.vue";
import { useAuthorData } from "../composables/author-data";
import Giscus from "@giscus/vue";
import MainPage from "./main-page.vue";
import PostAuthor from "./post/post-author.vue";
import PostUpdateTime from "./post/post-update-time.vue";
import PostTags from "./post/post-tags.vue";
import { posts } from "../composables/posts";
import { useRouter } from "vue-router";

const ready = ref(false);
onMounted(() => {
  // 先处理一下，为了解决giscus获取到的pathname错误的问题。
  useTimeoutFn(() => (ready.value = true), 100);
});

const router = useRouter();
const currentPage = computed(
  () => posts.value[router.currentRoute.value.name as string]
);

const createdDate = computed(() =>
  dayjs(currentPage.value.git?.createdTime ?? "").format("YYYY/MM/DD")
);

const subtitle = computed(() => currentPage.value.frontmatter.subtitle);
const cover = computed(() => currentPage.value.frontmatter.cover);
const group = computed(() => currentPage.value.frontmatter.group);
const tags = computed(() => currentPage.value.frontmatter.tags);
const licenses = computed(
  () => currentPage.value.frontmatter.license ?? "CC BY-NC-SA 4.0"
);

const authorData = useAuthorData();
if (!__VUEPRESS_SSR__) {
  useEventListener(document, "copy", (evt) => {
    if (evt.clipboardData && window.getSelection()) {
      const data = window.getSelection()?.toString();
      if (data) {
        evt.preventDefault();
        const targetText = [
          data,
          "",
          "================",
          `本文为 ${authorData.value.name} 原创，依据「${licenses.value}」许可进行授权，商业转载请联系 ${authorData.value.name} 获得授权，非商业转载请注明出处。`,
          `转载请附上出处链接(${window.location.href})及本声明。`,
        ].join("\n");

        evt.clipboardData?.setData("text/plain", targetText);
      }
    }
  });
}
</script>

<style lang="postcss" scoped>
.post-content {
  & .information {
    @apply relative z-10 w-full pb-8;
    @apply flex flex-col justify-end gap-8;
    @apply text-slate-200;

    &.no-background {
      @apply text-slate-800;
    }

    & .title {
      @apply text-6xl font-light;

      & .subtitle {
        @apply text-2xl opacity-80 font-extralight;
      }
    }
  }

  & main {
    @apply w-full;
    @apply relative;
    @apply flex flex-col;

    & .content {
      @apply flex-1;
      @apply relative;
    }

    & .post-right {
      @apply absolute left-full;
      @apply pl-8 pt-16;
      @apply w-64 h-full;
    }

    & .licenses-summary {
      @apply py-2 px-4 rounded-lg;
      @apply text-sm text-slate-800 text-opacity-80;
      @apply bg-slate-100;

      & > p {
        @apply flex items-center;

        & > b {
          @apply mx-1;
        }
      }
    }
  }
}
</style>
