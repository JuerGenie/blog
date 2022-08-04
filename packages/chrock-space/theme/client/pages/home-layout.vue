<template>

</template>

<script lang="ts" setup>
import AuthorCard from "../components/author-card.vue";
import PostItem from "../components/post-item.vue";
import { useLocalStorage } from "@vueuse/core";
import { nanoid } from "nanoid";
import { pagesData } from "../composables/posts";
import { PostData } from "../../shared/models/groups";
import { dateFormatter } from "../utils/formatters";
import SectionLabel from "../components/section-label.vue";

const seed = useLocalStorage("picsum.photo.key", "yuwYfO39zMVP");
function refreshBackground() {
  seed.value = nanoid(12);
}

const pages = Object.values(pagesData);
const dateGroups = Object.entries(
  pages.reduce((groups, page) => {
    const date = dateFormatter(page.git.updatedTime ?? page.git.createdTime);
    (groups[date] ??= []).push(page);
    return groups;
  }, {} as Record<string, PostData[]>)
);

const specialThanks = [
  "picsum.photos",
  "vue.js 3.0",
  "element-plus",
  "vueuse",
  "vuepress",
  "💎Krystal💎",
  "🍉阿尼亚·福杰🍉",
];
</script>

<style lang="postcss" scoped>

</style>