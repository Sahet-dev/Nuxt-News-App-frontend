<script setup>
import Navbar from '~/components/Navbar.vue';
import { onMounted } from 'vue';
import { useAuthStore } from '@/stores/authStore';

const authStore = useAuthStore();
onMounted(() => {
  authStore.checkLoginStatus();
});
</script>

<template>
  <div>
    <Navbar />
    <br>
    <br>
    <br>
    <NuxtPage />

  </div>
</template>
