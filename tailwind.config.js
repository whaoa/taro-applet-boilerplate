const process = require('node:process');

const isWeb = process.env.TARO_ENV === 'h5';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/index.html',
    './src/components/**/*.{js,jsx,ts,tsx}',
    './src/pages/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  corePlugins: {
    preflight: isWeb,
  },
  plugins: [],
};
