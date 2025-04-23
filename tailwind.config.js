/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        playfair: ['Playfair Display', 'serif'],
      },
      keyframes: {
        'gradient-1': {
          '0%, 100%': { transform: 'translate(0%, 0%) rotate(0deg)' },
          '33%': { transform: 'translate(5%, 5%) rotate(120deg)' },
          '66%': { transform: 'translate(-5%, 5%) rotate(240deg)' },
        },
        'gradient-2': {
          '0%, 100%': { transform: 'translate(0%, 0%) rotate(0deg)' },
          '33%': { transform: 'translate(-5%, -5%) rotate(-120deg)' },
          '66%': { transform: 'translate(5%, -5%) rotate(-240deg)' },
        },
        'gradient-3': {
          '0%, 100%': { transform: 'translate(0%, 0%) rotate(0deg)' },
          '33%': { transform: 'translate(-5%, 5%) rotate(120deg)' },
          '66%': { transform: 'translate(5%, -5%) rotate(-120deg)' },
        },
      },
      animation: {
        'gradient-1': 'gradient-1 15s ease infinite',
        'gradient-2': 'gradient-2 15s ease infinite',
        'gradient-3': 'gradient-3 15s ease infinite',
      },
    },
  },
  plugins: [],
} 