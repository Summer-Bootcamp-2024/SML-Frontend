/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-blue" : "#50A4D3",
        "custom-white" : "#F8F8F8",
        "custom-orange" :"#F9C77B",
        "custom-grey" : "#BDBDBD",
        "custom-indigo" : "#404F60"  
      },
    },
  },
  plugins: [],
}