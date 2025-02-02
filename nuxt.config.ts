import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro: undefined,
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
  modules: ['@pinia/nuxt', '@nuxtjs/sitemap',],
  sitemap: {
    hostname: 'https://dowur-news.com',
    // hostname: 'http://localhost:3000',
    routes: async () => {
      const BASE_URL =   'https://dowur-news.shop';
      // const BASE_URL =   'http://localhost:8080';
      try {
        // Fetch all articles from the backend
        const response = await fetch(`${BASE_URL}/api/news/all`);
        const articles = await response.json();

        // Map articles to individual URLs
        return articles.map(article => ({
          url: `/articles/${article.id}`,
          lastmod: article.publishedAt,
          priority: 0.7,
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
    Sitemap: 'https://dowur-news.com/sitemap.xml',
  },
  app: {
    head: {
      title: 'Döwür News',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'A modern news application built with Nuxt.' },
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
