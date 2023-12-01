/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      container:{
        center: true,
        padding: '0 2rem', // You can adjust the padding if needed
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [],
  },
    
  
}