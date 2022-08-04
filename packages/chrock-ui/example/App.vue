<template>
  <div class="example">
    <div class="buttons">
      <div class="text-xl">按钮</div>
      <div class="flex flex-row gap-4 items-center">
        <chrock-button>默认按钮</chrock-button>
        <chrock-button type="primary">Primary 按钮</chrock-button>
        <chrock-button type="secondary">Secondary 按钮</chrock-button>
        <chrock-button type="warning">Warning 按钮</chrock-button>
        <chrock-button type="error">Error 按钮</chrock-button>
        <chrock-button type="success">Success 按钮</chrock-button>
      </div>
    </div>

    <div class="inputs">
      <div class="text-xl">输入框</div>
      <div class="flex flex-row gap-4 items-center">
        <chrock-input />
        <chrock-input clearable />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="postcss" scoped>
.example {
  @apply flex flex-col gap-8 items-center;
  @apply p-8 min-h-full;
  @apply bg-slate-100;

  & > * {
    @apply w-4xl;
    @apply p-8 shadow rounded-lg;
    @apply bg-white;

    @apply flex flex-col gap-2;
  }
}
</style>
