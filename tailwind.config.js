/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'bebas-neue': ['var(--font-bebas-neue)', 'sans-serif'],
        'dm-sans': ['var(--font-dm-sans)', 'sans-serif'],
        'space-mono': ['var(--font-space-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
}