import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro: {
    preset: 'netlify'
  },
  $development: undefined, $env: undefined, $meta: undefined, $production: undefined, $test: undefined,
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    public: {
      BASE_URL:  'https://dowur-news.shop',
      // BASE_URL:  'http://localhost:8080',
    },
  },
  modules: ['@pinia/nuxt', '@nuxtjs/sitemap', '@nuxtjs/robots'],
  sitemap: {
    sources: [
      '/api/__sitemap__/urls',
    ]
  },
  robots: {
    UserAgent: '*',
    Allow: '/',
    Sitemap: 'https://dowur-news.com/sitemap.xml',
  },
  app: {
    head: {
      title: 'Döwür News',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'A modern news application built with Nuxt.' },
        { name: 'google-site-verification', content: '7DU3PTICXXaok5RwiA02nHDmB53ZWR2oejJioBr2NRw' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      ],
    },
  },
  compatibilityDate: '2024-11-01',
  ssr: true,
  target: 'server',
  seo: {
    site: {
      url: 'https://dowur-news.com/'
    }
  },
  devtools: { enabled: true }
})