import { defineClientConfig } from "@vuepress/client";

import "@unocss/reset/tailwind.css";
import "uno.css";
import "./styles/index.css";
import "@mdi/font/css/materialdesignicons.css";

import { initialize as initializeRouterUtils } from "./utils/router";
import containers from "./components/containers";
import { RouteLocationNormalized } from "vue-router";

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
  enhance: async ({ app, router }) => {
    app.use(containers);

    initializeRouterUtils(router);
    router.afterEach((to, from) => {
      if (from.name !== to.name && to.hash) {
        setTimeout(() => {
          if (!__VUEPRESS_SSR__) {
            scrollToAnchor(to);
          }
        }, 500);
      }
    });
  },
});
