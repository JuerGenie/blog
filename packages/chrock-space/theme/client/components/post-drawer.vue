<template>
  <el-drawer
    append-to-body
    modal-class="post-wrapper-modal"
    custom-class="post-drawer"
    direction="rtl"
    :model-value="currentRoute.path !== '/'"
    :size="width"
    :modal="false"
    :with-header="false"
  >
    <div class="post-content-wrapper">
      <el-page-header
        class="page-header"
        title="返回"
        :content="currentPage.title"
        @back="onBack"
      />

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
        <div class="create-date">发布于{{ createdDate }}</div>
        <div v-if="!!tags" class="tags">
          <router-link v-for="tag in tags" :to="{ path: '/', query: { tag } }">
            <el-tag round>
              {{ tag }}
            </el-tag>
          </router-link>
        </div>
      </div>

      <main>
        <div class="content">
          <content></content>
        </div>

        <div class="post-right">
          <!-- <toc :headers="currentPage.headers" /> -->
        </div>
      </main>
    </div>
  </el-drawer>
</template>

<script lang="ts" setup>
import { useRoute, useRouter, RouterLink } from "vue-router";
import { usePageData } from "@vuepress/client";
import { GitPluginPageData } from "@vuepress/plugin-git";
import dayjs from "dayjs";
import { computed, watchEffect } from "vue";
import { Toc } from "@vuepress/plugin-toc/lib/client";

const props = defineProps<{
  width: number;
}>();

const currentRoute = useRoute();
const currentPage = usePageData<ChrockPostData & GitPluginPageData>();
const createdDate = computed(() =>
  dayjs(currentPage.value.git.createdTime).format("YYYY年MM月DD日 HH时mm分")
);

watchEffect(() => console.log("page", currentPage.value));

const background = computed(() => currentPage.value.frontmatter.background);
const group = computed(() => currentPage.value.frontmatter.group);
const tags = computed(() => currentPage.value.frontmatter.tags);

const router = useRouter();
function onBack() {
  console.log("on back", router.options.history.state);
  if (!router.options.history.state.position) {
    router.push("/");
  } else {
    router.back();
  }
}
</script>

<style lang="postcss">
.post-wrapper-modal {
  @apply pointer-events-none;
}

.post-drawer {
  @apply pointer-events-auto;
  @apply bg-white bg-opacity-75 backdrop-blur !important;

  & .el-drawer__body {
    @apply p-0;
  }

  & .post-content-wrapper {
    & .page-header {
      @apply fixed top-0 w-full z-[9999];
      @apply px-4 py-4 bg-white bg-opacity-80 backdrop-blur-sm;
    }

    & .information {
      @apply w-full h-80 px-16 py-8;
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

      & .title {
        @apply text-4xl;
      }
      & .create-date {
        @apply text-slate-600 text-sm;
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
}
</style>
