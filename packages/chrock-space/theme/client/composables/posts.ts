import { PageFrontmatter, usePagesData } from "@vuepress/client";
import { ClientConfig, PageData } from "@vuepress/client";
import { GitPluginPageData } from "@vuepress/plugin-git";
import { computed, Ref, ref } from "vue";
import { Router } from "vue-router";
import { GroupFrontmatter } from "../../shared/models/groups";

export type Key = PageData["key"];
export type Post = PageData<ChrockPostData & GitPluginPageData>;
export interface Group extends Omit<GroupFrontmatter, "group"> {
  path: string;
  children: Group[];
  posts: Key[];
}
type PathTreeNode = {
  name: string;
  key?: Key;
  children?: PathTreeNode[];
};

export const groups: Record<
  string,
  PageFrontmatter<GroupFrontmatter>
> = __GROUPS_DATA__;

export const posts: Ref<Record<Key, Post>> = ref({});
export const postList = computed(() =>
  Object.entries(posts.value).map(([_, post]) => post)
);

export const tags = computed(() => {
  const result: Record<string, Post[]> = {};
  postList.value.forEach((post) =>
    (post.frontmatter.tags ?? []).forEach((tag) =>
      (result[tag] ??= []).push(post)
    )
  );
  return result;
});
export const tagList = computed(() => Object.keys(tags.value));

export const groupTree: Group = {
  title: "ROOT",
  path: "/",
  children: [],
  posts: [],
};

export const groupNodes: Group[] = [groupTree];

export const initialize = (async ({ router }) => {
  const pagesData = Object.fromEntries(
    await Promise.all(
      Object.entries(usePagesData().value)
        .filter(([_, imp]) => !!imp)
        .map(async ([key, imp]) => [key, await imp!()])
    )
  ) as Record<
    Key,
    PageData<ChrockPostData & ChrockGroupData & GitPluginPageData>
  >;

  posts.value = Object.fromEntries(
    Object.entries(pagesData).filter(
      ([_, page]) => !page.frontmatter.group && page.path !== "/404.html"
    )
  );

  const pageTree: PathTreeNode[] = [];

  (Object.entries(posts.value) as [string, Post][]).forEach(
    ([_, page], __, pages) => {
      const pathlist = page.path.split("/").filter((p) => !!p);
      let currentTree = pageTree;
      pathlist.forEach((child, index) => {
        let node = currentTree.find((tree) => tree.name === child);
        if (!node) {
          currentTree.push(
            (node = {
              name: child,
              children: [],
            })
          );
        }
        if (node.name.endsWith(".html")) {
          delete node.children;
          node.key = page.key;
        } else {
          currentTree = node.children!;
        }
      });
    }
  );

  await groupTreeNode({
    router,
    nodes: pageTree,
    parent: groupTree,
  });
}) as NonNullable<ClientConfig["enhance"]>;

async function groupTreeNode({
  nodes,
  parent,
  router,
}: {
  router: Router;
  nodes: PathTreeNode[];
  parent: Group;
}) {
  for (const node of nodes) {
    let targetPath = `${parent.path || "/"}${node.name}`;
    const isPage = !!node.key && node.name.endsWith(".html");
    if (!isPage) {
      targetPath += "/";
      groups[targetPath] ??= {
        title: node.name,
        group: true,
      };

      const currentGroup = {
        path: targetPath,
        children: [],
        posts: [],
      } as Group;
      parent.children.push(currentGroup);
      groupNodes.push(currentGroup);
      if (node.children) {
        groupTreeNode({
          router,
          nodes: node.children,
          parent: currentGroup,
        });
      }
    } else {
      parent.posts.push(node.key!);
    }
  }
}
