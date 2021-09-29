const { guessProductionMode } = require("@ngneat/tailwind");
const colors = require('tailwindcss/colors')
process.env.TAILWIND_MODE = guessProductionMode() ? 'build' : 'watch';

module.exports = {
    prefix: '',
    mode: 'jit',
    purge: {
      content: [
        './src/**/*.{html,ts,css,scss,sass,less,styl}',
      ]
    },
    darkMode: 'class', // or 'media' or 'class'
    theme: {
      extend: {
        colors: {
          cyan: colors.cyan,
          teal: colors.teal,
          sky: colors.sky,
          bluegray: colors.blueGray,
          orange: colors.orange,
          violet: colors.purple,
          fuchsia: colors.fuchsia,
          rose: colors.rose,
          emerald: colors.green,
          lime: colors.lime,
        }
      },
    },
    variants: {
      extend: {},
    },
    plugins: [require('@tailwindcss/aspect-ratio'),require('@tailwindcss/forms'),require('@tailwindcss/typography')],
};
