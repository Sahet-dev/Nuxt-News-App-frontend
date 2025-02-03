import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';
import { useRuntimeConfig } from '#app';

export const useArticleStore = defineStore('articleStore', () => {
    const articles = ref([]);
    const article = ref(null);

    // Get BASE_URL from Nuxt runtime config
    const config = useRuntimeConfig();
    const BASE_URL = config.public.BASE_URL;

    const fetchArticles = async () => {
        if (articles.value.length) return articles.value; // Return existing data

        try {
            const response = await axios.get(`${BASE_URL}/api/news/all`);
            articles.value = response.data;
            return response.data; // ✅ Return the fetched articles
        } catch (error) {
            console.error('Failed to fetch articles:', error);
            return []; // Ensure it always returns an array
        }
    };




    const fetchArticle = async (id) => {
        if (article.value && article.value.id === id) return;

        try {
            const { data } = await axios.get(`${BASE_URL}/api/news/${id}`);
            article.value = data;
        } catch (error) {
            console.error('Failed to fetch article:', error);
        }
    };





    const refreshArticles = async () => {
        await fetchArticles();
    };

    const addArticle = (newArticle) => {
        articles.value.unshift(newArticle);
    };

    const updateArticleInStore = (updatedArticle) => {
        const index = articles.value.findIndex((a) => a.id === updatedArticle.id);
        if (index !== -1) {
            articles.value[index] = updatedArticle;
        }
    };

    const removeArticle = (id) => {
        articles.value = articles.value.filter((article) => article.id !== id);
    };

    return {
        articles,
        article,
        fetchArticles,
        fetchArticle,
        refreshArticles,
        addArticle,
        updateArticleInStore,
        removeArticle,
    };
});
