import { shikiPlugin } from "@vuepress/plugin-shiki";
import { gitPlugin } from "@vuepress/plugin-git";
// import { defaultTheme } from "@vuepress/theme-default";
import { merge } from "lodash";
import path from "path";
import { type Theme } from "vuepress";
import { UserConfigExport } from "vite";

import tailwindcssNesting from "tailwindcss/nesting";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

export const chrockTheme = (() => ({
  name: "vuepress-theme-chrock",
  // extends: defaultTheme(),
  layouts: {
    Layout: path.resolve(__dirname, "../client/layouts/main-layout.vue"),
  },

  plugins: [
    shikiPlugin({
      theme: "material-ocean",
    }),
    gitPlugin({
      createdTime: true,
      updatedTime: true,
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
})) as Theme;
