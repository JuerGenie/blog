import { shikiPlugin } from "@vuepress/plugin-shiki";
import { gitPlugin } from "@vuepress/plugin-git";
import { tocPlugin } from "@vuepress/plugin-toc";
import { searchPlugin } from "@vuepress/plugin-search";
import { activeHeaderLinksPlugin } from "@vuepress/plugin-active-header-links";
import { containerPlugin } from "@vuepress/plugin-container";
// import { defaultTheme } from "@vuepress/theme-default";
import { merge } from "lodash";
import path from "path";
import { createPage, PageFrontmatter, type Theme } from "vuepress";
import { UserConfigExport } from "vite";

// import WindiCSS from "vite-plugin-windicss";
// @ts-ignore
import customSelectors from "postcss-custom-selectors";
import tailwindcss from "tailwindcss";
import tailwindcssNesting from "tailwindcss/nesting";
import autoprefixer from "autoprefixer";

import { keypages, keypagesMap } from "./keypage";
import Token from "markdown-it/lib/token";
import { tipsContainerPlugin } from "./containers/tips";
import { imageContainerPlugin } from "./containers/image";

export const chrockTheme = (() => ({
  name: "vuepress-theme-chrock",
  // extends: defaultTheme(),
  layouts: {
    Layout: path.resolve(__dirname, "../client/layouts/main-layout.vue"),
    HomeLayout: path.resolve(__dirname, "../client/layouts/home-layout.vue"),
    SearchableLayout: path.resolve(
      __dirname,
      "../client/layouts/searchable-layout.vue"
    ),

    404: path.resolve(__dirname, "../client/layouts/404.vue"),
  },

  plugins: [
    shikiPlugin({
      // theme: "material-ocean",
      theme: "css-variables",
    }),
    gitPlugin({
      createdTime: true,
      updatedTime: true,
    }),
    tocPlugin(),
    activeHeaderLinksPlugin({
      headerLinkSelector: "a.vuepress-toc-link",
      delay: 0,
    }),
    searchPlugin({
      maxSuggestions: 10,
      getExtraFields: (page) => [
        ...((page.frontmatter.tags ?? []) as string[]),
        ...((page.frontmatter.group
          ? [page.frontmatter.group]
          : []) as string[]),
        ...((page.frontmatter.subtitle
          ? [page.frontmatter.subtitle]
          : []) as string[]),
      ],
      isSearchable: (page) => !["/", "/groups/", "/tags/"].includes(page.path),
    }),
    tipsContainerPlugin(),
    imageContainerPlugin(),
  ],

  clientConfigFile: path.resolve(__dirname, "../client/config.ts"),

  extendsBundlerOptions(options) {
    merge(options, {
      viteOptions: {
        css: {
          postcss: {
            plugins: [
              tailwindcssNesting(),
              tailwindcss(),
              customSelectors(),
              autoprefixer(),
            ],
          },
        },
      } as UserConfigExport,
    });
  },

  extendsMarkdown(instance) {
    instance
      .use(require("markdown-it-sub"))
      .use(require("markdown-it-sup"))
      .use(require("markdown-it-footnote"))
      .use(require("markdown-it-ruby"))
      .use(require("markdown-it-attrs"), {
        leftDelimiter: "{{",
        rightDelimiter: "}}",
      });

    // const { image } = instance.renderer.rules;
    // instance.renderer.rules.image = (token, idx, options, env, self) => {
    //   const target = token[idx];
    //   // if (target.tag === "img") {
    //   //   target.tag = "el-image";
    //   // }
    //   const source = `new URL(import.meta.url, ${target.attrGet("src")}).href`;
    //   const result = image!(token, idx, options, env, self);
    //   return (
    //     result
    //       .substring(0, result.length - 1)
    //       .replace(/src="([^"]+)"/, `:src="${source}"`) + " />"
    //   );
    //   // console.log("result", result);
    //   // return result;
    // };
  },

  extendsPageOptions(page) {
    if (keypagesMap[page.path!]) {
      page.frontmatter = merge(
        {},
        page.frontmatter ?? {},
        keypagesMap[page.path!]
      );
    }
  },

  async onInitialized(app) {
    for (const [path] of keypages) {
      await getOrCreatePage(path);
    }

    async function getOrCreatePage(path: string) {
      let result = app.pages.find((page) => page.path === path);
      if (!result) {
        result = await createPage(app, {
          path,
          content: "Auto created by theme `vuepress-theme-chrock`.",
        });
        app.pages.push(result);
      }
      return result;
    }
  },

  define: () => ({}),
})) as Theme;
