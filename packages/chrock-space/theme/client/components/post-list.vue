<template>
  <div class="post-list">
    <search-bar
      v-model:search="searchString"
      v-model:group="group"
      v-model:tags="tags"
    />

    <xyz-transition-group tag="div" class="transition-group">
      <children-list-post-item
        v-for="page in slicedPages"
        :key="page.name"
        :post="{ route: page }"
        class="border-4!"
        xyz="fade right"
      />
    </xyz-transition-group>

    <div class="bottom" ref="intersectionTagRef">
      {{ bottomString }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import { RouteRecordNormalized, useRouter } from "vue-router";
import { GroupFrontmatter } from "../../shared/models/groups";
import { pages } from "../utils/router";
import ChildrenListPostItem from "./children-list-post-item.vue";
import SearchBar from "./search-bar.vue";
import { useIntersectionObserver } from "@vueuse/core";
import { XyzTransitionGroup } from "@animxyz/vue3";

const router = useRouter();
const group = computed({
  get: () => String(router.currentRoute.value.query.group ?? ""),
  set: (val) =>
    router.push({
      path: "/",
      query: {
        ...router.currentRoute.value.query,
        group: val,
      },
    }),
});
const searchString = computed({
  get: () => String(router.currentRoute.value.query.search ?? ""),
  set: (val) =>
    router.push({
      path: "/",
      query: {
        ...router.currentRoute.value.query,
        search: val,
      },
    }),
});
const tags = computed({
  get: () => {
    const { tag } = router.currentRoute.value.query;
    return (Array.isArray(tag) ? tag : !!tag ? [tag] : []) as string[];
  },
  set: (val) =>
    router.push({
      path: "/",
      query: {
        tag: val,
      },
    }),
});

function getTags(page: RouteRecordNormalized) {
  return ((page.meta.frontmatter as GroupFrontmatter).tags ?? []) as string[];
}

const loadingIndex = ref(20);
const filteredPages = computed(() =>
  pages.value.filter(
    (page) =>
      (!group.value || page.meta.parentGroup === group.value) &&
      (!searchString.value ||
        (page.meta.frontmatter as GroupFrontmatter).title
          ?.toLowerCase()
          .includes(searchString.value.toLowerCase())) &&
      (!tags.value ||
        !tags.value.length ||
        (getTags(page).length &&
          !tags.value
            .map((tag) => tag.toLowerCase())
            .find(
              (tag) =>
                !getTags(page)
                  .map((tag) => tag.toLowerCase())
                  .includes(tag)
            )))
  )
);
const slicedPages = computed(() =>
  filteredPages.value.slice(0, loadingIndex.value)
);
watch(filteredPages, () => {
  loadingIndex.value = 20;
});

const intersectionTagRef = ref<HTMLDivElement>();
useIntersectionObserver(intersectionTagRef, ([entry]) => {
  console.log(entry);
  loadingIndex.value += 20;
});

const bottomString = computed(() =>
  loadingIndex.value >= filteredPages.value.length
    ? "没有更多内容了"
    : "新的内容正在赶来"
);
</script>

<style lang="postcss" scoped>
.post-list {
  @apply flex flex-col gap-8;

  & .transition-group {
    @apply flex flex-col gap-8;
    /* 
    & > * {
      @apply transition-all transition-ease duration-500;
    } */
  }

  & .bottom {
    @apply w-full p-4;
    @apply text-(slate-400 sm center);
  }
}
</style>
