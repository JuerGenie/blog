<template>
  <div class="left-nav">
    <div class="author-information group">
      <div class="author-cover">
        <img :src="authorData.avatar" />

        <div
          class="absolute inset-x-0 top-full group-hover:top-0 h-full bg-gradient-to-t from-black from-opacity-80 to-transparent p-4 flex flex-col gap-4 justify-end text-white"
        >
          <div class="text-xl">{{ authorData.name }}</div>
          <div class="text-sm">{{ authorData.description }}</div>
        </div>
      </div>
    </div>
    <splitter />
    <div class="group-list">
      <left-nav-item
        v-if="groupTree"
        class="w-full overflow-auto"
        :group="groupTree"
      />
    </div>
    <splitter />
    <div class="tag-list">
      <router-link
        v-for="[tag, { length }] in tagList.slice(0, 10)"
        :key="tag"
        class="tag"
        :to="{ path: '/', query: { tag } }"
      >
        {{ tag }}({{ length }})
      </router-link>
      <div v-if="tagList.length > 10" class="tag">•••</div>
    </div>
    <splitter />
    <div class="other-link">
      <a v-for="link in links" :href="link.to" target="_blank">
        <button class="link-btn">
          <i :class="['mdi', link.icon]" />
        </button>
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAuthorData } from "../composables/author-data";
import Splitter from "./splitter.vue";
import { groupTree, tags } from "../utils/router";
import LeftNavItem from "./left-nav-item.vue";
import { computed } from "vue";

const authorData = useAuthorData();

const links = [
  {
    icon: "mdi mdi-github",
    to: "https://github.com/juergenie",
  },
];

const tagList = computed(() =>
  Object.entries(tags.value).sort(([_l, lc], [_r, rc]) =>
    lc.length > rc.length
      ? -1
      : lc.length === rc.length
      ? _l.localeCompare(_r)
      : 1
  )
);
</script>

<style lang="postcss" scoped>
.left-nav {
  @apply flex flex-col;
  @apply bg-slate-100;

  & > .author-information {
    @apply p-8;

    & > .author-cover {
      @apply relative overflow-hidden;
      @apply rounded-lg;
    }
  }

  & > .group-list {
    @apply flex-1;
    @apply p-8 overflow-auto;
  }

  & > .tag-list {
    @apply flex flex-row flex-wrap justify-center gap-1 p-8;

    & > .tag {
      @apply text-xs px-2 py-1 rounded-full;
      @apply bg-primary-500 text-white;
    }
  }

  & > .other-link {
    @apply flex flex-row gap-2 flex-wrap justify-center;
    @apply px-8 py-2;

    & .link-btn {
      @apply p-2 rounded-lg;
      @apply bg-slate-200 bg-opacity-0 hover:bg-opacity-50 active:bg-opacity-100;

      & > .mdi {
        @apply w-8 h-8 inline-block;
        @apply flex justify-center items-center text-4xl text-primary-800;
      }
    }
  }
}
</style>
