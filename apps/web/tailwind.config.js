const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['src/**/*.{js,ts,jsx,tsx}', '../../packages/ui/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['var(--font-inter)', ...fontFamily.sans],
    },
    extend: {
      animation: {
        text: 'text 10s ease infinite',
      },
      keyframes: {
        text: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
      },
    },
  },
  plugins: [],
}
