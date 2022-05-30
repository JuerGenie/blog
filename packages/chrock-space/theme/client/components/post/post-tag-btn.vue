<template>
  <tag-link :tag="tag">
    <el-button color="#0004" size="small" round class="tag">
      {{ tag }}
    </el-button>
  </tag-link>
</template>

<script lang="ts" setup>
import TagLink from "../linker/tag-link.vue";

defineProps<{
  tag: string;
}>();
</script>

<style lang="postcss" scoped>
.el-button {
  @apply backdrop-blur;
}
</style>
