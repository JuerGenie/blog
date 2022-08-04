import { shikiPlugin } from "@vuepress/plugin-shiki";
import { gitPlugin } from "@vuepress/plugin-git";
import { tocPlugin } from "@vuepress/plugin-toc";
import { searchPlugin } from "@vuepress/plugin-search";
import { activeHeaderLinksPlugin } from "@vuepress/plugin-active-header-links";

import { merge } from "lodash";
import path from "node:path";
import { type Theme } from "vuepress";
import { UserConfigExport } from "vite";

import unocss from "unocss/vite";
import eachVariables from "postcss-each-variables";
import each from "postcss-each";
import autoprefixer from "autoprefixer";
import presetEnv from "postcss-preset-env";

import { tipsContainerPlugin } from "./plugins/containers/tips";
import { imageContainerPlugin } from "./plugins/containers/image";
import { nanoid } from "nanoid";
import { groupsPlugin } from "./plugins/groups";

export const chrockTheme = ((app) => {
  return {
    name: "vuepress-theme-chrock",

    templateDev: path.resolve(__dirname, "../template.dev.html"),
    templateBuild: path.resolve(__dirname, "../template.build.html"),

    layouts: {
      Layout: path.resolve(__dirname, "../client/layouts/default-layout.vue"),
      404: path.resolve(__dirname, "../client/layouts/404.vue"),
    },

    alias: {
      "chrock/search-bar.vue": path.resolve(
        __dirname,
        "../client/components/search-bar.vue"
      ),
      "chrock/post-list.vue": path.resolve(
        __dirname,
        "../client/components/post-list.vue"
      ),
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
          ...((page.frontmatter.subtitle
            ? [page.frontmatter.subtitle]
            : []) as string[]),
        ],
      }),
      tipsContainerPlugin(),
      imageContainerPlugin(),
      groupsPlugin(),
    ],

    clientConfigFile: path.resolve(__dirname, "../client/config.ts"),

    extendsBundlerOptions(options) {
      merge(options, {
        viteOptions: {
          plugins: [unocss()],

          css: {
            postcss: {
              plugins: [
                eachVariables(),
                each(),
                presetEnv({
                  features: {
                    "nesting-rules": true,
                  },
                }),
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
    },

    extendsPage(page) {
      page.routeMeta.frontmatter = page.frontmatter;
    },

    define: () => ({
      __BLOG_VERSION__:
        process.env.NODE_ENV === "development" ? "DEVELOPMENT" : nanoid(),
    }),
  };
}) as Theme;

declare global {
  var __BLOG_VERSION__: string;
}
