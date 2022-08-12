<template>
  <div ref="chrockRef" class="chrock">
    <main>
      <div v-if="!pageData.frontmatter.hideHeader" class="page-information">
        <div class="page-information-path"></div>
        <div class="page-information-title">{{ pageData.title }}</div>
        <div
          v-if="pageData.frontmatter.description"
          class="page-information-description"
        >
          {{ pageData.frontmatter.description }}
        </div>
        <div v-if="!pageData.frontmatter.group" class="page-information-bottom">
          <div class="page-information-author">
            <i class="mdi mdi-account-circle" />
            {{ authorData.name }}
          </div>
          <div class="page-information-date">
            <i class="mdi mdi-calendar" />
            {{ dateFormatter(pageData.git.updatedTime) }}
          </div>
        </div>
      </div>
      <div class="page">
        <div class="content-wrapper">
          <div class="content">
            <content />
          </div>

          <template v-if="pageData.frontmatter.group && groups[pageData.key]">
            <children-list :group="groups[pageData.key]" />
          </template>

          <div v-if="!pageData.frontmatter.hideGiscus" class="giscus-wrapper">
            <giscus
              v-if="!hideGiscus && ready"
              host="https://giscus.app"
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
              loading="eager"
            />
          </div>
        </div>
        <div class="right">
          <toc v-if="!hideToc" :headers="pageData.headers" />
        </div>
      </div>
    </main>
    <nav>
      <left-nav class="w-full h-full" />
    </nav>
  </div>
</template>

<script lang="ts" setup>
import { usePageData, Content, withBase } from "@vuepress/client";
import { GitPluginPageData } from "@vuepress/plugin-git";
import { computed, ref, watch } from "vue";
import { Toc } from "@vuepress/plugin-toc/lib/client";
import Giscus from "@giscus/vue";
import { useTimeoutFn } from "@vueuse/core";
import { useRouter } from "vue-router";
import LeftNav from "../components/left-nav.vue";
import { useAuthorData } from "../composables/author-data";
import { dateFormatter } from "../utils/formatters";
import { groups } from "../utils/router";
import childrenList from "../components/children-list.vue";

const pageData = usePageData<
  GitPluginPageData & ChrockPostData & ChrockGroupData
>();
const cover = computed(() => pageData.value.frontmatter.cover);
const coverSrc = computed(
  () =>
    `url(${cover.value?.startsWith("/") ? withBase(cover.value) : cover.value})`
);
const hideToc = computed(() => pageData.value.frontmatter.hideToc);
const hideGiscus = computed(() => pageData.value.frontmatter.hideGiscus);

const ready = ref(false);
const router = useRouter();
watch(
  router.currentRoute,
  (nv, ov) => {
    if (nv.path !== ov?.path) {
      ready.value = false;
      useTimeoutFn(() => {
        ready.value = true;
      }, 0);
    }
  },
  { immediate: true }
);

const authorData = useAuthorData();

const chrockRef = ref<HTMLDivElement>();
</script>

<style lang="postcss" scoped>
.chrock {
  --left-drawer-width: 20rem;
  --header-height: 4rem;

  @apply relative;

  & > header {
    @apply fixed left-[var(--left-drawer-width)] right-0 top-0 z-10;
    @apply h-[var(--header-height)];
    @apply bg-white bg-opacity-80 backdrop-blur;
    @apply shadow-lg;

    & .information {
      @apply w-[var(--max-width)] h-[var(--header-height)];
      @apply flex flex-row items-center justify-between;

      & > .information-title {
        @apply text-2xl;
      }
    }
  }

  & > main {
    @apply min-h-screen;
    @apply ml-[var(--left-drawer-width)];

    @apply flex flex-col;

    & > .page-information {
      @apply w-full h-[var(--left-drawer-width)] relative;
      @apply p-[var(--header-height)];
      @apply flex flex-col gap-4 justify-end;
      @apply bg-gradient-to-t from-slate-300 to-slate-100;

      @apply bg-cover bg-center;
      background-image: linear-gradient(var(--un-gradient)), v-bind("coverSrc");

      &::before {
        content: "";
        @apply absolute inset-0;
        @apply bg-white bg-opacity-50;
      }

      & > * {
        @apply relative z-10;
      }

      & > .page-information-title {
        @apply text-4xl;
      }

      & > .page-information-bottom {
        @apply flex flex-row gap-8;

        & > * {
          @apply align-middle;
        }
      }
    }

    & > .page {
      @apply flex-1;
      @apply flex flex-row;

      & > .content-wrapper {
        @apply flex-1 p-16;
        @apply flex flex-col gap-16;

        & > .content:not(:has(*)) {
          @apply hidden;
        }
      }
      & > .right {
        @apply w-80;

        &:not(:has(nav > *)) {
          @apply hidden;
        }
      }
    }
  }

  & > nav {
    @apply fixed inset-y-0 left-0 w-[var(--left-drawer-width)] z-20;
    @apply border-r border-slate-200;
  }

  & > footer {
    @apply min-h-screen pt-16;
  }
}
</style>
