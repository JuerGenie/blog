export interface PostFrontmatter {
  subtitle?: string;

  cover?: string;

  tags?: string[];

  hideLicenses?: boolean;
  hideGiscus?: boolean;
  hideHeader?: boolean;
  hideToc?: boolean;

  nextPage?: string;
  prePage?: string;
}
