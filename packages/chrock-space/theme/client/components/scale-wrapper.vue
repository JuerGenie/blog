<template>
  <div class="scale-wrapper">
    <div class="scale-wrapper--content">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, toRef, watch, watchEffect } from "vue";
import { MaybeRef, useScroll } from "@vueuse/core";

const props = defineProps<{
  target: Parameters<typeof useScroll>[0] extends MaybeRef<infer R> ? R : never;
}>();

const target = toRef(props, "target");
const scrollPercent = ref(0);
const { y } = useScroll(target);
watchEffect(() => {
  scrollPercent.value =
    document.body.clientHeight > y.value
      ? y.value / document.body.clientHeight
      : 1;
});

const bgScale = computed(() => (1.4 - scrollPercent.value * 0.2).toFixed(2));
const bgBrightness = computed(() => (1 - scrollPercent.value * 0.4).toFixed(2));
const bgBlur = computed(() => `${(scrollPercent.value * 8).toFixed()}px`);
</script>

<style lang="postcss" scoped>
.scale-wrapper {
  & .scale-wrapper--content {
    @apply scale-[v-bind("bgScale")];
    @apply brightness-[v-bind("bgBrightness")];
    @apply blur-[v-bind("bgBlur")];
  }
}
</style>
