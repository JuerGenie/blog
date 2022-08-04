<template>
  <div class="post-list">
    <search-bar v-model:search="searchString" v-model:group="group" />

    <children-list-post-item
      v-for="page in filteredPages"
      :key="page.name"
      :post="{ route: page }"
      class="border-4!"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { GroupFrontmatter } from "../../shared/models/groups";
import { pages } from "../utils/router";
import ChildrenListPostItem from "./children-list-post-item.vue";
import SearchBar from "./search-bar.vue";

const group = ref("");
const searchString = ref("");

const filteredPages = computed(() =>
  pages.value.filter(
    (page) =>
      (!group.value || page.meta.parentGroup === group.value) &&
      (!searchString.value ||
        (page.meta.frontmatter as GroupFrontmatter).title
          ?.toLowerCase()
          .includes(searchString.value.toLowerCase()))
  )
);
</script>

<style lang="postcss" scoped>
.post-list {
  @apply flex flex-col gap-8;
}
</style>
