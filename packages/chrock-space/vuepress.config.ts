import { chrockTheme } from "./theme/node";
import { defineUserConfig } from "vuepress";
import path from "path";

export default defineUserConfig({
  title: "克罗克",
  theme: chrockTheme,

  locales: {
    "/": {
      lang: "zh-CN",
      title: "克罗克",
      description: "@JUERGENIE的个人博客。",
    },
  },

  clientConfigFile: path.resolve(__dirname, "./docs/enhance.ts"),
});
