/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {}
  },
  // eslint-disable-next-line no-undef
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        hackin2theme: {
          primary: '#ec4899',
          secondary: '#a855f7',
          accent: '#db2777',
          neutral: '#fbcfe8',
          'base-100': '#1c1917',
          info: '#22d3ee',
          success: '#4ade80',
          warning: '#f59e0b',
          error: '#ef4444'
        }
      }
    ]
  }
};
