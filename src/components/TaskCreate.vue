<template>
<el-container>
        <el-header>
            <el-row>
                <el-col :span="20">
                    <el-menu class="grid-content bg-purple menu-left" router mode="horizontal">
                        <el-menu-item index="/taskcreate" disabled>任务创建</el-menu-item>
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
            <el-container>
                <el-header>
                    任务创建
                </el-header>
                <el-main>
                    <el-row :gutter="20">
                        <el-col :span="12"><el-button type="primary">文本任务</el-button></el-col>
                        <el-col :span="12"><el-button type="primary">图片任务</el-button></el-col>
                    </el-row>
                </el-main>
                <el-footer></el-footer>
            </el-container>
        </el-main>
        <el-footer></el-footer>
    </el-container>
    
</template>

<script>
    export default {
        name: "TaskCreate",
        data() {
            return {}
        },
    }
</script>

<style scoped>
  .el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
  }
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