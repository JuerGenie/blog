<template>
  <router-link class="post-linker" :to="location">
    <slot>
      {{ post.title }}
    </slot>
  </router-link>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { RouterLink } from "vue-router";
import { Post } from "../../composables/posts";

const props = defineProps<{
  post: Post;
}>();

const location = computed(() => ({
  path: props.post.path,
}));
</script>

<style lang="postcss" scoped></style>
