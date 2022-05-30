import { containerPlugin } from "@vuepress/plugin-container";

export function imageContainerPlugin() {
  return containerPlugin({
    type: "image",
    before: (info) => `<image-container ${info}>`,
    after: () => "</image-container>",
  });
}
