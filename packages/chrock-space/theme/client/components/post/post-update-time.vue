<template>
  <div class="update-time">
    <i class="mdi mdi-calendar-blank text-lg" />
    {{ createdTime }}
  </div>
</template>

<script lang="ts" setup>
import dayjs from "dayjs";
import { computed } from "vue";
import { Post } from "../../composables/posts";

const props = defineProps<{
  post: Post;
}>();

const createdTime = computed(() => {
  const time = props.post.git.updatedTime ?? props.post.git.createdTime;
  if (time) {
    return dayjs(props.post.git.createdTime).format("YYYY/MM/DD");
  } else {
    return "----";
  }
});
</script>

<style lang="postcss" scoped>
.update-time {
  @apply flex flex-row items-center gap-2;
  @apply text-sm text-slate-500;
}
</style>
