import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import CoumnDetail from './views/ColumnDetail.vue'
import CreatePost from "./views/CreatePost.vue";

const routerHistory = createWebHistory()
const router = createRouter({
    history: routerHistory,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/register',
            name: 'register',
            component: Register
        },
        {
            path: '/columns/:id',
            name: 'columns',
            component: CoumnDetail
        },
        {
            path: '/create',
            name: 'create',
            component: CreatePost
        },
    ]
})

export default router