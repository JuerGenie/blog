import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {
    postcss: {
      plugins: [
        require("postcss-mixins"),
        require("postcss-simple-vars"),
        require("tailwindcss/nesting"),
        require("tailwindcss"),
        require("autoprefixer"),
      ],
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "lib/main.ts"),
      name: "chrock-components",
      fileName: (format) => `chrock-components.${format}.js`,
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
        exports: "named",
      },
    },
  },
});
