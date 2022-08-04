import { chrockTheme } from "./theme/node";
import { defineUserConfig } from "vuepress";
import path from "path";

export default defineUserConfig({
  title: "克罗克",
  theme: chrockTheme,
  description: "@JUERGENIE的个人博客。",

  base: "/blog/",
  lang: "zh-CN",
  locales: {
    "/": {
      lang: "zh-CN",
    },
  },

  clientConfigFile: path.resolve(__dirname, "./docs/enhance.ts"),
});
