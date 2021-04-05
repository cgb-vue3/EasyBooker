import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import CoumnDetail from './views/ColumnDetail.vue'
import CreatePost from "./views/CreatePost.vue";
import store from './store'

const routerHistory = createWebHistory('easybooker')
const router = createRouter(
    {
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
            component: Login,
            meta: {
                RedictAlreadyLogin: true
            }
        },
        {
            path: '/register',
            name: 'register',
            component: Register,
            meta: {
                RedictAlreadyLogin: true
            }
        },
        {
            path: '/columns/:id',
            name: 'columns',
            component: CoumnDetail
        },
        {
            path: '/create',
            name: 'create',
            component: CreatePost,
            meta: {
                RequireLogin: true
            }
        },
        {
            path: '/create',
            name: 'updatePost',
            component: CreatePost,
            meta: {
                RequireLogin: true
            }
        },
        {
            path: '/posts/:id',
            name: 'posts',
            component: ()=> import('./views/PostDetail.vue')
        },
        {
            path: '/edit',
            name: 'edit',
            component: ()=> import('./views/EditProfile.vue')
        },
    ]
})

router.beforeEach((to, from , next) => {
    if (to.meta.RequireLogin && !store.state.user.isLogin) {
        next('/login')
    } else if(to.meta.RedictAlreadyLogin && store.state.user.isLogin) {
        next('/')
    } else {
        next()
    }
})
export default router