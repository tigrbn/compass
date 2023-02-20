/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/screens/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
        title: ["Montserrat-Bold"],
      },
      colors: {
        background: "white",
        button: "#0053A9",  
      }
    },
  },
  plugins: [],
}
