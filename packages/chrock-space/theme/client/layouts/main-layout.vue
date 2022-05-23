<template>
  <main-container>
    <main class="layout-main">
      <post-content />
    </main>
  </main-container>
</template>

<script lang="ts" setup>
import PostContent from "../components/post-content.vue";
import MainContainer from "../components/main-container.vue";
</script>

<style lang="postcss" scoped>
.layout-main {
  @apply scroll-py-16;
}
</style>
