<template>
    <el-container>
        <el-header>
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
                        <el-menu-item index="hint" disabled>还没有账号？</el-menu-item>
                        <el-menu-item index="/register">注册</el-menu-item>
                    </el-menu>
                </el-col>
            </el-row>
        </el-header>
        <el-main>
            <router-view/>
        </el-main>
        <el-footer>Footer</el-footer>
    </el-container>
</template>

<script>
    export default {
        name: "LoginTemplate",
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