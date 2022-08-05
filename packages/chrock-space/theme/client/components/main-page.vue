<template>
  <div class="main-page">
    <header :class="{ 'no-cover': !cover }">
      <!-- <el-image v-if="!!cover" :src="cover" fit="cover">
        <template #error>
          <div class="failed-slot" />
        </template>
      </el-image> -->
      <slot name="header" />
    </header>

    <main>
      <slot />
    </main>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  cover?: string;
}>();
</script>

<style lang="postcss" scoped>
.main-page {
  @apply flex flex-col gap-8;

  & > header {
    @apply w-full px-32 py-8;
    @apply relative;
    @apply flex flex-col justify-end items-center;
    @apply text-slate-200;

    &.no-cover {
      @apply text-slate-800;

      &::after {
        content: "";
        @apply mt-16 w-full;
        @apply border rounded border-slate-100;
      }
    }

    & .el-image {
      @apply absolute inset-0 z-0;

      &::after {
        content: "";
        @apply absolute inset-0;
        @apply bg-gradient-to-t from-[#0009] to-[#0000];
        @apply backdrop-blur-[1px];
      }

      & .failed-slot {
        @apply w-full h-full;

        background-image: linear-gradient(
          60deg,
          theme("colors.slate.100"),
          theme("colors.slate.100") 50%,
          theme("colors.slate.200") 0
        );
      }
    }
  }

  & > main {
    @apply w-full;
    @apply relative;
    @apply flex flex-col gap-4 items-center;
  }

  & > header,
  > main {
    & > :deep(*:not(.el-image)) {
      @apply max-w-xl lg:max-w-3xl;
    }
  }
}
</style>
