<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8 pt-22">
    <!-- Loading State -->
    <div v-if="loading" class="text-center text-gray-500">Loading article...</div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center text-red-500">
      Failed to load article. Please try again later.
    </div>

    <!-- Article Content -->
    <article v-else-if="article" class="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg ring-1 ring-gray-100 overflow-hidden">
      <!-- Header Section -->
      <div class="px-8 pt-10 pb-8 border-b border-gray-100">
        <h2 class="text-4xl font-serif font-medium tracking-tight text-gray-900 mb-6">
          {{ article.title }}
        </h2>

        <div class="flex items-center space-x-4 text-sm">
          <div class="flex items-center text-gray-600">
            <span class="inline-flex items-center px-3 py-1 rounded-full bg-gray-100">
               {{ article.categoryName }}
            </span>
          </div>
          <div class="text-gray-500">
            {{ formattedPublishedAt }}
          </div>
        </div>
      </div>

      <!-- Content Section -->
      <div class="px-8 py-10">
        <div class="prose prose-lg max-w-none">
          <p class="text-gray-700 leading-relaxed whitespace-pre-line">
            {{ article.content }}
          </p>
        </div>
      </div>

      <!-- Image Section -->
      <div v-if="article.imageUrl" class="px-8 py-6">
        <div class="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden bg-gray-100">
          <img
              :src="article.imageUrl"
              :alt="article.title"
              class="w-full h-full object-cover transform transition hover:scale-105 duration-500"
          />
        </div>
      </div>

      <!-- Footer Section -->
      <div
          v-if="authStore.isLoggedIn && authStore.role === 'ADMIN'"
          class="px-8 py-6 bg-gray-50 border-t border-gray-100"
      >
        <router-link
            :to="`/${article.id}`"
            class="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition-colors duration-150"
        >
          <svg
              class="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
          >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
          Edit Article
        </router-link>
      </div>
    </article>
  </div>
</template>

<script setup>
import {ref, computed} from 'vue';
import {useRoute} from 'vue-router';
import {useAuthStore} from '@/stores/authStore';
import {formatDistanceToNow} from 'date-fns';
import {useHead} from '@vueuse/head';
import {useAsyncData} from '#app'; // Ensure this is correctly imported

const authStore = useAuthStore();
const route = useRoute();
const config = useRuntimeConfig();
const baseUrl = config.public.BASE_URL;

// State Variables
const article = ref(null);
const loading = ref(true);
const error = ref(null);

// Fetch Data
const fetchArticle = async () => {
  try {
    loading.value = true;
    error.value = null;

    const response = await fetch(`${baseUrl}/api/news/${route.params.id}`);
    if (!response.ok) throw new Error('Failed to fetch article');

    article.value = await response.json();
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

// Fetch article on page load
fetchArticle();

// Format publish date
const formattedPublishedAt = computed(() => {
  return article.value?.publishedAt
      ? formatDistanceToNow(new Date(article.value.publishedAt), {addSuffix: true})
      : '';
});

// Set SEO meta tags dynamically
useHead(() => {
  if (!article.value) return {};
  return {
    title: `${article.value.title} - Döwür. Dünýäde ýene nämeler täzelikler...`,
    meta: [
      {name: 'description', content: article.value.content.slice(0, 150)},
      {property: 'og:title', content: article.value.title},
      {property: 'og:description', content: article.value.content.slice(0, 150)},
      {property: 'og:image', content: article.value.imageUrl},
      {name: 'twitter:card', content: 'summary_large_image'},
      {name: 'twitter:title', content: article.value.title},
      {name: 'twitter:description', content: article.value.content.slice(0, 150)},
      {name: 'twitter:image', content: article.value.imageUrl},
    ],
  };
});
</script>
<style>
.pt-22 {
  padding-top: 5.5rem;  /* or 88px */
}
</style>