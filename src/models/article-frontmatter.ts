import { MarkdownInstance } from "astro";

export interface ArticleFrontmatter extends Record<string, any> {
  layout: string;
  prune?: boolean;

  title: string;
  description: string;
  publishDate?: string;
  updatedDate?: string;
  coverImage?: string;
  tags?: string[];
  draft?: boolean;

  hideGiscus?: true;
  hideParent?: true;
  hideLicense?: true;

  file: string;
  url: string;
  astro: Record<string, any>;
}

export interface ArticleData extends MarkdownInstance<ArticleFrontmatter> {}
