<template>
  <div class="post-content">
    <div class="information">
      <el-image v-if="!!background" :src="background" fit="cover" />

      <router-link
        v-if="!!group"
        class="group"
        :to="{ path: '/', query: { group } }"
      >
        {{ group }}
      </router-link>
      <div class="title">{{ currentPage.title }}</div>
      <div class="create-date">
        <i class="mdi mdi-calendar-month text-lg" />
        {{ createdDate }}
      </div>
      <div v-if="!!tags" class="tags">
        <router-link v-for="tag in tags" :to="{ path: '/', query: { tag } }">
          <el-button round color="#0004" size="small">
            {{ tag }}
          </el-button>
        </router-link>
      </div>
    </div>

    <main>
      <div class="content">
        <content></content>
      </div>

      <div class="post-right">
        <toc :headers="currentPage.headers" />
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { useRoute, useRouter, RouterLink } from "vue-router";
import { usePageData } from "@vuepress/client";
import { GitPluginPageData } from "@vuepress/plugin-git";
import dayjs from "dayjs";
import { computed } from "vue";
import { Toc } from "@vuepress/plugin-toc/lib/client";

const currentPage = usePageData<ChrockPostData & GitPluginPageData>();
const createdDate = computed(() =>
  dayjs(currentPage.value.git?.createdTime ?? "").format("YYYY/MM/DD")
);

const background = computed(() => currentPage.value.frontmatter.background);
const group = computed(() => currentPage.value.frontmatter.group);
const tags = computed(() => currentPage.value.frontmatter.tags);

const router = useRouter();
function onBack() {
  if (!router.options.history.state.position) {
    router.push("/");
  } else {
    router.back();
  }
}
</script>

<style lang="postcss" scoped>
.post-content {
  & .page-header {
    @apply fixed top-0 w-full z-[9999];
    @apply px-4 py-4 bg-white bg-opacity-80 backdrop-blur-sm;
  }

  & .information {
    @apply w-full h-64 px-32 py-8;
    @apply flex flex-col justify-end gap-2;
    @apply relative;

    & > div {
      @apply relative z-10;
    }

    & .el-image {
      @apply absolute inset-0 z-0;

      &::after {
        content: "";
        @apply absolute inset-0;
        @apply bg-gradient-to-t from-white to-[#fff4];
      }
    }

    & .group {
      @apply text-xl font-extralight;
    }

    & .title {
      @apply text-4xl font-extralight;
    }
    & .create-date {
      @apply text-slate-600 text-sm;
      @apply flex flex-row items-center gap-2;
    }
    & .tags {
      @apply flex flex-row gap-2;

      & .el-tag {
        @apply bg-slate-500 text-white border-none !important;
        @apply cursor-pointer;
      }
    }
  }

  & main {
    @apply flex flex-row;

    & .content {
      @apply flex-1;
    }
    & .post-right {
      @apply px-4 pt-16;
      @apply w-72;
    }
  }
}
</style>
