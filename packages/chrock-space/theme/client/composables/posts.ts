import { computed, reactive, Ref, ref } from "vue";
import { PageData, usePagesData } from "@vuepress/client";
import { GitPluginPageData } from "@vuepress/plugin-git";
import dayjs from "dayjs";

export type Post = PageData<GitPluginPageData & ChrockPostData>;

const metaPagesData = usePagesData();
export const posts: Ref<Post[]> = ref([]);
(async () => {
  posts.value = (
    (
      await Promise.all(
        Object.entries(metaPagesData.value)
          .filter(([_, cb]) => !!cb)
          .map(([_, cb]) => cb!())
      )
    ).filter((page) => !!page.title) as Post[]
  ).sort((a, b) =>
    (a.git.createdTime ?? 0) > (b.git.createdTime ?? 0) ? -1 : 1
  );

  console.log("initialized", posts.value);
})();

export const tags = computed(() =>
  posts.value.flatMap((page) => page.frontmatter.tags ?? [])
);
export const tagMap = computed<Record<string, Post[]>>(() =>
  Object.fromEntries(
    tags.value.map((tag) => [
      tag,
      posts.value.filter((page) => (page.frontmatter.tags ?? []).includes(tag)),
    ])
  )
);
export const groups = computed(() =>
  posts.value.map((page) => page.frontmatter.group).filter((group) => !!group)
);
export const groupMap = computed<Record<string, Post[]>>(() =>
  Object.fromEntries(
    groups.value.map((group) => [
      group,
      posts.value.filter((page) => page.frontmatter.group === group),
    ])
  )
);

export const dateMap = computed(() =>
  posts.value.reduce((total, post) => {
    const date = dayjs(post.git.createdTime ?? 0).format("YYYY/MM/DD");
    (total[date] ??= []).push(post);
    return total;
  }, {} as Record<string, Post[]>)
);

export function getByTag(tag: string): Post[] {
  return tagMap.value[tag];
}

export function getByGroup(group: string): Post[] {
  return groupMap.value[group];
}

export function getByDate(date: number): Post[] {
  return dateMap.value[dayjs(date).format("YYYY/MM/DD")] ?? [];
}

export function search(target: string): Post[] {
  return posts.value.filter(({ frontmatter: { group, tags } }) => {
    if (!target) {
      return true;
    } else if (group && group.includes(target)) {
      return true;
    } else {
      if (!tags || !tags.length) {
        tags = [""];
      }
      if (tags.includes(target)) {
        return true;
      }
    }
    return false;
  });
}

export function usePosts() {
  return {
    posts,
    tags,
    tagMap,
    groups,
    groupMap,
    dateMap,

    getByDate,
    getByGroup,
    getByTag,
    search,
  };
}
