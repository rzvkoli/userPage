/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'Urbanist': ['urbanist' , 'sans'] ,
      },
      colors: {
        'ECF0F1':'#ECF0F1',
        '193B48':'#193B48'
      },
    },
  },
  plugins: [],
}

