import { GitPluginPageData } from "@vuepress/plugin-git";
import { Page, PageData, PageFrontmatter } from "vuepress";

export interface GroupFrontmatter extends PageFrontmatter {
  group: true;
  cover?: string;
  description?: string;
}

export type Key = Page["key"];
export type Post = Page<ChrockGroupData & ChrockPostData & GitPluginPageData>;
export type PostData = PageData<
  ChrockGroupData & ChrockPostData & GitPluginPageData
>;
export interface Group extends Omit<GroupFrontmatter, "group"> {
  path: string;
  children: Group[];
  posts: Key[];
}
