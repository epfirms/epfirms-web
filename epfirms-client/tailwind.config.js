const { guessProductionMode } = require('@ngneat/tailwind');
const colors = require('tailwindcss/colors');
process.env.TAILWIND_MODE = guessProductionMode() ? 'build' : 'watch';

module.exports = {
  prefix: '',
  content: ['./src/**/*.{html,ts,css,scss,sass,less,styl}'],
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
        lime: colors.lime
      }
    }
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
  ]
};
