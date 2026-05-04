/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'display': ['Space Grotesk', 'sans-serif'],
        'body': ['Outfit', 'sans-serif'],
      },
      colors: {
        'dark-base': '#050505',
        'accent-primary': '#ccff00', /* Neon yellow/green */
        'accent-secondary': '#ff0055', /* Neon pink */
        'surface': '#111111',
      }
    },
  },
  plugins: [],
}
