/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        vanilla: "#f0f0a4",
        eerieBlack: "#212121",
        honeyDew: "#cfdeca",
        aliceBlue: "#d9dfe9",
        ghostWhite: "#f6f6f9",
        ghostGrey: "#efefef",
      },
      fontFamily: {
        sans: ["Urbanist", "sans-serif"],
      },
      fontSize: {
        heading2: ["36px", { fontWeight: "700" }],
        subHeading: ["24px", { fontWeight: "500" }],
        body: ["20px", { fontWeight: "400" }],
      },
    },
  },
  plugins: [],
};
