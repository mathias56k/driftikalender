/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '475px',
        'xm': '517px',
      },
    },
    fontFamily: {
      'main': ["futura-pt"]
    }
  },
  plugins: [],
}
