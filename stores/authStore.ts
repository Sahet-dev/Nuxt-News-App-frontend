import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('authStore', () => {
    const isLoggedIn = ref(false);
    const role = ref(null);

    const login = (token, userRole) => {
        localStorage.setItem('authToken', token);
        localStorage.setItem('role', userRole);
        isLoggedIn.value = true;
        role.value = userRole;
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('role');
        isLoggedIn.value = false;
        role.value = null;
    };

    const checkLoginStatus = () => {
        const token = localStorage.getItem('authToken');
        const storedRole = localStorage.getItem('role');
        isLoggedIn.value = !!token;
        role.value = storedRole || null;
    };

    const isAdmin = () => {
        return role.value === 'ADMIN';
    };

    return {
        isLoggedIn,
        role,
        login,
        logout,
        checkLoginStatus,
        isAdmin,
    };
});
