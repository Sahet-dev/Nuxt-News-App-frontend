<template>
  <div v-if="articleStore.article" class="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg pt-22">
    <h2 class="text-3xl font-semibold text-gray-800 text-center mb-8">Update Article</h2>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Title -->
      <div class="form-group">
        <label for="title" class="block text-gray-700 font-medium">Title</label>
        <input
            id="title"
            type="text"
            v-model="form.title"
            placeholder="Enter article title"
            required
            class="mt-2 p-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <!-- Content -->
      <div class="form-group">
        <label for="content" class="block text-gray-700 font-medium">Content</label>
        <textarea
            id="content"
            v-model="form.content"
            placeholder="Enter article content"
            rows="5"
            required
            class="mt-2 p-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        ></textarea>
      </div>

      <!-- Image URL -->
      <div class="form-group">
        <label for="imageUrl" class="block text-gray-700 font-medium">Image URL</label>
        <input
            id="imageUrl"
            type="text"
            v-model="form.imageUrl"
            placeholder="Enter image URL"
            class="mt-2 p-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <!-- Category -->
      <div class="form-group">
        <label for="categoryName" class="block text-gray-700 font-medium">Category</label>
        <select
            id="categoryName"
            v-model="form.categoryName"
            required
            class="mt-2 p-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="" disabled>Select a category</option>
          <option value="Technology">Technology</option>
          <option value="Health">Health</option>
          <option value="Business">Business</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Sports">Sports</option>
        </select>
      </div>

      <!-- Published At -->
      <div class="form-group">
        <label for="publishedAt" class="block text-gray-700 font-medium">Published At</label>
        <input
            id="publishedAt"
            type="datetime-local"
            v-model="form.publishedAt"
            class="mt-2 p-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <!-- Submit Button -->
      <div class="form-group mt-6">
        <button
            type="submit"
            class="w-full py-3 bg-blue-600 text-white font-bold text-lg rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Update Article
        </button>
      </div>
    </form>

    <!-- Success or Error Message -->
    <p v-if="successMessage" class="mt-4 text-center text-green-600">{{ successMessage }}</p>
    <p v-if="errorMessage" class="mt-4 text-center text-red-600">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import {ref, watchEffect} from 'vue';
import {useRoute, useRouter} from 'nuxt/app';
import {useArticleStore} from '@/stores/articleStore';
import {useRuntimeConfig} from "#app";
import createApiClient from "~/stores/apiClient.js";

const route = useRoute();
const articleStore = useArticleStore();
const config = useRuntimeConfig();
const baseUrl = config.public.BASE_URL;
const apiClient = createApiClient();

const form = ref({
  title: '',
  content: '',
  imageUrl: '',
  categoryName: '',
  publishedAt: null,
});

const successMessage = ref('');
const errorMessage = ref('');

const fetchArticle = async () => {
  await articleStore.fetchArticle(route.params.id);
  if (articleStore.article) {
    form.value = {
      title: articleStore.article.title,
      content: articleStore.article.content,
      imageUrl: articleStore.article.imageUrl,
      categoryName: articleStore.article.categoryName || '',
      publishedAt: articleStore.article.publishedAt
          ? new Date(articleStore.article.publishedAt).toISOString().slice(0, 16)
          : null,
    };
  }
};

onMounted(fetchArticle);

const handleSubmit = async () => {
  try {
    await apiClient.put(`admin/${route.params.id}`, form.value);
    successMessage.value = 'Article updated successfully!';
    setTimeout(() => {
      successMessage.value = '';
    }, 3000);
  } catch (error) {
    errorMessage.value = 'Failed to update article.';
    console.error(error);
    setTimeout(() => {
      errorMessage.value = '';
    }, 3000);
  }
};


</script>

<style>
.pt-22 {
  padding-top: 5.6rem;  /* or 88px */
}
</style>
