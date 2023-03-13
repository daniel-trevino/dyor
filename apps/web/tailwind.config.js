const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['src/**/*.{js,ts,jsx,tsx}', '../../packages/ui/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['var(--font-inter)', ...fontFamily.sans],
    },
  },
  plugins: [],
}
