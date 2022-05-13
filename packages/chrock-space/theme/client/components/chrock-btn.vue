<template>
  <button
    :class="{
      'chrock-btn': true,
      outline,
      text,
    }"
    v-bind="btnProps"
  >
    <slot />
  </button>
</template>

<script lang="ts" setup>
import { ButtonHTMLAttributes, computed } from "vue";

export interface ChrockBtnProps extends ButtonHTMLAttributes {
  outline?: boolean;
  text?: boolean;
}

const props = withDefaults(defineProps<ChrockBtnProps>(), {
  outline: false,
  text: false,

  type: "button",
});

const btnProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { outline, text, ...rest } = props;
  return rest;
});
</script>

<style lang="postcss" scoped>
.chrock-btn {
  @apply p-2 rounded;
  @apply transition-all;

  &:not(.outline):not(.text) {
    @apply bg-slate-500 bg-opacity-75 text-white backdrop-blur;
    @apply hover:bg-slate-400 hover:bg-opacity-100;
  }

  &.outline {
    @apply border border-slate-500 text-slate-500 backdrop-blur-0;
    @apply hover:bg-slate-500 hover:bg-opacity-10;
  }

  &.text {
    @apply text-slate-500;
    @apply hover:text-slate-400;
  }
}
</style>
