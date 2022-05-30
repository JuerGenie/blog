<template>
  <div class="scale-wrapper">
    <div class="scale-wrapper--content">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import type * as CSS from "csstype";
import { useScroll } from "@vueuse/core";

const props = withDefaults(
  defineProps<{
    transformOrigin?: CSS.StandardLonghandPropertiesHyphen["transform-origin"];
  }>(),
  {
    transformOrigin: "center",
  }
);

const scrollPercent = ref(0);
if (!__VUEPRESS_SSR__) {
  const { y } = useScroll(window);
  watch(y, (nv) => {
    scrollPercent.value =
      document.body.clientHeight > nv ? nv / document.body.clientHeight : 1;
  });
}

const bgScale = computed(() => (1.5 - scrollPercent.value * 0.4).toFixed(2));
const bgBrightness = computed(() =>
  (1.2 - scrollPercent.value * 0.8).toFixed(2)
);
const bgBlur = computed(() => `${(scrollPercent.value * 8).toFixed(2)}px`);
</script>

<style lang="postcss" scoped>
.scale-wrapper {
  & .scale-wrapper--content {
    @apply w-full h-full;
    @apply transition-none;

    transform-origin: v-bind("props.transformOrigin");

    @apply scale-[v-bind("bgScale")];
    @apply brightness-[v-bind("bgBrightness")];
    @apply blur-[v-bind("bgBlur")];
  }
}
</style>
