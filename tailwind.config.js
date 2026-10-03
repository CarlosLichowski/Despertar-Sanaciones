/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#F4F7F5',
          100: '#E6EFE9',
          200: '#CFE0D4',
          300: '#A7C4B0',
          400: '#7BA488',
          500: '#4D7D5E',
          600: '#386047',
          700: '#2A4336', // Primary deep green from Stitch design
          800: '#203429',
          900: '#17251D',
          950: '#0E1712',
        },
        sand: {
          50: '#FAF8F4',
          100: '#F5EFE6', // Pill badge background
          200: '#EBDDCB',
          300: '#DEC6A9',
          400: '#CDAB84',
          500: '#B88F5E',
          600: '#9E7445',
          700: '#84623C', // Warm tag text
          800: '#694E31',
          900: '#553F28',
        },
        sage: {
          50: '#F5F8F6',
          100: '#E8F0EB', // Subtle green badge background
          200: '#D2E2D7',
          300: '#B0CCBA',
          400: '#88B097',
          500: '#629373',
          600: '#447254',
          700: '#335840',
        },
        canvas: '#FAF8F5', // The warm off-white background
        surface: '#FFFFFF',
        subtle: '#EAE6DE',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(42, 67, 54, 0.05)',
        'card': '0 10px 30px -4px rgba(42, 67, 54, 0.07)',
        'floating': '0 20px 40px -10px rgba(42, 67, 54, 0.12)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      }
    },
  },
  plugins: [],
}
