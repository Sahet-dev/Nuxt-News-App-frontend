<template>
  <nav class="navbar bg-white shadow-sm py-4">
    <div class="container mx-auto flex justify-between items-center">
      <!-- App Title -->
      <NuxtLink to="/" class="text-xl font-bold text-blue-600">NewsApp</NuxtLink>

      <!-- Navigation Links -->
      <ul class="flex items-center space-x-6">

        <li><NuxtLink to="/articles" class="text-gray-600 hover:text-blue-600">Articles</NuxtLink></li>

        <li v-if="authStore.isLoggedIn && authStore.role === 'ADMIN'">
          <NuxtLink to="/articles/new" class="text-gray-600 hover:text-blue-600">Create Article</NuxtLink>
        </li>

        <!-- Conditional Buttons -->
        <template v-if="authStore.isLoggedIn">
          <li>
            <button
                @click="handleLogout"
                class="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700">
              Logout
            </button>
          </li>
        </template>
        <template v-else>
          <li>
            <NuxtLink
                to="/auth/login"
                class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
              Login
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
                to="/auth/register"
                class="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700">
              Register
            </NuxtLink>
          </li>
        </template>
      </ul>
    </div>
  </nav>
</template>


<script setup>
import { useAuthStore } from '@/stores/authStore';

const authStore = useAuthStore();

const handleLogout = () => {
  authStore.logout();
};
</script>
