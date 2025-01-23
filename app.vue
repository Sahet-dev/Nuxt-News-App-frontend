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

    <NuxtPage />
  </div>
</template>
