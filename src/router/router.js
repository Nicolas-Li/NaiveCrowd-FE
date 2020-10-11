import Vue from 'vue';
import VueRouter from 'vue-router';
import TaskCreate from "@/components/TaskCreate";
import TextTaskCreate from "@/components/TextTaskCreate";
import Settlement from "@/components/Settlement";
import Export from "@/components/Export";
import Acceptance from "@/components/Acceptance";

Vue.use(VueRouter)

const routes = [
    {
        path: '', redirect: '/main', component: () => import("@/App"),
        children: [
            // 主界面
            {path: '/main', component: () => import("@/components/Main")},
            // 个人信息
            {
                path: '/person', component: () => import("@/components/person/Template"),
                children: [
                    {path: '/person', component: () => import("@/components/person/Detail")},
                ]
            },
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
            {path: '/taskcreate', component: TaskCreate},
            {path: '/taskcreate/text', component: TextTaskCreate},
            {path: '/settlement', component: Settlement},
            {path: '/export', component: Export},
            {path: '/acceptance', component: Acceptance},
        ]
    },
]

const router = new VueRouter({
    routes
});

export default router