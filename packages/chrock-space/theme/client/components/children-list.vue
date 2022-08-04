<template>
  <div class="children-list">
    <div v-if="subgroups.length" class="group-list">
      <div class="title">分组({{ subgroups.length }})</div>
      <div class="list">
        <children-list-group-item
          v-for="group in subgroups"
          :key="group.route.name"
          :group="group"
        />
      </div>
    </div>
    <div v-if="subposts.length" class="post-list">
      <div class="title">文章({{ subposts.length }})</div>
      <div class="list">
        <children-list-post-item
          v-for="post in subposts"
          :key="post.route.name"
          :post="post"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { GroupFrontmatter } from "../../shared/models/groups";
import { GroupTree } from "../utils/router";
import ChildrenListGroupItem from "./children-list-group-item.vue";
import ChildrenListPostItem from "./children-list-post-item.vue";

const props = defineProps<{
  group: GroupTree;
}>();

const subgroups = computed(
  () =>
    props.group.children?.filter(
      (child) => !child.route.path.endsWith(".html")
    ) ?? []
);
const subposts = computed(
  () =>
    props.group.children?.filter((child) =>
      child.route.path.endsWith(".html")
    ) ?? []
);

function titleFormatter(group: GroupTree) {
  return (group.route.meta.frontmatter as GroupFrontmatter)?.title;
}
function descriptionFormatter(group: GroupTree) {
  return (group.route.meta.frontmatter as GroupFrontmatter)?.description;
}
</script>

<style lang="postcss" scoped>
.children-list {
  @apply flex flex-col gap-4;

  & > :is(.group-list, .post-list) {
    @apply rounded-lg overflow-hidden;
    @apply border border-slate-200;

    & .title {
      @apply text-base;
      @apply w-full bg-slate-200 p-2;
    }
  }

  & > .group-list {
    & > .list {
      @apply flex flex-row flex-wrap p-2 gap-2;
    }
  }

  & > .post-list {
    & > .list {
      @apply flex flex-col p-2 gap-2;
    }
  }
}
</style>
