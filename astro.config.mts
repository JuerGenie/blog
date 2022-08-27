import { defineConfig, getViteConfig } from "astro/config";
import image from "@astrojs/image";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import vue from "@astrojs/vue";

import tailwind from "@astrojs/tailwind";
import postcssPatch from "./plugins/postcss";

import remarkDirective from "remark-directive";
import { visit } from "unist-util-visit";
import { h } from "hastscript";

import { config } from "dotenv";
import compress from "astro-compress";

config();

// https://astro.build/config
export default defineConfig({
  integrations: [
    postcssPatch(),
    image(),
    mdx(),
    sitemap(),
    vue(),
    tailwind(),
    compress(),
  ],
  base: process.env.BASE_URL,
  site:
    process.env.BUILD_MODE === "production"
      ? "https://juergenie.github.io"
      : undefined,
  vite: {
    base: process.env.BASE_URL,
    ssr: {
      external: ["svgo"],
    },
  },
  markdown: {
    shikiConfig: {
      // theme: "css-variables",
      wrap: true,
    },
    remarkPlugins: [
      "remark-gfm",
      "remark-smartypants",
      remarkDirective,
      () => (root) => {
        visit(root, (node) => {
          if (
            node.type === "textDirective" ||
            node.type === "leafDirective" ||
            node.type === "containerDirective"
          ) {
            const data = (node.data ??= {});
            // let hast: ReturnType<typeof h>;
            // if (node.name === "tip") {
            //   const { type, ...attr } = node.attributes;
            //   hast = h(`div.${[node.name, type ?? "info"].join(".")}`, attr);
            // } else {
            //   hast = h(node.name, node.attributes);
            // }
            const hast = h(node.name, node.attributes);
            data.hName = hast.tagName;
            data.hProperties = hast.properties;
          }
        });
      },
    ],
  },
});
