<template>
  <div class="post-item">
    <div class="card-left">
      <div class="post-group">
        <i class="mdi mdi-map-marker-path text-lg" />
        <group-link :post="post" />
      </div>
      <div class="flex flex-row gap-8">
        <post-author :post="post" />
        <post-update-time :post="post" />
      </div>
      <div v-if="tags?.length">
        <post-tags :post="post" :size="5" />
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

    <!-- <el-image class="post-background" :src="cover" fit="cover" lazy>
      <template #error>
        <div class="failed-slot" />
      </template>
    </el-image> -->
  </div>
</template>

<script lang="ts" setup>
import dayjs from "dayjs";
import { computed } from "vue";
// import { Post } from "../composables/posts";
import { RouterLink } from "vue-router";
import GroupLink from "./linker/group-link.vue";
import TagLink from "./linker/tag-link.vue";
import PostLink from "./linker/post-link.vue";
import PostUpdateTime from "./post/post-update-time.vue";
import PostTags from "./post/post-tags.vue";
import PostAuthor from "./post/post-author.vue";
import { EMPTY_STRING } from "../utils/constants";
import { PostData } from "../../shared/models/groups";

const props = defineProps<{
  post: PostData;
}>();

const subtitle = computed(() => props.post.frontmatter.subtitle);
const tags = computed(() => props.post.frontmatter.tags);
const cover = computed(() => props.post.frontmatter.cover);
const createdTime = computed(() => {
  const time = props.post.git.updatedTime ?? props.post.git.createdTime;
  if (time) {
    return dayjs(props.post.git.createdTime).format("YYYY/MM/DD");
  } else {
    return EMPTY_STRING;
  }
});
</script>

<style lang="postcss" scoped>
.post-item {
  @apply rounded-2xl rounded-bl;
  @apply border-2 border-slate-200 bg-white text-slate-500;
  @apply relative;
  @apply w-[40rem] h-auto;
  @apply flex flex-row;

  @apply duration-500;
  &:hover {
    filter: drop-shadow(0 1.5rem 0.5rem rgb(0 0 0 / 0.04))
      drop-shadow(0 0.75rem 0.25rem rgb(0 0 0 / 0.04));
  }

  & > * {
    @apply relative z-10;
  }

  & .card-left {
    @apply p-12;
    @apply w-4/5;
    @apply flex flex-col gap-2;

    & .post-group {
      /* @apply absolute -top-4 left-8; */
      /* @apply h-8; */
      @apply text-sm font-extralight;
      @apply flex flex-row gap-2 items-center;
      /* @apply bg-white; */
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
      @apply text-sm text-slate-500;

      & :deep(p) {
        @apply my-2;
      }

      & :deep(.header-anchor) {
        @apply hidden;
      }
    }
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
