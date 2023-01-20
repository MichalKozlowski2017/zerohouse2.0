// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  mode: 'jit',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  media: false, // or 'media' or 'class'
  theme: {
    extend: {},
    screens: {
      xs: '475px',
      mobileMenu: '1000px',
      ...defaultTheme.screens,
      xl2: '1380px',
      xl3: '1500px',
      xl4: '1650px',
      xl5: '1800px'
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
