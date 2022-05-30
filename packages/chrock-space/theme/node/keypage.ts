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
        title: "GROUPS",
        subtitle: "# ON THE WAY.",
      },
    },
  ],
  [
    "/tags/",
    {
      layout: "SearchableLayout",
      routeMeta: {
        type: "tags",
        title: "TAGS",
        subtitle: "# MOE~MOE~CHU~❤️",
      },
    },
  ],
];

export const keypagesMap = Object.fromEntries(keypages);
