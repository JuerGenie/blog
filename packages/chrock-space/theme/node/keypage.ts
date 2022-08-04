import { PageFrontmatter } from "vuepress";

export const keypages: [string, PageFrontmatter][] = [
  [
    "/",
    {
      title: "Home",
      // layout: "HomeLayout",
    },
  ],
  [
    "/404.html",
    {
      title: "NotFound",
    },
  ],
  [
    "/groups/",
    {
      title: "Groups",
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
      title: "Tags",
      routeMeta: {
        type: "tags",
        title: "TAGS",
        subtitle: "# MOE~MOE~CHU~❤️",
      },
    },
  ],
];

export const keypagesMap = Object.fromEntries(keypages);
