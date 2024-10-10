/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{html,js,ts,tsx,jsx}', // Adjust the path to your source folder
    './src/components/**/*.{html,js,ts,tsx,jsx}', // If you have a components directory
    './src/pages/**/*.{html,js,ts,tsx,jsx}', // If using a Next.js or similar setup
  ],
  theme: {
    extend: {
      fontFamily: {
        'archivoBlack': ['ArchivoBlack', "Arial", "sans-serif"],
        'comfortaa': ['Comfortaa', "Arial", "sans-serif"],
        'rubikDoodle': ['RubikDoodle', "Arial", "sans-serif"],
        'teko': ['Teko', "Arial", "sans-serif"],
      },
      colors: {
        'off-white': '#d1d9ff'
      }
    },
    screens: {
      sm: '480px', // Mobile
      md: '768px', // Tablets
      lg: '1024px', // Desktop
    },
  },
  plugins: [],
}
