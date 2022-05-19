<template>
  <div class="background">
    <div
      v-for="(c, index) in colors"
      class="bg-item"
      :style="getBindingStyle(c, index)"
    />
  </div>
</template>

<script lang="ts" setup>
const colors = ["#5eead4", "#7dd3fc", "#c4b5fd", "#fda4af"];

function getBindingStyle(color: string, index: number) {
  return [
    `--bg-color: ${color}`,
    `--index: ${index}`,
    `--bg-deg: ${index % 2 ? 120 : 60}deg`,
    `--bg-position: ${60 - Math.floor(index / 2) * 20}%`,
  ].join(";");
}
</script>

<style lang="postcss" scoped>
.background {
  @apply relative w-screen h-screen overflow-hidden;
  @apply bg-gradient-to-r from-slate-400 to-transparent;

  & .bg-item {
    background-image: linear-gradient(
      var(--bg-deg),
      var(--bg-color),
      var(--bg-color) var(--bg-position),
      theme("colors.transparent") var(--bg-position),
      theme("colors.transparent") 100%
    );

    @apply absolute -inset-16;
    @apply drop-shadow-2xl;
  }
}
</style>
