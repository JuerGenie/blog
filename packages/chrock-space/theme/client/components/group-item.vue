<template>
  <router-link :to="to">
    <div class="group-item">
      <div class="group-name" :title="groupName">{{ groupName }}</div>
      <div v-if="groupData.description" class="group-description">
        {{ groupData.description }}
      </div>

      <el-image class="group-background" :src="cover" fit="cover" lazy>
        <template #error>
          <div class="failed-slot" />
        </template>
      </el-image>
    </div>
  </router-link>
</template>

<script lang="ts" setup>
import { Group, groups } from "../composables/posts";
import { computed } from "vue";
import { EMPTY_STRING } from "../utils/constants";
import { RouterLink } from "vue-router";

const props = defineProps<{
  group: Group;
}>();

const groupData = computed(() => groups[props.group.path]);
const groupName = computed(
  () =>
    props.group.path
      .split("/")
      .filter((str) => !!str)
      .pop() ?? EMPTY_STRING
);
const cover = computed(() => groupData.value.cover);

const to = computed(() => ({
  path: `/groups${props.group.path}`,
}));
</script>

<style lang="postcss" scoped>
.group-item {
  @apply px-4 py-2 w-56 h-48;
  @apply rounded-lg;
  @apply overflow-hidden;
  @apply hover:shadow-lg;
  @apply select-none cursor-pointer;
  @apply relative;

  & > * {
    @apply relative z-10;
  }

  & .group-name {
    @apply text-2xl pt-2 pb-4;
    @apply truncate;
    @apply underline underline-offset-2;
  }

  & .group-description {
    @apply text-sm line-clamp-5;
    @apply overflow-auto;
  }

  & .group-background {
    @apply absolute inset-0 z-0;

    @apply pointer-events-none;
    @apply opacity-40;

    & .failed-slot {
      @apply w-full h-full;

      background-image: linear-gradient(
        60deg,
        theme("colors.slate.300"),
        theme("colors.slate.200") 60%,
        theme("colors.slate.300") 0
      );
    }
  }
}
</style>
