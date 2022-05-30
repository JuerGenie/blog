<template>
  <main-container>
    <main-page cover="https://picsum.photos/seed/group-page/1920/1080">
      <template #header>
        <div class="header-panel">
          <div class="title">
            {{ currentSearchType.title }}
          </div>
          <div class="divider" />
          <div class="subtitle">{{ currentSearchType.subtitle }}</div>
        </div>
      </template>

      <div class="conditions">
        <el-badge
          v-for="condition in conditions.list"
          :key="condition"
          :value="conditions.map[condition].length"
          type="info"
        >
          <el-check-tag
            :checked="checkedConditions.includes(condition)"
            @change="toggleCondition(condition)"
          >
            {{ condition }}
          </el-check-tag>
        </el-badge>
      </div>

      <div class="post-list">
        <transition-group name="post-list">
          <post-item
            v-for="post in renderedPosts"
            :key="post.key"
            :post="post"
          />
        </transition-group>
        <div v-if="!filteredPosts.length" class="text-slate-500">
          没有相关记录哦——
        </div>
        <div v-else-if="filteredPosts.length > 10" class="w-full text-center">
          <el-button @click="showAll = !showAll">
            {{ showAll ? "收起部分" : "显示全部" }}
          </el-button>
        </div>
      </div>
    </main-page>
  </main-container>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import MainContainer from "../components/main-container.vue";
import MainPage from "../components/main-page.vue";
import {
  groups,
  groupMap,
  tags,
  tagMap,
  posts,
  Post,
} from "../composables/posts";
import PostItem from "../components/post-item.vue";

type SearchType = "groups" | "tags";

const router = useRouter();
const currentSearchType = computed(() => {
  const { type, title, subtitle } = router.currentRoute.value.meta;
  return {
    type: (type as SearchType) || "groups",
    title: (title as string) || "MISSING.NO",
    subtitle: (subtitle as string) || "",
  };
});

const conditionsMap = computed(() => ({
  groups: {
    list: groups.value,
    map: groupMap.value,
  },
  tags: {
    list: tags.value,
    map: tagMap.value,
  },
}));
const conditions = computed(
  () => conditionsMap.value[currentSearchType.value.type] ?? []
);

const checkedConditions = computed(() => {
  let search = router.currentRoute.value.query.search ?? [];
  if (!Array.isArray(search)) {
    search = [search];
  }
  return search as string[];
});
function toggleCondition(condition: string) {
  const index = checkedConditions.value.indexOf(condition);
  let newConditions = [...checkedConditions.value];
  if (index !== -1) {
    newConditions.splice(index, 1);
  } else {
    newConditions.push(condition);
  }
  router.push({
    path: router.currentRoute.value.path,
    query: {
      search: newConditions,
    },
  });
}

const showAll = ref(false);
const filterFn = computed(() =>
  currentSearchType.value.type === "groups"
    ? (post: Post) =>
        !!post.frontmatter.group &&
        checkedConditions.value.includes(post.frontmatter.group)
    : (post: Post) => {
        const tags = post.frontmatter.tags ?? [];
        return (
          !!tags.length &&
          !!checkedConditions.value.length &&
          !checkedConditions.value.find(
            (condition) => !tags.includes(condition)
          )
        );
      }
);
const filteredPosts = computed(() => posts.value.filter(filterFn.value));
const renderedPosts = computed(() =>
  filteredPosts.value.slice(0, showAll.value ? undefined : 10)
);
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
    @apply w-full border rounded;
  }

  .subtitle {
    @apply text-xl;
  }
}

.conditions {
  @apply flex flex-row flex-wrap gap-4 items-center justify-center;
}

.post-list {
  @apply bg-white;
  @apply flex flex-col items-center py-24 gap-24;

  .post-list-enter-from,
  .post-list-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }

  .post-list-leave-active {
    position: absolute;
  }
}
</style>
