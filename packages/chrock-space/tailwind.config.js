/**
 * @type { import("tailwindcss/tailwind-config").TailwindConfig }
 */
const config = {
  content: [
    "./docs/**/*.{html,vue,js,ts,jsx,tsx,md}",
    "./theme/client/**/*.{html,vue,js,ts,jsx,tsx,md}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/line-clamp")],
};

module.exports = config;
