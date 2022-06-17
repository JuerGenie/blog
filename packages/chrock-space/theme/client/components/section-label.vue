<template>
  <div class="section-label">
    <slot />
  </div>
</template>

<script lang="ts" setup></script>

<style lang="postcss" scoped>
.section-label {
  @apply text-2xl text-slate-500 font-light tracking-widest;
  @apply flex flex-row items-center justify-center gap-2;
  @apply select-none;

  &::before,
  &::after {
    content: "";

    @apply w-32;
    @apply border rounded;
  }
}
</style>
