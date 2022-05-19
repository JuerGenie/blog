import { PageData, usePagesData } from "@vuepress/client";
import { GitPluginPageData } from "@vuepress/plugin-git";

export type Post = PageData<GitPluginPageData & ChrockPostData>;

const metaPagesData = usePagesData();
const posts = (
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

const tags = posts.flatMap((page) => page.frontmatter.tags ?? []);
const tagMap = Object.fromEntries(
  tags.map((tag) => [
    tag,
    posts.filter((page) => (page.frontmatter.tags ?? []).includes(tag)),
  ])
);
const groups = posts
  .map((page) => page.frontmatter.group)
  .filter((group) => !!group);
const groupMap = Object.fromEntries(
  groups.map((group) => [
    group,
    posts.filter((page) => page.frontmatter.group === group),
  ])
);

export function usePosts() {
  return {
    posts,
    tags,
    getByTag(tag: string) {
      return tagMap[tag];
    },
    groups,
    getByGroup(group: string) {
      return groupMap[group];
    },
    search(target: string) {
      return posts.filter(({ frontmatter: { group, tags } }) => {
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
    },
  };
}
