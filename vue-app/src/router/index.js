import { createWebHistory, createRouter } from 'vue-router';
import home from '../components/Home.vue';

const routes = [
    {
        path: '/',
        name: 'home',
        component: home,
    },
];

const router = createRouter({ routes, history: createWebHistory(), });

export default router;
