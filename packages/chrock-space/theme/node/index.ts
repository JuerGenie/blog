import { shikiPlugin } from "@vuepress/plugin-shiki";
import { gitPlugin } from "@vuepress/plugin-git";
import { tocPlugin } from "@vuepress/plugin-toc";
import { searchPlugin } from "@vuepress/plugin-search";
// import { defaultTheme } from "@vuepress/theme-default";
import { merge } from "lodash";
import path from "path";
import { createPage, type Theme } from "vuepress";
import { UserConfigExport } from "vite";

// import WindiCSS from "vite-plugin-windicss";
import tailwindcss from "tailwindcss";
import tailwindcssNesting from "tailwindcss/nesting";
import autoprefixer from "autoprefixer";

export const chrockTheme = (() => ({
  name: "vuepress-theme-chrock",
  // extends: defaultTheme(),
  layouts: {
    Layout: path.resolve(__dirname, "../client/layouts/main-layout.vue"),
    HomeLayout: path.resolve(__dirname, "../client/layouts/home-layout.vue"),

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

  clientAppEnhanceFiles: [path.resolve(__dirname, "../client/enhance.ts")],
  extendsBundlerOptions(options) {
    merge(options, {
      viteOptions: {
        css: {
          postcss: {
            plugins: [tailwindcssNesting(), tailwindcss(), autoprefixer()],
          },
        },
      } as UserConfigExport,
    });
  },

  async onInitialized(app) {
    for (const page of [
      [
        "/",
        [
          "---",
          "layout: HomeLayout",
          "---",
          "## HELLO WORLD!",
          "",
          "Auto created by theme `vuepress-theme-chrock`.",
        ].join("\n"),
      ],
      [
        "/groups/",
        [
          "---",
          "layout: GroupsLayout",
          "---",
          "## HELLO WORLD!",
          "",
          "Auto created by theme `vuepress-theme-chrock`.",
        ].join("\n"),
      ],
      [
        "/tags/",
        [
          "---",
          "layout: TagsLayout",
          "---",
          "## HELLO WORLD!",
          "",
          "Auto created by theme `vuepress-theme-chrock`.",
        ].join("\n"),
      ],
    ] as [string, string][]) {
      await createPageIfNotExists(...page);
    }

    async function createPageIfNotExists(path: string, content: string) {
      if (!app.pages.find((page) => page.path === path)) {
        app.pages.push(
          await createPage(app, {
            path,
            content,
          })
        );
      }
    }
  },
})) as Theme;
