import { AstroIntegration } from "astro";

export interface ChrockBlogConfig {
  base?: string;
}

export function postcssPatch({
  base,
}: ChrockBlogConfig = {}): AstroIntegration {
  return {
    name: "chrock-blog",
    hooks: {
      // "astro:config:setup": async ({ config }) => {
      //   if (base) {
      //     config.vite.base = config.base = base;
      //   } else {
      //     config.vite.base ??= config.base ?? "/";
      //   }
      // },
    },
  };
}

export default postcssPatch;
