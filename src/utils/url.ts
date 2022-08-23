export function resolveFromBase(base: URL, target: string): URL {
  const baseUrl = new URL(base);
  baseUrl.pathname = "/blog/";
  return new URL(target, baseUrl);
}

export function getDepth(url: string): number {
  return url.split("/").length - 2;
}

export function getArticleParentPath(url: string): string[] {
  const temp = url
    .replace(import.meta.env.BASE_URL, "")
    .split("/")
    .filter((p) => !!p);
  return temp.slice(temp.indexOf("articles"), -1);
}
