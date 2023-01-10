/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Audiowide: ["Audiowide", "sans-serif"],
      },
      boxShadow: {
        custom: "95px 0px 0px #000000, 0px -0px 95px #000000",
      },
      screens: {
        customHeight: { raw: "(min-height: 840px)" },
        customWidth: { raw: "(min-width:1410px)" },
      },
    },
  },
  plugins: [],
};
