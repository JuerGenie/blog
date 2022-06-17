<template>
  <div class="author">
    <i class="mdi mdi-account-box text-lg" />
    {{ post.git?.contributors?.[0]?.name ?? EMPTY_STRING }}
  </div>
</template>

<script lang="ts" setup>
import { Post } from "../../composables/posts";
import { EMPTY_STRING } from "../../utils/constants";

defineProps<{
  post: Post;
}>();
</script>

<style lang="postcss" scoped>
.author {
  @apply text-sm;
  @apply flex flex-row items-center gap-2;
}
</style>
