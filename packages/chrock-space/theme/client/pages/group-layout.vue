<template>
  <main-page :cover="cover">
    <template #header>
      <div class="header-panel">
        <div class="title">
          {{ title }}
        </div>
        <div class="divider" />
        <div class="subtitle">{{ subtitle }}</div>
      </div>
    </template>

    <section-label>子分组({{ currentNode.children.length }})</section-label>
    <div class="group-list">
      <router-link v-if="!!parentNode" :to="`/groups${parentNode.path}`">
        <div class="group-item">
          <i class="mdi mdi-arrow-left-circle" />
          <div>返回</div>
          <el-image class="group-background" fit="cover" lazy>
            <template #error>
              <div class="failed-slot" />
            </template>
          </el-image>
        </div>
      </router-link>
      <group-item
        v-for="group in currentNode.children"
        :key="group.path"
        :group="group"
      />
    </div>
    <section-label>分组文章({{ pages.length }})</section-label>
    <div class="post-list">
      <post-item v-for="page in pages" :key="page.key" :post="page" />
      <div v-if="!pages.length">分组下没有文章哦</div>
    </div>
  </main-page>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import MainPage from "../components/main-page.vue";
import { posts, groupTree, groupNodes } from "../composables/posts";
import PostItem from "../components/post-item.vue";
import GroupItem from "../components/group-item.vue";
import SectionLabel from "../components/section-label.vue";

const router = useRouter();

const cover = computed(() => "https://picsum.photos/seed/group-page/1920/1080");

const groupPath = computed(
  () => (router.currentRoute.value.params.path as string) || "/"
);
const currentNode = computed(
  () => groupNodes.find((node) => node.path === groupPath.value) ?? groupTree
);
const currentData = computed(() => groups[currentNode.value.path]);

const title = computed(
  () =>
    groupPath.value
      .split("/")
      .filter((path) => !!path)
      .pop() ||
    router.currentRoute.value.meta.title ||
    "GROUPS"
);
const subtitle = computed(
  () =>
    currentData.value?.description ||
    router.currentRoute.value.meta.subtitle ||
    "Rage, rage against the dying of the light."
);

const pages = computed(() =>
  currentNode.value.posts.map((key) => posts.value[key])
);
const parentNode = computed(() => {
  if (groupPath.value === "/") {
    return null;
  } else {
    const pathList = groupPath.value.split("/").filter((path) => !!path);
    pathList.pop();
    pathList.push("");
    const target = `/${pathList.join("/")}`;
    return target === "/"
      ? groupTree
      : groupNodes.find((node) => node.path === target);
  }
});
</script>

<style lang="postcss" scoped>
.header-panel {
  @apply relative z-10;
  @apply h-48;
  @apply flex flex-col justify-center items-center;
  @apply text-white text-6xl font-extralight;
  @apply drop-shadow;

  .title {
    @apply tracking-widest;
  }

  .divider {
    @apply w-full border rounded my-2;
  }

  .subtitle {
    @apply text-xl;
  }
}

.group-list {
  @apply flex flex-row flex-wrap gap-8 pt-4 py-24;
}

.post-list {
  @apply bg-white;
  @apply flex flex-col items-center pt-8 py-24 gap-24;

  .post-list-enter-from,
  .post-list-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }

  .post-list-leave-active {
    position: absolute;
  }
}

.group-item {
  @apply flex flex-col justify-center items-center;
  @apply w-56 h-48;
  @apply rounded-lg;
  @apply overflow-hidden;
  @apply hover:shadow-lg;
  @apply select-none cursor-pointer;
  @apply relative;

  & > .mdi {
    @apply text-6xl mt-4;
  }
  /* &:hover > .mdi {
    @apply text-8xl;
  } */
  & > .mdi + div {
    @apply text-2xl;
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
