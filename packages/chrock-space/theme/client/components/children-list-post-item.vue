<template>
  <router-link class="children-list-post-item" :to="post.route">
    <div class="background" />

    <div class="right">
      <div v-if="!frontmatter.hideGroup" class="item-groups">
        <template v-for="group in groupPath" :key="group.route.name">
          <router-link class="item-group" :to="group.route.path">
            {{ (group.route.meta.frontmatter as GroupFrontmatter).title }}
          </router-link>
        </template>
      </div>
      <div class="item-title">
        {{ title }}

        <div v-if="frontmatter.subtitle" class="item-subtitle">
          {{ frontmatter.subtitle }}
        </div>
      </div>
      <div v-if="!!frontmatter.description" class="item-description">
        {{ frontmatter.description }}
      </div>
      <div v-if="!hideTags" class="item-tags">
        <router-link
          v-for="tag in frontmatter.tags ?? []"
          :key="tag"
          class="tag"
          :to="{ path: '/', query: { tag } }"
        >
          {{ tag }}
        </router-link>
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
import { GroupTree, groups } from "../utils/router.js";
import { dateFormatter } from "../utils/formatters/date.js";
import { useAuthorData } from "../composables/author-data.js";
import { GitPluginPageData } from "@vuepress/plugin-git";

const props = defineProps<{
  post: GroupTree;
  hideTags?: boolean;
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
const title = computed(() => frontmatter.value.title ?? pageData.value?.title);
const cover = computed(() => `url(${frontmatter.value.cover})`);

const groupPath = computed(() => {
  const result: GroupTree[] = [];

  let current = props.post;
  while (!!current.route.meta.parentGroup) {
    current = groups.value[String(current.route.meta.parentGroup)];
    if (!current) {
      break;
    } else {
      result.push(current);
    }
  }

  return result.reverse();
});
</script>

<style lang="postcss" scoped>
.children-list-post-item {
  @apply border border-slate-200 rounded-lg overflow-hidden;
  @apply flex flex-row relative;
  @apply cursor-pointer hover:drop-shadow-xl;

  & > .background {
    @apply w-64 h-full;
    @apply object-cover;
    @apply bg-slate-200 border-(r-4 slate-200);

    background-image: v-bind("cover");
    @apply bg-cover;
  }

  & > .right {
    @apply bg-white flex-1 flex flex-col;
    @apply py-2;

    & > * {
      @apply pl-4;
    }

    & > .item-groups {
      @apply text-xs flex flex-row;
      @apply mt-1 mb-2;

      & > .item-group {
        @apply text-slate-500 hover:text-primary-500;

        &:not(:first-of-type)::before {
          content: ">";
          @apply pointer-events-none;
          @apply inline-block mx-2;
          @apply text-slate-300!;
        }
      }
    }

    & > .item-title {
      @apply text-2xl flex-1 mb-4;

      & > .item-subtitle {
        @apply text-(base slate-500);
      }
    }
    & > .item-info {
      @apply flex flex-row gap-4;
      @apply text-(slate-500 sm);

      & > :is(.author, .date) {
        @apply flex items-center gap-1;

        & > .mdi {
          @apply text-lg;
        }
      }
    }

    & > .item-tags {
      @apply flex flex-(row wrap) gap-2;

      & > .tag {
        @apply px-2 py-0.5 rounded-full text-xs;
        @apply bg-secondary-400 hover:bg-secondary-500 text-white cursor-pointer;

        &.active {
          @apply bg-primary-500;
        }
      }
    }
  }
}
</style>
