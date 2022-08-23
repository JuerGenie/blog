import { AstroIntegration } from "astro";
import eachVariables from "postcss-each-variables";
import each from "postcss-each";
import env from "postcss-preset-env";
import nesting from "tailwindcss/nesting";

export function postcssPatch(): AstroIntegration {
  return {
    name: "postcss-patch",
    hooks: {
      "astro:config:setup": async ({ config }) => {
        config.style.postcss.plugins.unshift(
          eachVariables,
          each,
          env({
            features: {
              "nesting-rules": false,
            },
          }),
          nesting
        );
      },
    },
  };
}

export default postcssPatch;
