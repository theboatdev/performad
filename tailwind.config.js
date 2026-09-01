/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: { 
      transitionDuration: { 400: '400ms' } ,
      colors:{
        primary: 'rgba(34, 161, 141 , 1)',
        secondary: 'rgba(34, 161, 141, 0.1)',
        background: 'rgba(243, 244, 246,1)',
        secondaryBackground:' rgba(229, 231 ,235 , 1)'
      }
    },
  },
  plugins: [],
};
