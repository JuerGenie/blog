<template>
  <router-link class="tag-linker" :to="location">
    <slot>
      {{ tag }}
    </slot>
  </router-link>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { RouterLink } from "vue-router";

const props = defineProps<{
  tag?: string;
}>();

const location = computed(() => ({
  path: `/tags/`,
  query: {
    search: props.tag,
  },
}));
</script>

<style lang="postcss" scoped></style>
