import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import eslint from "vite-plugin-eslint";
import unocss from "unocss/vite";
import { resolve } from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    eslint({
      include: ["src/**/*.{vue,js,ts}"],
      exclude: ["node_modules"],
    }),
    unocss(),
  ],
  build: {
    sourcemap: true,
    assetsInlineLimit: 4096,
    minify: false,
    lib: {
      name: "ChrockUI",
      entry: resolve(__dirname, "./src/index.ts"),
    },
  },
});
