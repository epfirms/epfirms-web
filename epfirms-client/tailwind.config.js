const { guessProductionMode } = require('@ngneat/tailwind');
const { colors } = require('tailwindcss/defaultTheme');
process.env.TAILWIND_MODE = guessProductionMode() ? 'build' : 'watch';

module.exports = {
  prefix: '',
  content: ['./src/**/*.{html,ts,css,scss,sass,less,styl}'],
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
  ],
  theme: {
    extend: {
      colors: {
        gray: colors.slate
      }
    }
  }
};
