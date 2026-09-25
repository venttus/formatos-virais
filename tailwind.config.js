/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#080706',
        foreground: '#f8f1df',
        muted: '#988b70',
        panel: '#11100c',
        accent: '#d3a946',
      },
    },
  },
  plugins: [],
}
