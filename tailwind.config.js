/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        text: 'var(--color-text)',
        primary: 'var(--color-primary)',
        muted: 'var(--color-muted)'
      },
      borderRadius: {
        DEFAULT: 'var(--radius)',
        full: 'var(--radius-round)'
      },
      boxShadow: {
        sm: 'var(--shadow-sm)'
      }
    },
  },
  plugins: [],
}
