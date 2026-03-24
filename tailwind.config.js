
export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        lavender: {
          50: '#F8F6FC',
          100: '#F0EBF7',
          200: '#E2D8F0',
          300: '#C8A2C8',
          400: '#B48CC4',
          500: '#9B7CB8',
          600: '#7E5FA0',
          700: '#614585',
        },
        rose: {
          light: '#F2D1DC',
          DEFAULT: '#D4849A',
          dark: '#B8607A',
        },
        wedding: {
          bg: '#F8F6FC',
          card: '#FFFFFF',
          text: '#2D2D2D',
          'text-light': '#6B6B6B',
          'text-muted': '#9B9B9B',
          border: '#E8E0F0',
        },
      },
      fontFamily: {
        script: ['"Great Vibes"', 'cursive'],
        serif: ['"Cormorant Garamond"', 'serif'],
        sans: ['Montserrat', 'sans-serif'],
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.6s ease-out forwards',
      },
    },
  },
  plugins: [],
}
