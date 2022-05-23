import { shikiPlugin } from "@vuepress/plugin-shiki"
import { gitPlugin } from "@vuepress/plugin-git"
import { tocPlugin } from "@vuepress/plugin-toc"
import { searchPlugin } from "@vuepress/plugin-search"
import { activeHeaderLinksPlugin } from "@vuepress/plugin-active-header-links"
// import { defaultTheme } from "@vuepress/theme-default";
import { merge } from "lodash"
import path from "path"
import { createPage, PageFrontmatter, type Theme } from "vuepress"
import { UserConfigExport } from "vite"

// import WindiCSS from "vite-plugin-windicss";
import tailwindcss from "tailwindcss"
import tailwindcssNesting from "tailwindcss/nesting"
import autoprefixer from "autoprefixer"

import { keypages, keypagesMap } from "./keypage"

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
      theme: "material-ocean",
    }),
    gitPlugin({
      createdTime: true,
      updatedTime: true,
    }),
    tocPlugin(),
    activeHeaderLinksPlugin({
      headerLinkSelector: "a.vuepress-toc-link",
      delay: 200,
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
  ],

  clientConfigFile: path.resolve(__dirname, "../client/config.ts"),

  extendsBundlerOptions(options) {
    merge(options, {
      viteOptions: {
        css: {
          postcss: {
            plugins: [tailwindcssNesting(), tailwindcss(), autoprefixer()],
          },
        },
      } as UserConfigExport,
    })
  },

  extendsMarkdown(instance) {
    instance
      .use(require("markdown-it-sub"))
      .use(require("markdown-it-sup"))
      .use(require("markdown-it-footnote"))
  },

  extendsPageOptions(page) {
    if (keypagesMap[page.path!]) {
      page.frontmatter = merge(
        {},
        page.frontmatter ?? {},
        keypagesMap[page.path!]
      )
    }
  },

  async onInitialized(app) {
    for (const [path] of keypages) {
      await getOrCreatePage(path)
    }

    async function getOrCreatePage(path: string) {
      let result = app.pages.find((page) => page.path === path)
      if (!result) {
        result = await createPage(app, {
          path,
          content: "Auto created by theme `vuepress-theme-chrock`.",
        })
        app.pages.push(result)
      }
      return result
    }
  },
})) as Theme
