/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background, #000)",
        foreground: "var(--foreground, #fff)",
      },
      fontFamily: {
        sans: [
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',",
          "'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',",
          "sans-serif"
        ],
      },
    },
  },
  plugins: [],
}
