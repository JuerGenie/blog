import { PageData, PageFrontmatter } from "vuepress";

export interface GroupFrontmatter extends PageFrontmatter {
  group: true;
  cover?: string;
  description?: string;
}
