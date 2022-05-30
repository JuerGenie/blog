<template>
  <div class="post-tags">
    <i class="mdi mdi-tag-multiple post-tags-icon" />
    <div class="post-tags-content">
      <post-tag-btn v-for="tag in tags" :key="tag" class="tag" :tag="tag" />
    </div>
    <!-- <el-badge
      v-if="hiddenTags.length"
      :value="hiddenTags.length"
      :max="9"
      type="info"
    >
      <el-tooltip
        :show-arrow="false"
        trigger="click"
        effect="extra-tags"
        placement="right-start"
      >
        <el-button color="#0004" size="small" round class="tag">
          <i class="mdi mdi-dots-horizontal" />
        </el-button>

        <template #content>
          <div class="post-tags">
            <post-tag-btn v-for="tag in hiddenTags" :key="tag" :tag="tag" />
          </div>
        </template>
      </el-tooltip>
    </el-badge> -->
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { Post } from "../../composables/posts";
import TagLink from "../linker/tag-link.vue";
import PostTagBtn from "./post-tag-btn.vue";

const props = defineProps<{
  post: Post;
  size?: number;
}>();
const tags = computed(() => props.post.frontmatter.tags ?? []);
const renderedTags = computed(() =>
  props.size ? tags.value.slice(0, props.size) : tags.value
);
const hiddenTags = computed(() =>
  props.size ? tags.value.slice(props.size) : []
);
</script>

<style lang="postcss" scoped>
.post-tags {
  @apply flex flex-row gap-2;

  & .post-tags-icon {
    @apply text-lg;
  }

  & .post-tags-content {
    @apply flex flex-row flex-wrap gap-1 items-center;
    @apply py-1;
  }
}
</style>
<style lang="postcss">
.is-extra-tags {
  @apply bg-transparent;
  @apply max-w-sm;
  @apply p-0;

  & .post-tags {
    @apply flex-wrap;
  }
}
</style>
