/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{jsx,mdx}",
    "./theme.config.jsx",
    "./components/**/*.jsx",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF4400",
        secondary: "#BB44CC",
        tertiary: "#44BBCC",
      },
    },
  },
  plugins: [],
}
