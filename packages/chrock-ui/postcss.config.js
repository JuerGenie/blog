import eachVariables from "postcss-each-variables";
import each from "postcss-each";
import autoprefixer from "autoprefixer";
import presetEnv from "postcss-preset-env";

const config = {
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
};

export default config;
