/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

export default {
  content: ['./src/index.html', './src/**/*.tsx'],
  theme: {
    colors: {
      primary: '#334155', //SLATE 800,
      secondary: '#334155', //SLATE 700
      ['background-primary']: '#cbd5e1', //SLATE 300
      ['background-secondary']: '#f8fafc', //SLATE 50,
      ['background-hover']: '#e5e7eb', //SLATE 200
      ['background']: '#f1f5f9', //SLATE 100,
      ['error']: '#e11d48', // ROSE 600
      white: '#ffffff',
      slate: colors.slate,
      transparent: 'transparent'
    },
    extend: {}
  },
  plugins: []
};
