/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        multiverse: {
          background: "#080b18",
          surface: "#101426",
          primary: "#7548d8",
          blue: "#3b82f6",
          purple: "#a78bfa",
        },
      },
    },
  },

  plugins: [],
};
