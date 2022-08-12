<template>
  <div class="search-bar">
    <div class="search-bar-row">
      <select v-model="innerGroup">
        <option label="选择分组" value="" />
        <option
          v-for="[id, group] in groupOptions"
          :label="titleFormatter(group)"
          :value="id"
        />
      </select>

      <input v-model="innerSearch" placeholder="搜索点儿什么……" />
    </div>
    <div class="search-bar-tags">
      <div
        v-for="(list, tag) in groupTags"
        :key="tag"
        :class="{ tag, active: innerTags.includes(tag) }"
        @click="toggleTag(tag)"
      >
        {{ tag }}({{ list.length }})
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import { groups, GroupTree, tags as groupTags } from "../utils/router";
import { type GroupFrontmatter } from "../../shared/models/groups";

const props = withDefaults(
  defineProps<{
    search?: string;
    group?: string;
    tags?: string[];
  }>(),
  {
    search: "",
    group: "",
    tags: () => [],
  }
);
const emit = defineEmits<{
  (evt: "update:search", val: string): void;
  (evt: "update:group", val: string): void;
  (evt: "update:tags", val: string[]): void;
}>();

const groupOptions = computed(() => Object.entries(groups.value));

const innerGroup = computed({
  get: () => props.group,
  set: (val) => emit("update:group", val),
});
const innerSearch = computed({
  get: () => props.search,
  set: (val) => emit("update:search", val),
});
const innerTags = computed({
  get: () => props.tags,
  set: (val) => emit("update:tags", val),
});

function titleFormatter(group: GroupTree) {
  return (group.route.meta.frontmatter as GroupFrontmatter).title;
}
function toggleTag(tag: string) {
  const index = innerTags.value.indexOf(tag);
  const newTags = [...innerTags.value];
  if (index === -1) {
    newTags.push(tag);
  } else {
    newTags.splice(index, 1);
  }
  innerTags.value = newTags;
}
</script>

<style lang="postcss" scoped>
.search-bar {
  @apply rounded bg-slate-200;

  & > .search-bar-row {
    @apply flex flex-row gap-2 p-2 h-14;

    & > :is(select, input) {
      @apply border-none outline-none;
      @apply rounded bg-white;
      @apply px-2;
    }

    & > input {
      @apply flex-1;
    }
  }

  & > .search-bar-tags {
    @apply flex flex-row justify-center items-center gap-1 p-2 pb-4;

    & > .tag {
      @apply px-2 py-0.5 rounded-full text-xs;
      @apply bg-secondary-400 hover:bg-secondary-500 text-white cursor-pointer;

      &.active {
        @apply bg-primary-500;
      }
    }
  }
}
</style>
