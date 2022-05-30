import containerPlugin from "@vuepress/plugin-container";

export function tipsContainerPlugin() {
  return containerPlugin({
    type: "tips",
    before: (info) => `<div class="tips ${info}">`,
    after: (info) => `</div>`,
  });
}
