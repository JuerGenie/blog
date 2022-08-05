<template>
  <div class="post-list">
    <search-bar
      v-model:search="searchString"
      v-model:group="group"
      v-model:tags="tags"
    />

    <children-list-post-item
      v-for="page in filteredPages"
      :key="page.name"
      :post="{ route: page }"
      class="border-4!"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import { RouteRecordNormalized, useRouter } from "vue-router";
import { GroupFrontmatter } from "../../shared/models/groups";
import { pages } from "../utils/router";
import ChildrenListPostItem from "./children-list-post-item.vue";
import SearchBar from "./search-bar.vue";

const group = ref("");
const searchString = ref("");
const tags = ref<string[]>([]);

const router = useRouter();
watch(router.currentRoute, (nv) => {
  tags.value = (
    !nv.query.tag
      ? []
      : Array.isArray(nv.query.tag)
      ? nv.query.tag
      : [nv.query.tag.toString()]
  ).map((tag) => String(tag));
});

function getTags(page: RouteRecordNormalized) {
  return ((page.meta.frontmatter as GroupFrontmatter).tags ?? []) as string[];
}

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
</script>

<style lang="postcss" scoped>
.post-list {
  @apply flex flex-col gap-8;
}
</style>
