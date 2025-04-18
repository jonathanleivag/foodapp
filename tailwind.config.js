/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './screens/**/*.{js,jsx,ts,tsx}'
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff3e0',
          100: '#ffe0b2',
          200: '#ffcc80',
          300: '#ffb74d',
          400: '#ffa726',
          500: '#ff9800', // Main brand color
          600: '#fb8c00',
          700: '#f57c00',
          800: '#ef6c00',
          900: '#e65100'
        },
        secondary: {
          50: '#f5f5f5',
          100: '#eeeeee',
          200: '#e0e0e0',
          300: '#bdbdbd',
          400: '#9e9e9e',
          500: '#757575', // Secondary text and elements
          600: '#616161',
          700: '#424242',
          800: '#212121',
          900: '#1a1a1a'
        },
        accent: {
          success: '#4CAF50', // For success states
          error: '#FF5252', // For error states
          warning: '#FFC107', // For warnings
          info: '#2196F3' // For information
        },
        background: {
          light: '#FFFFFF',
          dark: '#121212',
          cream: '#FFF8E1'
        }
      }
    }
  },
  plugins: []
}
