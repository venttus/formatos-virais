/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0b1220',
        foreground: '#f8fafc',
        muted: '#94a3b8',
        panel: '#111827',
        accent: '#38bdf8',
      },
    },
  },
  plugins: [],
}
