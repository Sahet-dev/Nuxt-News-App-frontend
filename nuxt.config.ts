import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    public: {
      BASE_URL: process.env.BASE_URL || 'http://localhost:8080',
    },
  },
  modules: ['@pinia/nuxt'],
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true }
})
