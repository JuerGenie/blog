import { ArticleData } from "@models/article-frontmatter";

export function getTags(pages: ArticleData[]) {
  return pages.reduce((res, page) => {
    ((page.frontmatter.tags ?? []) as string[]).forEach((tag) => {
      res[tag] ??= [];
      res[tag].push(page);
    });
    return res;
  }, {} as Record<string, ArticleData[]>);
}
