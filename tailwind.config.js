// @see: https://tailwindcss.com/docs/configuration/
// @see: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js

// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  // Reminder! Tailwind can't recognize conditional classes when using purge.
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Roboto',
          ...defaultTheme.fontFamily.sans,
        ],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
