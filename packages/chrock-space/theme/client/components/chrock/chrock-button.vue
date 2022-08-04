<template>
  <button type="button" :class="['chrock-button', type]">
    <slot />
  </button>
</template>

<script lang="ts" setup>
defineProps<{
  type?: "primary" | "secondary" | "warning" | "error" | "success" | "default";
}>();
</script>

<style lang="postcss">
:root {
  --chrock-type: (primary, secondary, warning, error, success);
}

.chrock-button {
  @apply p-2 text-sm;
  @apply border-0 rounded;
  @apply bg-primary-200 bg-opacity-0 hover:bg-opacity-50 active:bg-opacity-100;

  @apply ring-(4 primary-500 opacity-50) hover:ring-4;

  @each $type in var(--chrock-type) {
    &.$(type) {
      @apply text-white;
      @apply bg-$(type)-500 hover:bg-$(type)-400;
      @apply ring-(0 $(type)-500 opacity-50);
    }
  }
}
</style>
