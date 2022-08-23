import { MarkdownInstance } from "astro";

export interface ArticleFrontmatter {
  layout: string;
  prune?: boolean;

  title: string;
  description: string;
  publishDate?: string;
  updatedDate?: string;
  coverImage?: string;
  tags?: string[];

  hideGiscus?: true;
  hideParent?: true;
  hideLicense?: true;

  file: string;
  url: string;
  astro: Record<string, any>;
}

export interface ArticleData extends MarkdownInstance<ArticleFrontmatter> {}
