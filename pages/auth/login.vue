<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <form @submit.prevent="handleSubmit" class="mt-8 space-y-6">
        <div class="rounded-md shadow-sm">
          <div>
            <label for="username" class="sr-only">Username</label>
            <input
                id="username"
                name="username"
                type="text"
                autocomplete="username"
                required
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Username"
                v-model="username"
            />
          </div>
          <div class="-mt-px">
            <label for="password" class="sr-only">Password</label>
            <input
                id="password"
                name="password"
                type="password"
                autocomplete="current-password"
                required
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                v-model="password"
            />
          </div>
        </div>
        <div>
          <button
              type="submit"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Sign In
          </button>
        </div>
        <p v-if="errorMessage" class="text-red-500 text-center">{{ errorMessage }}</p>
      </form>
    </div>
  </div>
</template>





<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useAuthStore } from '@/stores/authStore';
import {useRuntimeConfig} from "#app";

const username = ref('');
const password = ref('');
const errorMessage = ref('');
const authStore = useAuthStore();
const config = useRuntimeConfig();
const baseUrl = config.public.BASE_URL;

const handleSubmit = async () => {
  try {
    const response = await axios.post(
        `${baseUrl}/login`,

        {
          username: username.value,
          password: password.value,
        });

    const { token, role } = response.data;

    authStore.login(token, role);
    navigateTo('/');
  } catch (error) {
    errorMessage.value = 'Login failed. Please check your credentials and try again.';
    console.error(error);
  }
};


</script>

