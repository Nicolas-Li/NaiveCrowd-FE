<template>
    <el-container>
        <el-header>
            <el-row>
                <el-col :span="20">
                    <el-menu class="grid-content bg-purple menu-left" mode="horizontal">
                        <el-menu-item index="1" disabled>测试</el-menu-item>
                        <el-menu-item index="2" disabled>测试</el-menu-item>
                        <el-menu-item index="3" disabled>测试</el-menu-item>
                        <el-menu-item index="4" disabled>测试</el-menu-item>
                    </el-menu>
                </el-col>
                <el-col :span="4">
                    <el-menu class="grid-content bg-purple-light menu-right" router mode="horizontal">
                        <el-menu-item index="/login">登录</el-menu-item>
                        <el-menu-item index="/register">注册</el-menu-item>
                    </el-menu>
                </el-col>
            </el-row>
        </el-header>
        <el-main>
            Main
            <!--            <router-view/>-->
        </el-main>
        <el-footer>Footer</el-footer>
    </el-container>
</template>

<script>
    export default {
        name: 'Main',
        data() {
            return {}
        }
        // props: {
        //     msg: String
        // }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .bg-purple {
        background: #d3dce6;
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
