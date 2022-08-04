<template>
  <router-link class="children-list-post-item" :to="post.route">
    <img v-if="frontmatter.cover" class="background" :src="frontmatter.cover" />
    <div v-else class="background" />

    <div class="right">
      <div class="item-title">
        {{ frontmatter.title }}

        <div v-if="frontmatter.subtitle" class="item-subtitle">
          {{ frontmatter.subtitle }}
        </div>
      </div>
      <div class="item-info">
        <div class="author">
          <i class="mdi mdi-account-circle" />
          {{ authorData.name }}
        </div>
        <div class="date">
          <i class="mdi mdi-calendar" />
          {{ dateFormatter(pageData?.git.updatedTime) }}
        </div>
      </div>
    </div>
  </router-link>
</template>

<script lang="ts" setup>
import { PageData, usePagesData } from "@vuepress/client";
import { computed, onBeforeMount, ref } from "vue";
import { GroupFrontmatter } from "../../shared/models/groups.js";
import { GroupTree } from "../utils/router.js";
import { dateFormatter } from "../utils/formatters/date.js";
import { useAuthorData } from "../composables/author-data.js";
import { GitPluginPageData } from "@vuepress/plugin-git";
import Splitter from "./splitter.vue";

const props = defineProps<{
  post: GroupTree;
}>();

const authorData = useAuthorData();
const pageData = ref<PageData<GitPluginPageData>>();

onBeforeMount(async () => {
  const pagesData = usePagesData();
  const res = await pagesData.value[props.post.route.name as string]!();
  pageData.value = res as PageData<GitPluginPageData>;
});

const frontmatter = computed(
  () => (props.post.route.meta.frontmatter as GroupFrontmatter) ?? {}
);
const cover = computed(() => `url(${frontmatter.value.cover})`);
</script>

<style lang="postcss" scoped>
.children-list-post-item {
  @apply h-40 border border-slate-200 rounded-lg overflow-hidden;
  @apply flex flex-row relative;
  @apply cursor-pointer hover:drop-shadow-xl;

  & > .background {
    @apply w-64 h-full;
    @apply object-cover;
    @apply bg-slate-200;
  }

  & > .right {
    @apply bg-white flex-1 flex flex-col;
    @apply py-2;

    & > * {
      @apply pl-4;
    }

    & > .item-title {
      @apply text-2xl flex-1;

      & > .item-subtitle {
        @apply text-base text-slate-500;
      }
    }
    & > .item-info {
      @apply flex flex-row gap-4;
      @apply text-slate-500 text-sm;

      & > :is(.author, .date) {
        @apply flex items-center gap-1;

        & > .mdi {
          @apply text-lg;
        }
      }
    }
  }
}
</style>
