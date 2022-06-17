import { GroupFrontmatter } from "./shared/models/groups";
import { PostFrontmatter } from "./shared/models/posts";

declare global {
  interface ChrockPostData {
    frontmatter: PostFrontmatter;
  }

  declare interface ChrockGroupData {
    frontmatter: GroupFrontmatter;
  }
}
