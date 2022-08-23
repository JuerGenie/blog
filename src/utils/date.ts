export function formatDate(time: string | number) {
  return new Date(time).toLocaleDateString("zh-cn", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
