import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';
import { useRuntimeConfig } from '#app'; // Use Nuxt runtime config for the BASE_URL

export const useArticleStore = defineStore('articleStore', () => {
    const articles = ref([]);
    const article = ref(null);

    // Get BASE_URL from Nuxt runtime config
    const config = useRuntimeConfig();
    const BASE_URL = config.public.BASE_URL;

    const fetchArticles = async () => {
        try {
            const { data } = await axios.get(`${BASE_URL}/api/news/all`);
            articles.value = data;
        } catch (error) {
            console.error('Failed to fetch articles:', error);
        }
    };

    const fetchArticle = async (id) => {
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
