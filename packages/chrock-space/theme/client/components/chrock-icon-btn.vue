<template>
  <button class="chrock-icon-btn">
    <i v-if="icon.startsWith('mdi-')" :class="['mdi', icon]" />
    <div v-else>{{ icon }}</div>
    <div v-if="description" class="description">
      {{ description }}
    </div>
  </button>
</template>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    icon: string | `mdi-${string}`;
    description?: string;

    size?: string;
  }>(),
  {
    size: "1rem",
  }
);
</script>

<style lang="postcss" scoped>
.chrock-icon-btn {
  @apply h-12 px-2 rounded;
  @apply flex flex-col items-center justify-center gap-0.5;
  @apply select-none;
  @apply uppercase;

  font-size: v-bind("size");

  & > i {
    @apply font-bold tracking-widest;
  }

  & .description {
    @apply h-0 opacity-0 text-xs;
    @apply transition-all;
    @apply relative -top-2;
  }

  &:hover .description {
    @apply h-2 opacity-50;
  }
}
</style>
