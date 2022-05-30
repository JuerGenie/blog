declare interface ChrockPostData {
  frontmatter: {
    subtitle?: string;

    cover?: string;

    description?: string;

    group?: string;
    tags?: string[];

    hideLicenses?: boolean;
    hideGiscus?: boolean;

    nextPage?: string;
    prePage?: string;
  };
}
