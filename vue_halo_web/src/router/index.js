import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import BlogDetail from '../views/BlogDetail.vue'
import BlogEdit from '../views/BlogEdit.vue'
import Register from '../views/Register'
import Error404 from "../views/404"


Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Index',
        redirect: {name: 'Home'}
    },
    {
        path: '/404',
        name: 'Error404',
        component: Error404
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/home',
        name: 'Home',
        // 懒加载
        component: () => import('../views/Home.vue')
    }, {
        path: '/blog/add', // 注意放在 /blog/:blogId 之前
        name: 'BlogAdd',
        meta: {
            requireAuth: true
        },
        component: BlogEdit
    },
    {
        path: '/blog/:blogId', // 注意放在 /blog/:blogId/edit 之前
        name: 'BlogDetail',
        component: BlogDetail
    },
    {
        path: '/blog/:blogId/edit',
        name: 'BlogEdit',
        meta: {
            requireAuth: true
        },
        component: BlogEdit
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes

})

// 回到顶部
router.afterEach((to, from, next) => {
    window, scrollTo(0, 0);
})
export default router
