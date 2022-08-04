<template>
  <div ref="containerRef" class="parallax" :data-rellax-speed="speed">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, shallowRef, nextTick } from "vue";
import Rellax, { RellaxInstance } from "rellax";

const props = withDefaults(
  defineProps<{
    speed?: number;
    wrapper?: HTMLElement;
  }>(),
  {
    speed: -2,
  }
);

const instance = shallowRef<RellaxInstance>();
const containerRef = shallowRef<HTMLDivElement>();
watch(
  containerRef,
  (nv) => {
    if (nv) {
      instance.value = new Rellax(nv, {
        wrapper: props.wrapper,
      });
    }
  },
  { immediate: true }
);
watch(
  () => props.speed,
  (nv) => {
    if (nv < -10 || nv > 10) {
      throw new Error("speed only accept range(-10, 10)!");
    } else {
      nextTick(() => {
        instance.value?.refresh();
      });
    }
  }
);
</script>

<style lang="postcss" scoped></style>
