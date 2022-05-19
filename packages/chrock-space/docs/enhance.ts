import { defineClientAppEnhance } from "@vuepress/client";
import { useAuthorData } from "../theme/client/compositablies/author-data";
import avatar from "./assets/juergenie.jpeg";

export default defineClientAppEnhance(({}) => {
  const authorData = useAuthorData();
  authorData.value = {
    name: "JuerGenie",
    email: "juergenie@qq.com",
    description: "一个普通的全栈搬砖工，偏爱typescript。",
    avatar,

    skills: [
      "前端开发",
      "后端开发",
      "vue.js",
      "react",
      "electron",
      "UI",
      "福瑞控",
      "漫画",
      "厕纸作者",
    ],
    links: [
      {
        name: "邮箱",
        icon: "mdi mdi-email",
        href: "mailto://juergenie@qq.com",
      },
      {
        name: "GITHUB",
        icon: "mdi mdi-github",
        href: "https://github.com/juergenie",
      },
    ],
  };
});
