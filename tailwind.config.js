/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        maroon: {
          deep: '#4a1c1c',
          warm: '#6b2d2d',
          soft: '#8b3a3a',
        },
        rosegold: '#b76e79',
        beige: {
          muted: '#c4a77d',
          warm: '#e8d5b7',
          cream: '#f5ebe0',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        handwritten: ['Dancing Script', 'cursive'],
      },
      animation: {
        shake: 'shake 0.5s ease-in-out',
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%': { transform: 'translateX(-8px)' },
          '40%': { transform: 'translateX(8px)' },
          '60%': { transform: 'translateX(-6px)' },
          '80%': { transform: 'translateX(6px)' },
        },
      },
      boxShadow: {
        glow: '0 0 40px rgba(183, 110, 121, 0.4), 0 0 80px rgba(183, 110, 121, 0.2)',
        soft: '0 4px 30px rgba(0, 0, 0, 0.2)',
      },
    },
  },
  plugins: [],
}
