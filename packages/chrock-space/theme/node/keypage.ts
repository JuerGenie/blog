import { PageFrontmatter } from "vuepress";

export const keypages: [string, PageFrontmatter][] = [
  [
    "/",
    {
      title: "Home",
      layout: "HomeLayout",
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
      layout: "GroupLayout",
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
