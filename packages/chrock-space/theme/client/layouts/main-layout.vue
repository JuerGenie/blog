<template>
  <main class="layout-main">
    <post-content />
  </main>
</template>

<script lang="ts" setup>
import PostContent from "../components/post-content.vue";
</script>

<style lang="postcss" scoped>
.layout-main {
  @apply scroll-py-16;
}
</style>
