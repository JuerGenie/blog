<template>
  <button
    :class="classes"
    v-bind="({ ...$attrs, type: $attrs.type || 'button' } as ButtonHTMLAttributes)"
  >
    <slot />
  </button>
</template>

<script lang="ts" setup>
import {
  type ButtonHTMLAttributes,
  computed,
  useAttrs,
  watchEffect,
} from "vue";
import { ColorType } from "../../models/color-type";

export interface DefaultButtonProps extends ButtonHTMLAttributes {
  colorType?: ColorType;
  outline?: boolean;
}

const props: Omit<DefaultButtonProps, keyof ButtonHTMLAttributes> =
  withDefaults(defineProps<DefaultButtonProps>(), {
    colorType: "primary",
  });

const attrs = useAttrs();
watchEffect(() => {
  console.log(JSON.parse(JSON.stringify({ props, attrs })));
});

const classes = computed(() => {
  const result = ["chrock-button", props.colorType];
  if (props.outline) {
    result.push("outline");
  }
  return result;
});
</script>

<style lang="postcss" scoped>
.chrock-button {
  @apply rounded p-2;
  @apply transition-all;
  @apply relative;

  &.primary {
    @apply bg-primary-500 bg-opacity-80 backdrop-blur hover:bg-opacity-100 focus:bg-opacity-100;
    @apply text-white;

    &.outline {
      @apply border-primary-500 text-primary-500;

      &::before {
        @apply bg-primary-500;
      }
    }

    &::before {
      @apply bg-primary-200;
      /* @apply shadow-lg shadow-primary-800; */
    }
  }
  &.secondary {
    @apply bg-secondary-500 bg-opacity-80 backdrop-blur hover:bg-opacity-100 focus:bg-opacity-100;
    @apply text-white;

    &.outline {
      @apply border-secondary-500 text-secondary-500;

      &::before {
        @apply bg-secondary-500;
      }
    }

    &::before {
      @apply bg-secondary-200;
      /* @apply shadow-lg shadow-secondary-800; */
    }
  }
  &.transparent {
    @apply bg-primary-500 bg-opacity-0 hover:bg-opacity-10 focus:bg-opacity-10;
    @apply text-black;

    &::before {
      @apply bg-primary-500;
      /* @apply shadow-lg shadow-primary-800; */
    }
  }
  &.outline {
    @apply bg-opacity-0 hover:bg-opacity-10 focus:bg-opacity-10;
  }

  &::before {
    content: "";
    @apply absolute inset-0 opacity-0;
  }
  &:active::before {
    animation-name: flashAnimationController;
    animation-duration: 1s;
    animation-iteration-count: 1;
    animation-timing-function: ease-out;
  }
}

@keyframes flashAnimationController {
  from {
    @apply opacity-20;
  }
  to {
    @apply opacity-0;
  }
}
</style>
