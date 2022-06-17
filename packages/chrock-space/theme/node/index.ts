import { shikiPlugin } from "@vuepress/plugin-shiki";
import { gitPlugin } from "@vuepress/plugin-git";
import { tocPlugin } from "@vuepress/plugin-toc";
import { searchPlugin } from "@vuepress/plugin-search";
import { activeHeaderLinksPlugin } from "@vuepress/plugin-active-header-links";

import { merge } from "lodash";
import path from "path";
import { createPage, Page, PageFrontmatter, type Theme } from "vuepress";
import { UserConfigExport } from "vite";

// @ts-ignore
import customSelectors from "postcss-custom-selectors";
import tailwindcss from "tailwindcss";
import tailwindcssNesting from "tailwindcss/nesting";
import autoprefixer from "autoprefixer";

import { keypages, keypagesMap } from "./keypage";
import { tipsContainerPlugin } from "./containers/tips";
import { imageContainerPlugin } from "./containers/image";
import { nanoid } from "nanoid";
import { GroupFrontmatter } from "../shared/models/groups";

export const chrockTheme = ((app) => {
  let groupPages: Page[] = [];

  return {
    name: "vuepress-theme-chrock",

    templateDev: path.resolve(__dirname, "../template.dev.html"),
    templateBuild: path.resolve(__dirname, "../template.build.html"),

    layouts: {
      Layout: path.resolve(__dirname, "../client/layouts/main-layout.vue"),
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
        isSearchable: (page) =>
          !["/", "/groups/", "/tags/"].includes(page.path),
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

    // extendsPageOptions(page) {
    //   if (keypagesMap[page.path!]) {
    //     page.frontmatter = merge(
    //       {},
    //       page.frontmatter ?? {},
    //       keypagesMap[page.path!]
    //     );
    //   }
    // },

    async onInitialized(app) {
      app.pages = app.pages.filter((page) => {
        if (page.frontmatter.group) {
          groupPages.push(page);
          return false;
        } else {
          return true;
        }
      });
    },

    define: () => ({
      __BLOG_VERSION__:
        process.env.NODE_ENV === "development" ? "DEVELOPMENT" : nanoid(),
      groups: Object.fromEntries(
        groupPages.map((page) => [page.path, page.frontmatter])
      ),
    }),
  };
}) as Theme;

declare global {
  var __BLOG_VERSION__: string;

  var groups: Record<string, PageFrontmatter<GroupFrontmatter>>;
}
