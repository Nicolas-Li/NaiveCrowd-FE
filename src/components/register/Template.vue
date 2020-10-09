<template>
    <el-container>
        <el-header style="height: 50px">
            <el-row>
                <el-col :span="18">
                    <el-menu class="grid-content menu-left" mode="horizontal">
                        <el-menu-item>
                            <router-link to="/main"><h1 class="main">Naive Crowd</h1></router-link>
                        </el-menu-item>
                        <el-menu-item>精致的众包任务分配平台</el-menu-item>
                    </el-menu>
                </el-col>
                <el-col :span="6">
                    <el-menu class="grid-content menu-right" router mode="horizontal">
                        <el-menu-item index="hint" disabled>已有账号？</el-menu-item>
                        <el-menu-item index="/login">登录</el-menu-item>
                    </el-menu>
                </el-col>
            </el-row>
        </el-header>
        <el-main class="content">
            <router-view></router-view>
        </el-main>
        <Footer/>
    </el-container>
</template>

<script>
    import Footer from "@/components/footer/footer";

    export default {
        name: "LoginTemplate",
        components: {
            Footer,
        },
    }
</script>

<style scoped>
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