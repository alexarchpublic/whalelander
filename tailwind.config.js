/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
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
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
} 