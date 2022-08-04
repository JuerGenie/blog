import { usePagesData } from "@vuepress/client";
import { PostData } from "../../shared/models/groups";

const entries = (await Promise.all(
  Object.entries(usePagesData().value).map(async ([key, imp]) => [
    key,
    await imp!(),
  ])
)) as [string, PostData][];
export const pagesData = Object.fromEntries(
  entries.filter(
    ([_, page]) => !page.frontmatter.group && page.path !== "/404.html"
  )
) as Record<string, PostData>;

export const tags = Object.entries(pagesData).reduce((total, [_, page]) => {
  for (const tag of page.frontmatter.tags ?? []) {
    (total[tag] ??= []).push(page);
  }

  return total;
}, {} as Record<string, PostData[]>);
