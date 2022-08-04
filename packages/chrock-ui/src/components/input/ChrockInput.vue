<template>
  <label class="chrock-input focusable keep hoverable">
    <div v-if="!!$slots.prefix" class="prefix">
      <slot name="prefix" />
    </div>
    <div class="content">
      <input v-model="value" />
      <div v-if="clearable" @click.stop="onClear" class="clear-btn">
        <i class="mdi mdi-close" />
      </div>
    </div>
    <div v-if="!!$slots.suffix" class="suffix">
      <slot name="suffix" />
    </div>
  </label>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";

const props = defineProps<{
  modelValue?: string;
  clearable?: boolean;
}>();
const emit = defineEmits<{
  (evt: "update:model-value", val: string | undefined): void;
}>();

const value =
  props.modelValue === undefined
    ? ref("")
    : computed({
        get: () => props.modelValue,
        set: (val) => emit("update:model-value", val),
      });

function onClear() {
  value.value = "";
}
</script>

<style lang="postcss" scoped>
.chrock-input {
  @apply rounded;
  @apply bg-slate-100;
  @apply flex flex-row gap-2;

  & > .content {
    @apply flex flex-row gap-2;

    & > input {
      @apply border-0 outline-none;
      @apply bg-transparent;
      @apply text-sm p-0 m-2;
      @apply w-auto;
    }

    & > .clear-btn {
      @apply w-0;
      @apply aspect-square cursor-pointer;
      @apply flex justify-center items-center;
      @apply text-lg text-error  transition-all;

      & > .mdi {
        @apply w-6 h-6 rounded-full backdrop-blur;
        @apply flex justify-center items-center;
        @apply opacity-0 transition-all;
      }
    }
    &:hover > .clear-btn {
      @apply w-6;
      & > .mdi {
        @apply opacity-100;
      }
    }
  }
}
</style>
