<template>
  <div class="post-update-time">
    <i class="mdi mdi-calendar-blank text-lg" />
    <span>{{ createdTime }}</span>
    <span>(更新于 {{ updatedTime }})</span>
  </div>
</template>

<script lang="ts" setup>
import dayjs from "dayjs";
import { computed } from "vue";
import { Post } from "../../composables/posts";
import { dateFormatter } from "../../utils/formatters";
import { EMPTY_STRING } from "../../utils/constants";

const props = defineProps<{
  post: Post;
}>();

const createdTime = computed(() => {
  if (props.post.frontmatter.date) {
    return dayjs(props.post.frontmatter.date).format("YYYY/MM/DD");
  } else {
    return dateFormatter(props.post.git.createdTime);
  }
});

const updatedTime = computed(() => dateFormatter(props.post.git.updatedTime));
</script>

<style lang="postcss" scoped>
.post-update-time {
  @apply flex flex-row items-center gap-2;
  @apply text-sm;
}
</style>
