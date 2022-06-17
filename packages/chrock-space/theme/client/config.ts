import { defineClientConfig } from "@vuepress/client";
import ElementPlus from "element-plus";

import "./styles/tailwindcss.css";
import "./styles/index.css";
import "@mdi/font/css/materialdesignicons.css";
import "element-plus/theme-chalk/index.css";

import { initialize as initializeRouterUtils } from "./utils/router";
import { initialize as initializePosts } from "./composables/posts";
import Containers from "./components/containers";
import { RouteLocationNormalized } from "vue-router";

import SiteHeaderBar from "./components/root/header-bar.vue";
import SiteCopyright from "./components/root/site-copyright.vue";

import HomeLayout from "./pages/home-layout.vue";
import GroupLayout from "./pages/group-layout.vue";
import TagsLayout from "./pages/tags-layout.vue";

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
  rootComponents: [SiteHeaderBar, SiteCopyright],

  enhance: async ({ app, router, siteData }) => {
    app.use(ElementPlus).use(Containers);

    router.addRoute({
      name: "HomePage",
      path: "/",
      component: HomeLayout,
    });
    router.addRoute({
      name: "GroupPage",
      path: "/groups:path(.*)?",
      component: GroupLayout,
    });
    router.addRoute({
      name: "TagsPage",
      path: "/tags/",
      component: TagsLayout,
    });

    await initializePosts({ app, router, siteData });
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
