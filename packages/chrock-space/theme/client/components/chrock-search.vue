<template>
  <!-- <el-select
    class="chrock-search"
    filterable
    :filter-method="onFilter"
    @update:model-value="onUpdateTarget"
    suffix-icon=""
    placeholder="Search"
    no-data-text="试着输入点什么？"
    no-match-text="没有匹配的结果哦！"
  >
    <el-option
      v-for="suggestion in suggestions"
      :key="suggestion.link"
      :label="suggestion.title"
      :value="suggestion.link"
    />
  </el-select> -->
</template>

<script lang="ts" setup>
import {
  useSearchSuggestions,
  useHotKeys,
  useSearchIndex,
  SearchSuggestion,
} from "@vuepress/plugin-search/lib/client";
import { useRouter } from "vue-router";
import { useRouteLocale } from "@vuepress/client";
import { ref, toRefs } from "vue";

const props = withDefaults(
  defineProps<{
    hotKeys?: string[];
    maxSuggestions?: number;
  }>(),
  {
    hotKeys: () => [],
    maxSuggestions: 5,
  }
);

const { hotKeys, maxSuggestions } = toRefs(props);

const router = useRouter();
const routeLocale = useRouteLocale();
const searchIndex = useSearchIndex();

const inputRef = ref<HTMLInputElement | null>(null);
const query = ref("");

function onFilter(str: string) {
  query.value = str;
}

const suggestions = useSearchSuggestions({
  searchIndex,
  routeLocale,
  query,
  maxSuggestions,
});
useHotKeys({ input: inputRef, hotKeys });

function onUpdateTarget(target: SearchSuggestion) {
  router.push(target.link);
  query.value = "";
}
</script>

<style lang="postcss" scoped>
.chrock-search {
  @apply bg-transparent;

  & :deep(.el-input__wrapper) {
    @apply bg-transparent;
  }
}
</style>
