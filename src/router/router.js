import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter)

const routes = [
    {
        path: '', redirect: '/main', component: () => import("@/AppTemplate"),
        children: [
            // 主界面
            {
                path: '/main', redirect: '/main/task', component: () => import("@/components/Main"),
                children: [
                    {
                        // 任务界面
                        path: '/main/task', redirect: '/main/task/square', component: () => import("@/components/task/Template"),
                        children: [
                            {
                                // 任务广场
                                path: '/main/task/square',
                                component: () => import("@/components/task/TaskSquare")
                            },
                            {
                                // 需求方 我的任务
                                path: '/main/task/demander',
                                component: () => import("@/components/task/demander/MyTasks")
                            },
                            {
                                // 需求方 创建任务
                                path: '/main/task/create',
                                component: () => import("@/components/task/demander/TaskCreate")
                            },
                            {
                                // 需求方 配置任务
                                path: '/main/task/configuration',
                                name: 'configuration',
                                component: () => import("@/components/task/demander/Configuration"),
                            },
                            {
                                // 需求方 验收任务
                                path: '/main/task/acceptance',
                                name: 'acceptance',
                                component: () => import("@/components/task/demander/acceptance/Acceptance")
                            },
                            {
                                // 需求方 导出任务
                                path: '/main/task/export',
                                component: () => import("@/components/task/demander/Export")
                            },
                            {
                                //用户方 我的任务
                                path: '/main/task/user',
                                component: () => import("@/components/task/user/MyTasks")
                            },
                            {
                                //用户方 系统分发
                                path: '/main/task/distribute',
                                component: () => import("@/components/task/user/Distribute")
                            },
                            {
                                //用户方 任务详情
                                path: '/main/task/view',
                                name: 'taskView',
                                component: () => import("@/components/task/user/TaskView")
                            },
                            {
                                //用户方 答题
                                path: '/main/task/do',
                                component: () => import("@/components/task/user/DoTask")
                            },
                        ]
                    },
                ]
            },
            // 个人信息
            {
                path: '/person', component: () => import("@/components/person/Template"),
                children: [
                    {path: '/person/detail', component: () => import("@/components/person/Detail")},
                    {path: '/person/charge', component: () => import("@/components/person/Charge")},
                ]
            },
            // 登陆界面
            {
                path: '/login', component: () => import("@/components/log/login/Template"),
                children: [
                    {path: '/login', component: () => import("@/components/log/login/Identity")},
                    {path: '/login/user', component: () => import("@/components/log/login/Login")},
                    {path: '/login/demander', component: () => import("@/components/log/login/Login")},
                ]
            },
            // 注册界面
            {
                path: '/register', component: () => import("@/components/log/register/Template"),
                children: [
                    {path: '/register', component: () => import("@/components/log/register/Identity")},
                    {path: '/register/user', component: () => import("@/components/log/register/Register")},
                    {path: '/register/demander', component: () => import("@/components/log/register/Register")},
                ]
            },
        ]
    },
]

const router = new VueRouter({
    routes
});

export default router