import { defineClientAppEnhance, Vuepress } from "@vuepress/client";
// import "vue-global-api";
import ElementPlus from "element-plus";
import "./styles/index.css";
import "@mdi/font/css/materialdesignicons.css";
import "element-plus/theme-chalk/index.css";

import { type defineComponent, type App } from "vue";

function registerComponentObject(
  app: App,
  obj: Record<string, ReturnType<typeof defineComponent>>
) {
  Object.entries(obj).forEach(([key, component]) => {
    app.component(key, component);
  });
}

export default defineClientAppEnhance(({ app }) => {
  app.use(ElementPlus);
});
