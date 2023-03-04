/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "1920px",
      // => @media (min-width: 1920px) { ... }
      "4xl": "2560px",
      // => @media (min-width: 2560px) { ... }
    },
  },
  plugins: [require("daisyui")],
};
