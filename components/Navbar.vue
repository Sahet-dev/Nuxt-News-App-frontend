<template>
  <nav class="fixed  top-0 left-0 w-full bg-white border-b border-gray-100">
    <!-- Primary Navigation Menu -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex">
          <!-- Logo -->
          <div class="relative shrink-0 flex items-center mr-2">
            <NuxtLink to="/" class="flex items-center" @click="closeDropdown">
              <img :src="'/favicon.svg'" alt="Application Logo" class="w-16 h-16 items-center" />
              <span class="hidden md:block ml-2 font-bold">
                <span class="text-custom-blue"> Döwür </span>
                <span class="text-custom-red">  News</span>
              </span>
            </NuxtLink>
          </div>


          <!-- Search Input -->
<!--          <div class="flex-1 sm:ml-6 flex items-center justify-center">-->
<!--            <input-->
<!--                v-model="searchQuery"-->
<!--                type="text"-->
<!--                placeholder="Search courses..."-->
<!--                class="p-2 border rounded w-full sm:w-1/2"-->
<!--            />-->
<!--            <button-->
<!--                @click="searchCourses"-->
<!--                :disabled="!searchQuery.trim()"-->
<!--                class="ml-2 p-2 border rounded bg-blue-500 text-white hover:bg-blue-600"-->
<!--            >-->
<!--              Search-->
<!--            </button>-->
<!--          </div>-->
        </div>

        <div class="hidden sm:flex sm:items-center sm:ml-6">

          <NuxtLink to="/articles" class="block px-4 py-2 text-sm text-gray-500 hover:text-gray-700" @click="closeDropdown">Articles</NuxtLink>






          <!-- Authentication Links -->
          <template v-if="!authStore.isLoggedIn">
            <NuxtLink to="/auth/login" class="text-gray-200 border-b border-gray-200 bg-blue-500 p-2 rounded hover:text-gray-100 hover:bg-blue-800 focus:outline-none transition ease-in-out duration-150">
              Login
            </NuxtLink>
            <NuxtLink to="/auth/register" class="ml-4 text-gray-500 hover:text-gray-700 focus:outline-none transition ease-in-out duration-150">
              Register
            </NuxtLink>
          </template>
          <template v-else>
            <NuxtLink to="/articles/new" class="block px-4 py-2 text-sm text-gray-500 hover:text-gray-700"
                      @click="closeDropdown"
            >Create Article</NuxtLink>
            <div class=" ">
              <ul>
                <li>
                  <button
                      @click="handleLogout"
                      class="px-4 py-2 text-sm font-medium text-white bg-custom-red rounded-md hover:bg-red-700">
                    Logout
                  </button>

                </li>
              </ul>
            </div>
          </template>
        </div>

        <!-- Hamburger Menu -->
        <div class="-mr-2 flex items-center sm:hidden">
          <button
              @click="showingNavigationDropdown = !showingNavigationDropdown;"
              class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
          >
            <svg class="h-6 w-6 transition-all" stroke="currentColor" fill="none" viewBox="0 0 24 24">
              <path
                  :class="{ hidden: showingNavigationDropdown, 'inline-flex': !showingNavigationDropdown }"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
              />
              <path
                  :class="{ hidden: !showingNavigationDropdown, 'inline-flex': showingNavigationDropdown }"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Dropdown Menu -->
    <div
        :class="{ 'dropdown-menu open': showingNavigationDropdown, 'dropdown-menu': !showingNavigationDropdown }"
        class="sm:hidden "
    >
      <NuxtLink to="/articles" class="block px-4 py-2 text-sm" @click="closeDropdown">Articles</NuxtLink>

      <div class="pt-2 pb-3 space-y-1" v-if="!authStore.isLoggedIn">
        <!-- Authentication Links -->

        <NuxtLink to="/auth/login"
              class="block px-4 py-2 text-sm"
                  @click="closeDropdown"
              >Login
        </NuxtLink>
        <NuxtLink to="/auth/register" class="block px-4 py-2 text-sm"
                  @click="closeDropdown"
                  >Register
        </NuxtLink>


      </div>

      <div class="pt-2 pb-3 space-y-1" v-else>
        <!-- Authentication Links -->
        <div v-if="authStore.isLoggedIn && authStore.role === 'ADMIN'">
          <NuxtLink to="/articles/new" class="block px-4 py-2 text-sm"
                    @click="closeDropdown"
            >Create Article</NuxtLink>
        </div>
        <button
            @click="handleLogout"
            class="block px-4 py-2 text-sm">
          Logout
        </button>

      </div>
    </div>
  </nav>
</template>
<script setup>
import {  ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';

const authStore = useAuthStore();
const router = useRouter();
const showingNavigationDropdown = ref(false);
const searchQuery = ref('');
const isOpen = ref(false);


const closeDropdown = () => {
  showingNavigationDropdown.value = false;
};




const searchCourses = async () => {
  if (searchQuery.value.trim()) {
    await router.push({ name: 'CourseCatalog', query: { search: searchQuery.value } });
  }
};

const handleLogout = () => {
  authStore.logout();
  closeDropdown();
};




</script>


<style>
.dropdown-menu {
  overflow: hidden;
  transition: max-height 0.3s ease-out;
  max-height: 0;
}

.dropdown-menu.open {
  max-height: 500px;
}
</style>