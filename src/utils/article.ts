import { ArticleData } from "@src/models/article-frontmatter";

export function safeFilter(articles: ArticleData[]) {
  return import.meta.env.BUILD_MODE === "production"
    ? articles.filter((article) => !article.frontmatter.draft)
    : articles;
}
