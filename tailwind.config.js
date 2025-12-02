import { colors } from './src/shared/lib/colors.js';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors,
      fontFamily: {
        sans: ['Urbanist', 'sans-serif'],
      },
      borderRadius: {
        main: '2rem',
      },
      fontSize: {
        heading2: ['36px', { fontWeight: '700' }],
        subHeading: ['24px', { fontWeight: '500' }],
        body: ['20px', { fontWeight: '400' }],
      },
    },
  },
  plugins: [],
};
