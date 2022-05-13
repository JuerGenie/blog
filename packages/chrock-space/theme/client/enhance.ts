import { defineClientAppEnhance } from "@vuepress/client";
// import "vue-global-api";
import "./styles/index.css";
import "@mdi/font/css/materialdesignicons.css";

import { components } from "./components";
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
  registerComponentObject(app, components);
});
