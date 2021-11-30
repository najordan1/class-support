import { createWebHistory, createRouter } from 'vue-router';
import home from '../components/Home.vue';
import studentView from '../components/StudentView.vue';
import professorView from '../components/ProfessorView.vue';
import notFound from '../components/NotFound.vue';

const routes = [
    {
        path: '/',
        name: 'home',
        component: home,
    },
    {
        path: '/student',
        name: 'student',
        component: studentView,
    },
    {
        path: '/professor',
        name: 'professor',
        component: professorView,
    },
    // TODO: add 403 for students going to professorView
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: notFound,
    },
];

const router = createRouter({ routes, history: createWebHistory(), });

export default router;
