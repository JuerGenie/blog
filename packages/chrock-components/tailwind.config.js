const colors = require("tailwindcss/colors");

/**
 * @type { import("tailwindcss/tailwind-config").TailwindConfig }
 */
const config = {
  content: ["./{lib,src}/**/*.{html,vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: colors.teal,
        secondary: colors.slate,
      },
    },
  },
  plugins: [],
};

module.exports = config;
