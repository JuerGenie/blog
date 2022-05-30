import { PageData, PageFrontmatter } from "vuepress";

export interface Group extends PageData {
  children: Group[];

  pages: PageData[];
}

export interface GroupFrontmatter extends PageFrontmatter {
  type: "group";
  cover?: string;
  description?: string;
}
