<template>
  <router-link class="group-linker" :to="location">
    <slot>
      {{ group }}
    </slot>
  </router-link>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { RouterLink } from "vue-router";

const props = defineProps<{
  group?: string;
}>();

const location = computed(() => ({
  path: `/groups/`,
  query: {
    search: props.group,
  },
}));
</script>

<style lang="postcss" scoped></style>
