<template>
  <div v-if="articleStore.article" class="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
    <article class="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg ring-1 ring-gray-100 overflow-hidden">
      <!-- Header Section -->
      <div class="px-8 pt-10 pb-8 border-b border-gray-100">
        <h2 class="text-4xl font-serif font-medium tracking-tight text-gray-900 mb-6">
          {{ articleStore.article.title }}
        </h2>

        <div class="flex items-center space-x-4 text-sm">
          <div class="flex items-center text-gray-600">
            <span class="inline-flex items-center px-3 py-1 rounded-full bg-gray-100">
               {{ articleStore.article.categoryName }}
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
            {{ articleStore.article.content }}
          </p>
        </div>
      </div>

      <!-- Image Section -->
      <div v-if="articleStore.article.imageUrl" class="px-8 py-6">
        <div class="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden bg-gray-100">
          <img
              :src="articleStore.article.imageUrl"
              alt="Article Image"
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
            :to="`/articles/${articleStore.article.id}/edit`"
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
import { onMounted, watch, ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useArticleStore } from '@/stores/articleStore';
import { useAuthStore } from '@/stores/authStore';
import { formatDistanceToNow } from 'date-fns';
import { useHead } from '@vueuse/head';

const articleStore = useArticleStore();
const authStore = useAuthStore();
const route = useRoute();
const config = useRuntimeConfig()
const baseUrl = config.public.BASE_URL
const pageTitle = ref('Loading...');
const formattedPublishedAt = computed(() => {
  return articleStore.article?.publishedAt
      ? formatDistanceToNow(new Date(articleStore.article.publishedAt), { addSuffix: true })
      : '';
});

const { data: article } = await useAsyncData(() =>
    fetch(`${baseUrl}/api/news/${route.params.id}`).then(res => res.json())
);

onMounted(async () => {
  await articleStore.fetchArticle(route.params.id); // Fetch article data

  if (articleStore.article) {
    useHead({
      title: articleStore.article.title,
      meta: [
        { name: 'description', content: articleStore.article.content.slice(0, 150) },
        { property: 'og:title', content: articleStore.article.title },
        { property: 'og:description', content: articleStore.article.content.slice(0, 150) },
        { property: 'og:image', content: articleStore.article.imageUrl },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: articleStore.article.title },
        { name: 'twitter:description', content: articleStore.article.content.slice(0, 150) },
        { name: 'twitter:image', content: articleStore.article.imageUrl },
      ],
    });
  }
});

watch(() => route.params.id, () => {
  fetchArticleAndSetTitle();
});

async function fetchArticleAndSetTitle() {
  await articleStore.fetchArticle(route.params.id);
  if (articleStore.article?.title) {
    pageTitle.value = articleStore.article.title;
    document.title = `${articleStore.article.title} - Döwür. Dünýäde ýene nämeler täzelikler...`; // Update page title
  } else {
    document.title = 'Article Not Found - Döwür';
  }
}
</script>
