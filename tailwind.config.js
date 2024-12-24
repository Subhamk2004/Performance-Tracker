/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        softGray: '#F2F2F2',
        darkGray: '#D6D6D6',
        primary: '#050508',
        secondary: '#111525',
        btnclr:'#698eff',
        textp: '#494949',
        alertclr:'#df5252',
        purple:'#4d176a',
        lime:'#b2ea37'
      },
    },
  },
  plugins: [],
}

