
export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#FAF9F6',
          100: '#F5EEDC',
          200: '#EADCB5',
          300: '#D4AF37',
          400: '#B89332',
          500: '#9C7A2B',
          600: '#7A5F22',
        },
        champagne: {
          light: '#F7E7CE',
          DEFAULT: '#E7D1A1',
          dark: '#C5A059',
        },
        wedding: {
          bg: '#FAF9F6',
          card: '#FFFFFF',
          text: '#3D3522',
          'text-light': '#7A6E4E',
          'text-muted': '#A69B7C',
          border: '#EADCB5',
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
