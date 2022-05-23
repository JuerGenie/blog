/** @type { import("prettier").Config } */
const config = {
  ...require("prettier-config-vuepress"),
  singleQuote: false,
  semi: true,
}

module.exports = config
