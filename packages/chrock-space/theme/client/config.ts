import { defineClientConfig } from "@vuepress/client";
// import "vue-global-api";
import ElementPlus from "element-plus";
import "./styles/index.css";
import "@mdi/font/css/materialdesignicons.css";
import "element-plus/theme-chalk/index.css";

import { type defineComponent, type App } from "vue";
import { initialize as initializeRouterUtils } from "./utils/router";

function registerComponentObject(
  app: App,
  obj: Record<string, ReturnType<typeof defineComponent>>
) {
  Object.entries(obj).forEach(([key, component]) => {
    app.component(key, component);
  });
}

export default defineClientConfig({
  enhance: ({ app, router }) => {
    app.use(ElementPlus);

    initializeRouterUtils(router);
  },
});
