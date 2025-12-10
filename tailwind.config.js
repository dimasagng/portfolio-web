/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["index.html"],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: "16px",
    },
    extend: {
      colors: {
        primary: "oklch(68.5% 0.169 237.323)",
        secondary: "oklch(55.4% 0.046 257.417)",
        dark: "oklch(12.9% 0.042 264.695 / <alpha-value>)",
      },
      screens: {
        "2xl": "1320px",
      },
    },
  },
  plugins: [],
};
