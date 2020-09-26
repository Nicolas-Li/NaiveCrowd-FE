import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter)

import Register from "@/components/Register";
import Login from "@/components/Login";
import Main from "@/components/Main";
import TaskCreate from "@/components/TaskCreate"

const routes = [
    {
        path: '', redirect: '/main', component: () => import("@/App"),
        children: [
            {path: '/main', component: Main},
            {path: '/login', component: Login},
            {path: '/register', component: Register},
            {path:'/taskcreate',component:TaskCreate}
        ]
    },
]

const router = new VueRouter({
    routes
});

export default router