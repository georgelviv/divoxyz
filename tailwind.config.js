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
      white: '#ffffff',
      slate: colors.slate
    },
    extend: {}
  },
  plugins: []
};
