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

const innerGroup = ref(props.group);
const innerSearch = ref(props.search);
const innerTags = ref(props.tags);

watch(innerGroup, (nv) => emit("update:group", nv));
watch(innerSearch, (nv) => emit("update:search", nv));
watch(innerTags, (nv) => emit("update:tags", nv));

function titleFormatter(group: GroupTree) {
  return (group.route.meta.frontmatter as GroupFrontmatter).title;
}
function toggleTag(tag: string) {
  const index = innerTags.value.indexOf(tag);
  if (index === -1) {
    innerTags.value.push(tag);
  } else {
    innerTags.value.splice(index, 1);
  }
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
