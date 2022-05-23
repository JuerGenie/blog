import { PageFrontmatter } from "vuepress";

export const keypages: [string, PageFrontmatter][] = [
  [
    "/",
    {
      layout: "HomeLayout",
    },
  ],
  [
    "/groups/",
    {
      layout: "SearchableLayout",
      routeMeta: {
        type: "groups",
      },
    },
  ],
  [
    "/tags/",
    {
      layout: "SearchableLayout",
      routeMeta: {
        type: "tags",
      },
    },
  ],
];

export const keypagesMap = Object.fromEntries(keypages);
