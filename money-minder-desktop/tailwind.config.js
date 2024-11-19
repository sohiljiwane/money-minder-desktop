/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        shamrockGreen: "#4de893",
        squeezeGreen: "#90f5b0",
        darkGreen: "#186b15"
      }
    },
  },
  plugins: [],
  darkMode: false,
}

