const colors = require("tailwindcss/colors");

/**
 * @type { import("tailwindcss/tailwind-config").TailwindConfig }
 */
const config = {
  content: [
    "./docs/**/*.{html,vue,js,ts,jsx,tsx,md}",
    "./theme/client/**/*.{html,vue,js,ts,jsx,tsx,md}",
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.sky,
        secondary: colors.slate,
        attached: colors.stone,
        true: colors.green,
        false: colors.red,
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};

module.exports = config;
