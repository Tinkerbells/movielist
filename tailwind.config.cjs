/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    screens: {
      "3xl": "1920px",
      // => @media (min-width: 1920px) { ... }
      "4xl": "2560px",
      // => @media (min-width: 2560px) { ... }
      "5xl": "3840px",
      // => @media (min-width: 3840px) { ... }
    },
  },
  plugins: [require("daisyui")],
};
