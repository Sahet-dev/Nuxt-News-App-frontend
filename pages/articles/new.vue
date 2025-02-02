<template>
  <div class="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md pt-22">
    <h2 class="text-3xl font-semibold text-center text-gray-800 mb-6">Create New Article</h2>

    <form @submit.prevent="createArticle">
      <div class="space-y-4">
        <!-- Title -->
        <div class="form-group">
          <label for="title" class="block text-gray-700 font-medium">Title</label>
          <input
              id="title"
              type="text"
              v-model="form.title"
              placeholder="Enter article title"
              class="mt-2 p-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
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
              class="mt-2 p-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
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
              class="mt-2 p-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
          >
            <option value="" disabled selected>Select a category</option>
            <option value="Technology">Technology</option>
            <option value="Health">Health</option>
            <option value="Sports">Sports</option>
            <option value="Business">Business</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Entertainment">World</option>
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
            Create Article
          </button>
        </div>
      </div>
    </form>

    <!-- Success or Error Message -->
    <p v-if="successMessage" class="mt-4 text-center text-green-600">{{ successMessage }}</p>
    <p v-if="errorMessage" class="mt-4 text-center text-red-600">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import axios from 'axios';
import {useRouter} from 'vue-router';
import apiClient from "~/stores/apiClient.js";

const form = ref({
  title: '',
  content: '',
  imageUrl: '',
  categoryName: '',
  publishedAt: null,
});
const successMessage = ref('');
const errorMessage = ref('');
const router = useRouter();

const createArticle = async () => {
  try {
    await apiClient.post('/admin/add', form.value);
    successMessage.value = 'Article created successfully!';
    form.value = {
      title: '',
      content: '',
      imageUrl: '',
      categoryName: '',
      publishedAt: null,
    };
    setTimeout(() => router.push('/articles'), 2000);
  } catch (error) {
    errorMessage.value = 'Failed to create article.';
  }
};
</script>
<style>
.pt-22 {
  padding-top: 5.6rem;  /* or 88px */
}
</style>