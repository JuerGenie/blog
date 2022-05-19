<template>
  <div class="post-item">
    <div class="post-created-date">
      <i class="mdi mdi-calendar-month text-lg" /> {{ createdTime || "----" }}
    </div>
    <router-link v-if="!!group" class="post-group" :to="`/?group=${group}`">
      {{ group }}
    </router-link>
    <div>
      <router-link class="post-title" :to="post.path">
        {{ post.title }}

        <div v-if="subtitle" class="post-subtitle">{{ subtitle }}</div>
      </router-link>
    </div>
    <div v-if="post.excerpt" class="post-excerpt" v-html="post.excerpt" />

    <el-image
      v-if="!!background"
      class="post-background"
      :src="background"
      fit="cover"
    />
  </div>
</template>

<script lang="ts" setup>
import dayjs from "dayjs";
import { computed } from "vue";
import { Post } from "../compositablies/posts";
import { useRouter, RouterLink } from "vue-router";

const props = defineProps<{
  post: Post;
}>();

const subtitle = computed(() => props.post.frontmatter.subtitle);
const group = computed(() => props.post.frontmatter.group);
const tags = computed(() => props.post.frontmatter.tags);
const background = computed(() => props.post.frontmatter.background);
const createdTime = computed(
  () =>
    props.post.git.createdTime &&
    dayjs(props.post.git.createdTime).format("YYYY/MM/DD")
);

const router = useRouter();
</script>

<style lang="postcss" scoped>
.post-item {
  @apply rounded-lg;
  @apply border border-slate-200;
  @apply p-12;
  @apply relative;
  @apply flex flex-col gap-4;
  @apply w-[40rem] h-[20rem];

  & > * {
    @apply relative z-10;
  }

  & .post-group {
    @apply absolute -top-4 left-8;
    @apply h-8 flex justify-center items-center px-4;
    @apply text-lg font-extralight;
    @apply bg-white;
  }

  & .post-created-date {
    @apply flex flex-row items-center gap-2;
    @apply text-sm text-slate-500;
  }

  & .post-background {
    @apply absolute top-0 right-0 bottom-0 z-0;
    @apply aspect-[3/2];
    @apply rounded-r-md;
    @apply pointer-events-none;

    mask-image: linear-gradient(to right, #0000, #0001, #0009);
  }

  & .post-title {
    @apply text-3xl font-extralight;
    @apply cursor-pointer hover:text-slate-500;
    @apply transition-all;
  }

  & .post-subtitle {
    @apply text-lg;
  }

  & .post-excerpt {
    /* @apply line-clamp-6; */
    @apply text-sm text-slate-500;
    @apply w-2/3;

    & :deep(p) {
      @apply my-2;
    }

    & :deep(.header-anchor) {
      @apply hidden;
    }
  }
}
</style>
