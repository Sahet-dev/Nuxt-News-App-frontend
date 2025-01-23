import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro: undefined,
  $development: undefined, $env: undefined, $meta: undefined, $production: undefined, $test: undefined,
  ssr: true,
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    public: {
      BASE_URL: process.env.BASE_URL || 'https://www.dowur-news.shop',
    },
  },
  modules: ['@pinia/nuxt', '@nuxtjs/sitemap',],
  sitemap: {
    hostname: process.env.BASE_URL || 'http://localhost:8080',
    routes: async () => {
      const BASE_URL = process.env.BASE_URL || 'http://localhost:8080';
      try {
        // Fetch all articles from the backend
        const response = await fetch(`${BASE_URL}/api/news/all`);
        const articles = await response.json();

        // Map articles to individual URLs
        return articles.map(article => ({
          url: `/articles/${article.id}`, // Construct the route
          lastmod: article.publishedAt,  // Optional: Use `publishedAt` for the last modification date
          priority: 0.7,                 // Adjust priority as needed
        }));
      } catch (error) {
        console.error('Failed to fetch articles for sitemap:', error);
        return [];
      }
    },
  },
  robots: {
    UserAgent: '*',
    Allow: '/',
    Sitemap: 'https://nuxt.sahet-dev.com/sitemap.xml',
  },
  app: {
    head: {
      title: 'DowurNews',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'A modern news application built with Nuxt.' },
      ],
    },
  },
  compatibilityDate: '2024-11-01',
  target: 'static',
  seo: {
    site: {
      url: 'https://nuxt.sahet-dev.com/'  // Your site's URL
    }
  },
  devtools: { enabled: true }
})
