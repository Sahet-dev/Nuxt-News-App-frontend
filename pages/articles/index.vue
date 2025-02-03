<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8 pt-22">
    <div class="max-w-4xl mx-auto">
      <!-- Header Section -->
      <div class="mb-10 text-center">
        <h2 class="text-4xl font-serif tracking-tight text-gray-900 mb-4">News Articles</h2>
        <div class="h-1 w-20 bg-blue-500 mx-auto rounded-full"></div>
      </div>

      <!-- Articles List -->
      <div class="bg-white rounded-2xl shadow-lg ring-1 ring-gray-100">
        <ul class="divide-y divide-gray-100">
          <li v-for="article in articles"
              :key="article.id"
              class="group hover:bg-gray-50 transition-colors duration-200">
            <NuxtLink
                :to="`/articles/${article.id}`"
                class="block p-6 sm:px-8"
            >
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                  {{ article.title }}
                </h3>
                <svg
                    class="w-5 h-5 text-gray-400 group-hover:text-blue-500 transform group-hover:translate-x-1 transition-all duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useArticleStore } from '@/stores/articleStore';
import { useAsyncData, useState, useHead } from '#app';

const articleStore = useArticleStore();
const articles = useState('cachedArticles', () => articleStore.articles); // Persist articles across pages

useHead({
  title: 'Latest News Articles',
  meta: [
    { name: 'description', content: 'Stay updated with the latest news articles.' },
    { property: 'og:title', content: 'Latest News Articles' },
    { property: 'og:description', content: 'Stay updated with the latest news articles.' },
  ],
});

// Only fetch if articles are empty
await useAsyncData('articles', async () => {
  if (!articles.value.length) {
    await articleStore.fetchArticles();
  }
  return articles.value || null;
});
</script>
<style>
.pt-22 {
  padding-top: 5.6rem;  /* or 88px */
}
</style>