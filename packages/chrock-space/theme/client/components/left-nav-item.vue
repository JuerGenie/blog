<template>
  <div :class="{ 'left-nav-item': true, active }">
    <router-link class="title" :to="group.route.path">
      <div class="flex gap-1">
        <i class="mdi mdi-checkbox-intermediate" />
        <div class="inline-block break-all">{{ data?.title }}</div>
      </div>
    </router-link>
    <div v-if="children && children.length" class="sub-nav">
      <left-nav-item
        v-for="child in children"
        :key="child.route.name"
        :group="child"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PageFrontmatter } from "@vuepress/client";
import { computed } from "vue";
import { GroupTree } from "../utils/router.js";
import { useRoute } from "vue-router";

const props = defineProps<{
  group: GroupTree;
}>();

const children = computed(() =>
  props.group.children?.filter((child) => "children" in child)
);

const route = useRoute();
const data = computed(
  () => props.group.route.meta.frontmatter as PageFrontmatter
);

const active = computed(() => route.path.startsWith(props.group.route.path));
</script>

<style lang="postcss" scoped>
.left-nav-item {
  @apply border-(l-16 t-4 secondary-300 opacity-50) text-(slate-400 opacity-50);
  @apply hover:(border-opacity-100! text-opacity-100!);
  @apply flex flex-col pl-2;

  &.active {
    @apply border-primary-500 text-primary-500;

    &:has(.active) {
      @apply border-opacity-50 text-opacity-50;
    }
  }

  & > .title {
    @apply text-base cursor-pointer py-1;
  }

  & .sub-nav {
    @apply flex flex-col gap-2;

    & .left-nav-item {
      @apply border-r-0;
      @apply last-of-type:border-b-0;
    }
  }
}
</style>
