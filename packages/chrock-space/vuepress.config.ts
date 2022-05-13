import { chrockTheme } from "./theme/node";
import { defineUserConfig } from "vuepress";

export default defineUserConfig({
  title: "克罗克",
  // theme: () => ({
  //   name: "vuepress-theme-chrock",
  //   extends: require("@vuepress/theme-default"),
  // }),
  theme: chrockTheme,
});
