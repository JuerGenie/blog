<template>
  <button
    type="button"
    :class="[
      'chrock-button',
      'auto-bg',
      'focusable',
      'clickable',
      'hoverable',
      type,
    ]"
  >
    <slot />
  </button>
</template>

<script lang="ts" setup>
defineProps<{
  type?: "primary" | "secondary" | "warning" | "error" | "success" | "default";
}>();
</script>

<style lang="postcss">
@import "../../styles/types.css";

.chrock-button {
  @apply p-2 text-sm;
  @apply border-0 rounded;
}
</style>
