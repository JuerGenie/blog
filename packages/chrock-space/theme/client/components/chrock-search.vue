<template>
  <label class="chrock-search">
    <input
      ref="inputRef"
      type="search"
      placeholder="..."
      @keypress.up="onArrowUp"
      @keypress.down="onArrowDown"
      v-model="query"
    />
  </label>
</template>

<script lang="ts" setup>
import {
  useSearchSuggestions,
  useHotKeys,
  useSearchIndex,
  useSuggestionsFocus,
} from "@vuepress/plugin-search/lib/client";
import { useRouter } from "vue-router";
import { useRouteLocale } from "@vuepress/client";
import { computed, ref, toRefs } from "vue";

const props = withDefaults(
  defineProps<{
    hotKeys: string[];
    maxSuggestions?: number;
  }>(),
  {
    maxSuggestions: 5,
  }
);

const { hotKeys, maxSuggestions } = toRefs(props);

const router = useRouter();
const routeLocale = useRouteLocale();
const searchIndex = useSearchIndex();

const inputRef = ref<HTMLInputElement | null>(null);
const isActive = ref(false);
const query = ref("");

const suggestions = useSearchSuggestions({
  searchIndex,
  routeLocale,
  query,
  maxSuggestions,
});
const { focusIndex, focusNext, focusPrev } = useSuggestionsFocus(suggestions);
useHotKeys({ input: inputRef, hotKeys });

const showSuggestions = computed(
  () => isActive.value && !!suggestions.value.length
);
const onArrowUp = (): void => {
  if (!showSuggestions.value) {
    return;
  }
  focusPrev();
};
const onArrowDown = (): void => {
  if (!showSuggestions.value) {
    return;
  }
  focusNext();
};
</script>

<style lang="postcss" scoped></style>
