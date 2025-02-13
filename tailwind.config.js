/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "components/*.{js,jsx,ts,tsx}",
    "components/**/*.{js,jsx,ts,tsx}",
    "components/**/**/*.{js,jsx,ts,tsx}",
    "components/**/**/**/*.{js,jsx,ts,tsx}",
    "components/tabbar/elements/*.{js,jsx,ts,tsx}",
    "components/tabbar/icons/*.{js,jsx,ts,tsx}",
    "*.tsx",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
};
