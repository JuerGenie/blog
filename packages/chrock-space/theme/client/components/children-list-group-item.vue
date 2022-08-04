<template>
  <router-link class="children-list-group-item" :to="group.route">
    <div class="group-item-title">{{ frontmatter.title }}</div>
    <div v-if="frontmatter.description" class="group-item-description">
      {{ frontmatter.description }}
    </div>
  </router-link>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { GroupFrontmatter } from "../../shared/models/groups.js";
import { GroupTree } from "../utils/router.js";

const props = defineProps<{
  group: GroupTree;
}>();

const frontmatter = computed(
  () => (props.group.route.meta.frontmatter as GroupFrontmatter) ?? {}
);
const cover = computed(() => `url(${frontmatter.value.cover})`);
</script>

<style lang="postcss" scoped>
.children-list-group-item {
  @apply w-56 h-56 border border-slate-200 rounded;
  @apply flex flex-col justify-end relative;
  @apply cursor-pointer hover:drop-shadow-xl;

  @apply bg-cover;
  background-image: v-bind("cover");

  & > * {
    @apply relative z-1;
    @apply bg-white bg-opacity-80 backdrop-blur;
  }
  &::before {
    content: "";
    @apply absolute inset-0 z-0;
  }

  & > .group-item-title {
    @apply text-xl p-2;
  }
  & > .group-item-description {
    @apply text-xs p-2 pt-0;
    @apply text-slate-500;
  }
}
</style>
