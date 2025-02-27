/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        'yt-red': '#FF0000',
        'yt-black': '#0F0F0F',
        'yt-light-black': '#272727',
        'yt-gray': '#606060',
        'yt-light-gray': '#AAAAAA',
        'yt-white': '#FFFFFF',
      }
    },
  },
  plugins: [],
}