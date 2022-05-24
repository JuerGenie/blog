<template>
  <div class="main-page">
    <header :class="{ 'no-cover': !cover }">
      <el-image v-if="!!cover" :src="cover" fit="cover">
        <template #error>
          <div class="failed-slot" />
        </template>
      </el-image>
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
    @apply w-full h-96 px-32 py-8;
    @apply relative;
    @apply flex flex-col justify-end;
    @apply text-slate-200;

    &.no-cover {
      @apply text-slate-800;
    }
  }

  & > main {
    @apply w-full;
    @apply relative;
    @apply flex flex-col gap-4;
  }

  & > header,
  > main {
    & > * {
      @apply max-w-xl lg:max-w-3xl;
    }
  }
}
</style>
