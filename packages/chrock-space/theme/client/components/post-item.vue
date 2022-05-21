<template>
  <div class="post-item">
    <div class="card-left">
      <div class="post-created-date">
        <i class="mdi mdi-calendar-blank text-lg" /> {{ createdTime || "----" }}
      </div>
      <group-link v-if="!!group" class="post-group" :group="group" />
      <div v-if="tags && tags.length" class="post-tags">
        <i class="mdi mdi-tag-multiple text-lg" />
        <tag-link v-for="tag in tags" :key="tag" :tag="tag">
          <el-button color="#0004" size="small" round class="tag">
            {{ tag }}
          </el-button>
        </tag-link>
      </div>
      <div>
        <post-link class="post-title" :post="post">
          {{ post.title }}

          <div v-if="subtitle" class="post-subtitle">{{ subtitle }}</div>
        </post-link>
      </div>
      <div v-if="post.excerpt" class="post-excerpt" v-html="post.excerpt" />
    </div>
    <div class="card-right"></div>

    <el-image class="post-background" :src="background" fit="cover" lazy>
      <template #error>
        <div class="failed-slot" />
      </template>
    </el-image>
  </div>
</template>

<script lang="ts" setup>
import dayjs from "dayjs";
import { computed } from "vue";
import { Post } from "../composables/posts";
import { RouterLink } from "vue-router";
import GroupLink from "./linker/group-link.vue";
import TagLink from "./linker/tag-link.vue";
import PostLink from "./linker/post-link.vue";

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
</script>

<style lang="postcss" scoped>
.post-item {
  @apply rounded-2xl rounded-bl;
  @apply border-2 border-slate-200;
  @apply relative;
  @apply w-[40rem] h-auto;
  @apply flex flex-row;
  @apply hover:shadow-xl;

  & > * {
    @apply relative z-10;
  }

  & .card-left {
    @apply p-12;
    @apply w-3/4;
    @apply flex flex-col gap-2;

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

    & .post-title {
      @apply text-3xl font-extralight;
      @apply cursor-pointer hover:text-slate-500;
      @apply transition-all;
    }

    & .post-subtitle {
      @apply text-lg;
    }

    & .post-tags {
      @apply flex flex-row flex-wrap gap-2 items-center;
      @apply text-slate-500;

      & .tag {
        @apply border-none py-1 px-2 !important;
      }
    }

    & .post-excerpt {
      @apply text-sm text-slate-500;

      & :deep(p) {
        @apply my-2;
      }

      & :deep(.header-anchor) {
        @apply hidden;
      }
    }
  }

  & .card-right {
  }

  & .post-background {
    @apply absolute -top-8 -right-16 z-0;
    @apply h-full w-2/3;
    @apply rounded-r-2xl border-2;
    @apply pointer-events-none;

    mask-image: linear-gradient(
      to right,
      #0000,
      #0001,
      #0003,
      #0008,
      #000f,
      #000f
    );

    & .failed-slot {
      @apply w-full h-full;

      background-image: linear-gradient(
        60deg,
        theme("colors.slate.100"),
        theme("colors.slate.100") 50%,
        theme("colors.slate.200") 0
      );
    }
  }
}
</style>
