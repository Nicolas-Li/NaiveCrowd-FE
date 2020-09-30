import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter)

import Register from "@/components/Register";
import Login from "@/components/Login";
import Main from "@/components/Main";
import TaskCreate from "@/components/TaskCreate"
import TextTaskCreate from "@/components/TextTaskCreate"
import Settlement from "@/components/Settlement"
import Export from "@/components/Export"
import Acceptance from "@/components/Acceptance"

const routes = [
    {
        path: '', redirect: '/main', component: () => import("@/App"),
        children: [
            {path: '/main', component: Main},
            {path: '/login', component: Login},
            {path: '/register', component: Register},
            {path:'/taskcreate',component:TaskCreate},
            {path:'/taskcreate/text',component:TextTaskCreate},
            {path:'/settlement',component:Settlement},
            {path:'/export',component:Export},
            {path:'/acceptance',component:Acceptance},

        ]
    },
]

const router = new VueRouter({
    routes
});

export default router