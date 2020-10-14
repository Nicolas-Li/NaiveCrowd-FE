<template>
    <el-container>
        <el-header/>
        <el-header class="header">
            <el-row>
                <el-col :span="20">
                    <el-menu class="grid-content menu-left" mode="horizontal"
                             router default-active="/main/task/square">
                        <el-menu-item index="/main"><h1 class="main">Naive Crowd</h1></el-menu-item>
                        <el-menu-item index="/main/task/square">任务广场</el-menu-item>
                        <el-menu-item index="/main/task/demander">我的任务</el-menu-item>
                    </el-menu>
                </el-col>
                <el-col :span="4">
                    <div v-if="!isLogin">
                        <el-menu class="grid-content bg-purple-light menu-right" router mode="horizontal">
                            <el-menu-item index="/login">登录</el-menu-item>
                            <el-menu-item index="/register">注册</el-menu-item>
                        </el-menu>
                    </div>
                    <div v-if="isLogin">
                        <el-menu class="grid-content bg-purple-light menu-right" router mode="horizontal">
                            <el-menu-item index="/person">
                                <el-avatar :size="40" shape="square">
                                    <svg t="1602392118907" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                         xmlns="http://www.w3.org/2000/svg" p-id="1541" width="40" height="40">
                                        <path d="M937.09 686.77c-60.66 150.7-226.26 259.11-420.52 259.11-186.71 0-346.95-100.15-412.98-241.74C196.64 539.35 350.88 431.6 525.42 431.6c168.33 0 317.78 100.22 411.67 255.17z"
                                              fill="#F5E9FF" p-id="1542"></path>
                                        <path d="M516.95 946.23c-245.5 0-445.23-173.15-445.23-385.97s199.73-385.97 445.23-385.97 445.23 173.15 445.23 385.97-199.73 385.97-445.23 385.97z m0-731.32c-223.1 0-404.6 154.92-404.6 345.35s181.5 345.35 404.6 345.35 404.6-154.92 404.6-345.35-181.5-345.35-404.6-345.35z"
                                              fill="#40455E" p-id="1543"></path>
                                        <path d="M130.08 429.1c-10.04 0-18.77-7.43-20.11-17.66-0.61-4.67-14.56-115.63 27.46-224.18 21.68-55.99 45.05-87.62 71.47-96.68 13.68-4.69 25.71-2.07 32.42 1.95l3.33 2 96.93 126.92c6.81 8.92 5.1 21.67-3.82 28.47s-21.67 5.1-28.47-3.82l-88.81-116.29c-6.75 3.47-23.96 17.36-45.15 72.11-38.17 98.59-25.2 203.18-25.06 204.23 1.44 11.12-6.39 21.31-17.51 22.76-0.91 0.13-1.8 0.19-2.68 0.19zM905.33 429.1c-0.88 0-1.78-0.06-2.67-0.18-11.12-1.46-18.96-11.66-17.49-22.79 0.22-1.76 12.97-105.96-25.06-204.21-21.57-55.72-39.05-69.09-45.09-72.19L726.15 246.1c-6.81 8.91-19.56 10.63-28.47 3.82-8.92-6.81-10.62-19.56-3.82-28.47l96.93-126.92 3.33-2c6.7-4.02 18.73-6.64 32.42-1.95 26.41 9.06 49.79 40.69 71.47 96.68 42.02 108.55 28.07 219.51 27.46 224.18-1.37 10.22-10.1 17.66-20.14 17.66zM349.36 556.87c-11.22 0-20.31-9.1-20.31-20.31v-67.71c0-11.22 9.1-20.31 20.31-20.31s20.31 9.1 20.31 20.31v67.71c0 11.21-9.09 20.31-20.31 20.31zM681.16 556.87c-11.22 0-20.31-9.1-20.31-20.31v-67.71c0-11.22 9.1-20.31 20.31-20.31s20.31 9.1 20.31 20.31v67.71c0.01 11.21-9.09 20.31-20.31 20.31z"
                                              fill="#40455E" p-id="1544"></path>
                                        <path d="M520.34 663.52m-27.09 0a27.09 27.09 0 1 0 54.18 0 27.09 27.09 0 1 0-54.18 0Z"
                                              fill="#40455E" p-id="1545"></path>
                                        <path d="M442.47 766.79c-11.22 0-20.31-9.1-20.31-20.31s9.1-20.31 20.31-20.31c30.8 0 55.86-25.06 55.86-55.86 0-11.22 9.1-20.31 20.31-20.31 11.22 0 20.31 9.1 20.31 20.31 0.01 53.19-43.28 96.48-96.48 96.48z"
                                              fill="#40455E" p-id="1546"></path>
                                        <path d="M599.9 766.79c-53.21 0-96.49-43.29-96.49-96.49 0-11.22 9.1-20.31 20.31-20.31 11.22 0 20.31 9.1 20.31 20.31 0 30.8 25.06 55.86 55.86 55.86 11.22 0 20.31 9.1 20.31 20.31s-9.08 20.32-20.3 20.32zM812.45 661.83c-9.88 0-18.55-7.23-20.06-17.3-1.67-11.09 5.97-21.44 17.07-23.11l180.18-27.09c11.07-1.66 21.44 5.97 23.11 17.07 1.67 11.09-5.97 21.44-17.07 23.11L815.49 661.6c-1.02 0.16-2.04 0.23-3.04 0.23zM982.08 739.7c-0.81 0-1.62-0.05-2.44-0.15l-169.58-20.31c-11.14-1.33-19.09-11.45-17.75-22.59 1.33-11.14 11.49-19.06 22.59-17.75l169.58 20.31c11.14 1.33 19.09 11.45 17.75 22.59-1.24 10.32-10.01 17.9-20.15 17.9zM224.11 661.83c-1.01 0-2.02-0.07-3.05-0.23L40.89 634.52c-11.1-1.67-18.74-12.01-17.07-23.11s12.05-18.75 23.11-17.07l180.18 27.09c11.1 1.67 18.74 12.01 17.07 23.11-1.52 10.06-10.18 17.29-20.07 17.29zM54.48 739.7c-10.14 0-18.91-7.58-20.14-17.9-1.34-11.14 6.61-21.25 17.75-22.59l169.58-20.31c11.12-1.33 21.25 6.61 22.59 17.75 1.34 11.14-6.61 21.25-17.75 22.59L56.92 739.56c-0.82 0.09-1.63 0.14-2.44 0.14z"
                                              fill="#40455E" p-id="1547"></path>
                                    </svg>
                                </el-avatar>
                                {{ name }}
                            </el-menu-item>
                        </el-menu>
                    </div>
                </el-col>
            </el-row>
        </el-header>
        <el-main class="content">
            <router-view/>
        </el-main>
    </el-container>
</template>

<script>

    export default {
        name: 'Main',
        components: {},
        data() {
            return {
                isLogin: this.$cookies.get('isLogin') === "true",
                name: this.$cookies.get('name')
            }
        }
    }
</script>

<style scoped>
    .header {
        height: 50px;
        position: fixed;
        left: 0;
        width: 100%;
        z-index: 1;
    }

    .main {
        text-decoration: none;
        margin-top: -5px;

        transform-style: inherit;

        text-align: center;
        font-style: italic;
        font-size: 250%;
        color: #a310ad;
        text-shadow: 0 2px 2px #000;
    }

    .content {
        min-height: calc(100vh - 100px);
        overflow: hidden;
    }

    .bg-purple-light {
        background: #e5e9f2;
    }

    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }

    .menu-left {
        padding-left: 50px;
    }

    .menu-right {
        padding-left: 50px;
        padding-right: 50px;
    }
</style>
