import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter)

const routes = [
    {
        path: '', redirect: '/main', component: () => import("@/App"),
        children: [
            // 主界面
            {path: '/main', component: () => import("@/components/Main")},
            // 登陆界面
            {
                path: '/login', component: () => import("@/components/login/Template"),
                children: [
                    {path: '/login', component: () => import("@/components/login/Identity")},
                    {path: '/login/user', component: () => import("@/components/login/Login")},
                    {path: '/login/demander', component: () => import("@/components/login/Login")},
                ]
            },
            // 注册界面
            {
                path: '/register', component: () => import("@/components/register/Template"),
                children: [
                    {path: '/register', component: () => import("@/components/register/Identity")},
                    {path: '/register/user', component: () => import("@/components/register/Register")},
                    {path: '/register/demander', component: () => import("@/components/register/Register")},
                ]
            },
        ]
    },
]

const router = new VueRouter({
    routes
});

export default router