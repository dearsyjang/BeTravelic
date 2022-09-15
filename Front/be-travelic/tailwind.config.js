/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      // 백그라운드
      "blue-100": "#F7FBFC",
      "blue-200": "#D6E6F2",
      // Nav
      "blue-300": "#769FCD",
      "blue-400": "#3C64B1",
      // link active 시 강조
      highlighter: " #FFD24C",
      "dark-gray": "#484848",
      gray: "#767676",
      // footer
      "light-gray": "#CFD2CF",
      // 별점
      rate: "#FFCE31",
      white: "#FFFFFF",
    },
    extend: {},
  },
  plugins: [require("flowbite/plugin")],
};
