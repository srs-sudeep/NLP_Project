/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        fontFamily: {
            "lato": ['Lato', 'sans-serif'],
            "inter":['Inter','sans-serif'],
            "poppins":['Poppins','sans-serif'],
            "noto":['Noto Sans','sans-serif'],
        }
    },
},
  plugins: [],
}