<template>
  <tag-link class="post-tag-btn" :tag="tag">
    <!-- <el-button color="#0004" size="small" round class="tag">
      {{ tag }}
    </el-button> -->
  </tag-link>
</template>

<script lang="ts" setup>
import TagLink from "../linker/tag-link.vue";

defineProps<{
  tag: string;
}>();
</script>

<style lang="postcss" scoped>
.post-tag-btn {
  @apply flex justify-center items-center;

  & .el-button.tag {
    @apply backdrop-blur;
    @apply py-0.5 px-2 text-xs h-auto;
  }
}
</style>
