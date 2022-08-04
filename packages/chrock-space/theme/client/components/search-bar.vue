<template>
  <div class="search-bar">
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
</template>

<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import { groups, GroupTree } from "../utils/router";
import { type GroupFrontmatter } from "../../shared/models/groups";

const props = defineProps<{
  search?: string;
  group?: string;
}>();
const emit = defineEmits<{
  (evt: "update:search", val: string): void;
  (evt: "update:group", val: string): void;
}>();

const groupOptions = computed(() => Object.entries(groups.value));

const innerGroup = ref(props.group ?? "");
const innerSearch = ref(props.search ?? "");

watch(innerGroup, (nv) => emit("update:group", nv));
watch(innerSearch, (nv) => emit("update:search", nv));

function titleFormatter(group: GroupTree) {
  return (group.route.meta.frontmatter as GroupFrontmatter).title;
}
</script>

<style lang="postcss" scoped>
.search-bar {
  @apply rounded bg-slate-200;
  @apply flex flex-row gap-2 p-2 h-16;

  & > :is(select, input) {
    @apply border-none outline-none;
    @apply rounded bg-white;
    @apply px-2;
  }

  & > input {
    @apply flex-1;
  }
}
</style>
