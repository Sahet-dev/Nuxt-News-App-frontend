import axios from 'axios';
import { useRuntimeConfig } from '#app';

const config = useRuntimeConfig();
const apiClient = axios.create({
    baseURL: config.public.BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

apiClient.interceptors.request.use(config => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default apiClient;
