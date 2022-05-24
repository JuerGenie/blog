<template>
  <div class="post-tags">
    <i class="mdi mdi-tag-multiple text-lg" />
    <tag-link v-for="tag in renderedTags" :key="tag" :tag="tag">
      <el-button color="#0004" size="small" round class="tag">
        {{ tag }}
      </el-button>
    </tag-link>
    <el-badge
      v-if="hiddenTags.length"
      :value="hiddenTags.length"
      :max="9"
      type="info"
    >
      <el-tooltip
        :show-arrow="false"
        trigger="click"
        effect="extra-tags"
        placement="right"
      >
        <el-button color="#0004" size="small" round class="tag">
          <i class="mdi mdi-dots-horizontal" />
        </el-button>

        <template #content>
          <div class="post-tags">
            <tag-link v-for="tag in hiddenTags" :key="tag" :tag="tag">
              <el-button color="#0004" size="small" round class="tag">
                {{ tag }}
              </el-button>
            </tag-link>
          </div>
        </template>
      </el-tooltip>
    </el-badge>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { Post } from "../../composables/posts";
import TagLink from "../linker/tag-link.vue";

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
  @apply flex flex-row gap-2 items-center;
  @apply text-slate-500;

  & .tag {
    @apply border-none py-1 px-2 !important;
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
