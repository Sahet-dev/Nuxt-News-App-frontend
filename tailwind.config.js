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
    extend: {},
  },
  plugins: [],
}

