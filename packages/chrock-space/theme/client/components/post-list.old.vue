<template>
  <div class="post-list">
    <div class="post-item-list">
      <div>
        <post-item v-for="post in filteredPosts" :key="post.key" :post="post" />
      </div>
    </div>
    <div class="post-pagination">
      <!-- <el-pagination
        layout="prev, pager, next"
        :total="pagination.total"
        v-model:current-page="pagination.current"
        :default-page-size="pagination.size"
        background
        small
      /> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import { usePosts } from "../composables/posts";
import PostItem from "./post-item.vue";
import { computed, ref } from "vue";

const { posts } = usePosts();
const pagination = ref({
  total: posts.value.length,
  current: 1,
  size: 20,
});
const pagingStart = computed(
  () => (pagination.value.current - 1) * pagination.value.size
);
const filteredPosts = computed(() =>
  posts.value.slice(
    pagingStart.value,
    pagingStart.value + pagination.value.size
  )
);
</script>

<style lang="postcss" scoped>
.post-list {
  @apply w-full h-full overflow-auto;
  @apply flex flex-col;

  & .post-item-list {
    @apply flex-1;
    @apply overflow-auto;

    & > div {
      @apply flex flex-col gap-4 p-8;
    }
  }

  & .post-pagination {
    @apply flex flex-row justify-end;
    @apply px-8 py-4;
  }
}
</style>
