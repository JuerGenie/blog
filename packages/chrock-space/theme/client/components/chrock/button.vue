<template>
  <button
    :class="{
      'chrock-button': true,
      dark,
      [color]: color,
    }"
  >
    <slot />
  </button>
</template>

<script lang="ts" setup>
import { ColorType } from "./models";

const props = withDefaults(
  defineProps<{
    dark?: boolean;
    color?: ColorType;
  }>(),
  {
    color: "primary",
  }
);
</script>

<style lang="postcss" scoped>
.chrock-button {
  @apply px-2 py-1 rounded;

  @apply text-attached-600 bg-opacity-10;
  &.dark {
    @apply text-white bg-opacity-100;
  }

  &.primary {
    @apply hover:bg-primary-500;
    &.dark {
      @apply bg-primary-500 hover:bg-primary-400;
    }
  }

  &.secondary {
    @apply hover:bg-secondary-500;
    &.dark {
      @apply bg-secondary-500 hover:bg-secondary-400;
    }
  }
}
</style>
