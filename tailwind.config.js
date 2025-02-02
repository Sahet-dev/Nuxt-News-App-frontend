/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{vue,js}', // Scan all components
    './layouts/**/*.vue',         // Scan all layouts
    './pages/**/*.vue',           // Scan all pages
    './plugins/**/*.{js,ts}',     // Scan all plugins
    './nuxt.config.{js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#1b1a79',
        'custom-red': '#cc0e35',
      }
    },
  },
  plugins: [],
}