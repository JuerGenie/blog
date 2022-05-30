import { defineClientConfig } from "@vuepress/client";
// import "vue-global-api";
import ElementPlus from "element-plus";

import "./styles/tailwindcss.css";
import "./styles/index.css";
import "@mdi/font/css/materialdesignicons.css";
import "element-plus/theme-chalk/index.css";

import { type defineComponent, type App, watch } from "vue";
import { initialize as initializeRouterUtils } from "./utils/router";
import Containers from "./components/containers";
import { RouteLocationNormalized } from "vue-router";

function registerComponentObject(
  app: App,
  obj: Record<string, ReturnType<typeof defineComponent>>
) {
  Object.entries(obj).forEach(([key, component]) => {
    app.component(key, component);
  });
}

function wrapImg() {
  const ellist = document.querySelectorAll<HTMLImageElement>(".content img");
  // console.log("found ellist", ellist);
  ellist.forEach((img) => {
    if (!img.parentElement?.classList.contains("img-wrapper")) {
      const target = document.createElement("div");
      target.classList.add("img-wrapper");
      target.append(
        (() => {
          const altEl = document.createElement("div");
          altEl.classList.add("img-alt");
          altEl.innerText = img.alt;
          return altEl;
        })()
      );
      img.replaceWith(target);
      target.prepend(img);
    }
  });
}

function scrollToAnchor(to: RouteLocationNormalized) {
  const target = document.querySelector<HTMLAnchorElement>(to.hash);
  if (target) {
    window.scroll({
      behavior: "smooth",
      top: target.getBoundingClientRect().top - 16,
    });
  }
}

export default defineClientConfig({
  enhance: ({ app, router }) => {
    app.use(ElementPlus).use(Containers);

    initializeRouterUtils(router);
    router.afterEach((to, from) => {
      if (from.name !== to.name && to.hash) {
        setTimeout(() => {
          wrapImg();

          scrollToAnchor(to);
        }, 100);
      }
    });
  },
});
