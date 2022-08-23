import { ArticleData } from "@src/models/article-frontmatter";
import { formatDate } from "./date";

export function getTimes(articles: ArticleData[], length?: number) {
  articles = articles.sort((a, b) =>
    new Date(a.frontmatter.updatedDate ?? a.frontmatter.publishDate).valueOf() >
    new Date(b.frontmatter.updatedDate ?? b.frontmatter.publishDate).valueOf()
      ? -1
      : 1
  );
  if (typeof length === "number" && !isNaN(length)) {
    articles = articles.slice(0, length);
  }
  return articles.reduce((result, current) => {
    const target = (result[
      formatDate(
        current.frontmatter.updatedDate ?? current.frontmatter.publishDate
      )
    ] ??= []);
    target.push(current);
    return result;
  }, {} as Record<string, ArticleData[]>);
}
