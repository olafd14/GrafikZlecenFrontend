import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/components/Login.vue';
import MainPage from '@/components/MainPage.vue';
import AdminPage from '@/components/adminComponents/AdminPage.vue';

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/main',
        name: 'MainPage',
        component: MainPage
    },
    {
        path: '/admin',
        name: 'AdminPage',
        component: AdminPage
    }
];

const router = createRouter({
    history: createWebHistory('/'), // Użyj '/' dla domyślnej ścieżki
    routes
});

export default router;
