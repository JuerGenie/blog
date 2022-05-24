<template>
  <div class="post-content">
    <div class="information">
      <el-image v-if="!!background" :src="background" fit="cover">
        <template #error>
          <div class="failed-slot" />
        </template>
      </el-image>

      <div :class="{ 'wrapper': true, 'no-background': !background }">
        <div class="group">
          <group-link v-if="!!group" :group="group">
            <el-button round color="#0004">{{ group }}</el-button>
          </group-link>
        </div>
        <div class="title">
          <div>{{ currentPage.title }}</div>
          <div v-if="subtitle" class="subtitle">{{ subtitle }}</div>
        </div>
        <div class="flex flex-row gap-8">
          <div class="author">
            <i class="mdi mdi-account-box text-lg" />
            {{ currentPage.git?.contributors?.[0]?.name ?? "--" }}
          </div>
          <div class="create-date">
            <i class="mdi mdi-calendar text-lg" />
            {{ createdDate }}
          </div>
          <div v-if="!!tags" class="tags">
            <i class="mdi mdi-tag-multiple text-lg" />
            <tag-link v-for="tag in tags" :tag="tag">
              <el-button round color="#0004" size="small">
                {{ tag }}
              </el-button>
            </tag-link>
          </div>
        </div>
      </div>
    </div>

    <main>
      <div class="content wrapper">
        <content></content>

        <div class="post-right">
          <toc :headers="currentPage.headers" />
        </div>
      </div>

      <div
        v-if="!currentPage.frontmatter.hideLicenses"
        class="wrapper licenses-summary"
      >
        <p>
          本文为 {{ authorData.name }} 原创，依据「{{
            licenses
          }}」许可进行授权，商业转载请联系
          {{ authorData.name }} 获得授权，非商业转载请注明出处。
          转载请附上出处链接及本声明。
        </p>
      </div>

      <div class="wrapper pb-16">
        <el-divider />
        <giscus
          repo="juergenie/juergenie.github.io"
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
  </div>
</template>

<script lang="ts" setup>
import { usePageData } from "@vuepress/client";
import { GitPluginPageData } from "@vuepress/plugin-git";
import { useEventListener } from "@vueuse/core";
import dayjs from "dayjs";
import { computed, onMounted, watchEffect } from "vue";
import { Toc } from "@vuepress/plugin-toc/lib/client";
import GroupLink from "./linker/group-link.vue";
import TagLink from "./linker/tag-link.vue";
import { useAuthorData } from "../composables/author-data";
import Giscus from "@giscus/vue";

const currentPage = usePageData<ChrockPostData & GitPluginPageData>();
onMounted(() => console.log("current page", currentPage.value));

const createdDate = computed(() =>
  dayjs(currentPage.value.git?.createdTime ?? "").format("YYYY/MM/DD")
);

const subtitle = computed(() => currentPage.value.frontmatter.subtitle);
const background = computed(() => currentPage.value.frontmatter.background);
const group = computed(() => currentPage.value.frontmatter.group);
const tags = computed(() => currentPage.value.frontmatter.tags);
const licenses = computed(
  () => currentPage.value.frontmatter.license ?? "CC BY-NC-SA 4.0"
);

const authorData = useAuthorData();
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
</script>

<style lang="postcss" scoped>
.post-content {
  & .page-header {
    @apply fixed top-0 w-full z-[9999];
    @apply px-4 py-4 bg-white bg-opacity-80 backdrop-blur-sm;
  }

  & .information {
    @apply w-full h-96 px-32 py-8;
    @apply relative;
    @apply flex flex-col justify-end;

    & .wrapper {
      @apply relative z-10;
      @apply flex flex-col justify-end gap-8;
      @apply text-slate-200;

      &.no-background {
        @apply text-slate-800;

        & .create-date {
          @apply text-slate-600;
        }
      }

      & .group {
        /* @apply text-xl; */
      }

      & .title {
        @apply text-6xl font-light;

        & .subtitle {
          @apply text-2xl opacity-80 font-extralight;
        }
      }
      & .author {
        @apply text-sm;
        @apply flex flex-row items-center gap-2;
      }
      & .create-date {
        @apply text-slate-300 text-sm;
        @apply flex flex-row items-center gap-2;
      }
      & .tags {
        @apply flex flex-row flex-wrap gap-2 items-center;

        & .el-tag {
          @apply border-none !important;
          @apply cursor-pointer;
        }
      }
    }

    & .el-image {
      @apply absolute inset-0 z-0;

      &::after {
        content: "";
        @apply absolute inset-0;
        @apply bg-gradient-to-t from-[#0009] via-[#0000] to-[#0000];
      }

      & .failed-slot {
        @apply w-full h-full;

        background-image: linear-gradient(
          60deg,
          theme("colors.slate.100"),
          theme("colors.slate.100") 50%,
          theme("colors.slate.200") 0
        );
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

      & .post-right {
        @apply absolute left-full;
        @apply pl-8 pt-16;
        @apply w-64 h-full;

        & :deep(.vuepress-toc) {
          @apply sticky top-24;
          @apply border-l-4;
          @apply py-4;

          & .vuepress-toc-list {
            @apply pl-4;
            @apply list-none;

            & .vuepress-toc-item {
              @apply relative m-0;

              & .router-link-active {
                &.active {
                  @apply text-sky-600;

                  &::before {
                    @apply bg-sky-300;
                  }
                }

                &::before {
                  content: "";
                  @apply absolute -left-4;
                  @apply w-1 h-full bg-slate-100;
                }
              }
            }
          }
        }
      }
    }

    & .licenses-summary {
      @apply py-2 px-4 rounded-lg;
      @apply text-sm text-slate-800 text-opacity-80;
      @apply bg-slate-100;
    }
  }

  & .information,
  main {
    @apply items-center;
  }

  & .wrapper {
    @apply w-full max-w-xl lg:max-w-3xl;
  }
}
</style>
