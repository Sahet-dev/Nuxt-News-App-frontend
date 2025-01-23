<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
      <div class="text-center">
        <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p class="mt-2 text-sm text-gray-600">
          Already have an account?
          <a href="#" class="font-medium text-blue-600 hover:text-blue-500">Sign In</a>
        </p>
      </div>
      <form @submit.prevent="handleRegister" class="space-y-6">
        <div class="space-y-4">
          <div>
            <label for="name" class="sr-only">Full Name</label>
            <input
                id="name"
                name="name"
                type="text"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Full Name"
                v-model="name"
            />
          </div>
          <div>
            <label for="username" class="sr-only">Username</label>
            <input
                id="username"
                name="username"
                type="text"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Username"
                v-model="username"
            />
          </div>
          <div>
            <label for="email" class="sr-only">Email address</label>
            <input
                id="email"
                name="email"
                type="email"
                autocomplete="email"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Email address"
                v-model="email"
            />
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input
                id="password"
                name="password"
                type="password"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
            Register
          </button>
        </div>
        <p v-if="errorMessage" class="text-red-500 text-center mt-2">{{ errorMessage }}</p>
        <p v-if="successMessage" class="text-green-500 text-center mt-2">{{ successMessage }}</p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import apiClient from "@/stores/apiClient.js";

const name = ref('');
const username = ref('');
const email = ref('');
const password = ref('');
const errorMessage = ref('');
const successMessage = ref('');

const handleRegister = async () => {
  try {
    const response = await axios.post(
        // 'http://localhost:8080/register',
        'http://145.223.102.7:8080/register',
        {
          name: name.value,
          username: username.value,
          email: email.value,
          password: password.value,
        });
    successMessage.value = 'Registration successful! A confirmation email has been sent.';
    errorMessage.value = '';
    console.log('Registered User:', response.data);
  } catch (error) {
    errorMessage.value = 'Registration failed. Please try again.';
    successMessage.value = '';
    console.error(error);
  }
};

</script>

<style scoped>
/* Add custom styles here if necessary */
</style>
