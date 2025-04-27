module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brandPurple: "#8b5cf6",
        brandRed: "#f87171",
        brandOrange: "#fb923c"
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(to right, #8b5cf6, #f87171, #fb923c)"
      }
    }
  },
  plugins: [],
};
