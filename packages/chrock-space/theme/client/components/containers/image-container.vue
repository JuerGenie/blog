<template>
  <div class="image-container extra-content">
    <div class="img-wrapper">
      <img v-bind="{ src, alt }" />
      <div class="modal">
        <slot />
      </div>
    </div>
    <div class="alt">{{ alt }}</div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  src: string;
  alt: string;
}>();
</script>

<style lang="postcss" scoped>
.image-container {
  @apply w-full h-auto;
  @apply flex flex-col;

  & .img-wrapper {
    @apply flex-1;
    @apply relative;

    & .modal {
      @apply absolute inset-x-0 bottom-0;
      @apply px-4;
      @apply bg-black bg-opacity-50 text-white;
    }
  }

  & .alt {
    @apply text-center text-sm text-slate-500;
    @apply pt-1 pb-2;
  }

  & :deep(hr) {
    @apply border-white border-opacity-50;
  }
}
</style>
