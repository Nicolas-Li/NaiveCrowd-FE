<template>
    <el-container>
        <el-header class='title'>{{title}}</el-header>
        <el-main>
            <el-divider></el-divider>
            <el-row :gutter="20">
                <el-col :span="6"><div align='left'>题目数量：{{number}}</div></el-col>
                <el-col :span="6"><div align='left'>题目类型：{{type}}</div></el-col>
                <el-col :span="6"><div align='left'>预期收益：{{earn}}</div></el-col>
                <el-col :span="6"><div align='left'>正确率要求：无</div></el-col>
                <el-col :span="6"><div align='left'>截止日期：2020-11-20</div></el-col>
            </el-row>
            <el-divider></el-divider>
            <el-row>
                <el-col :span="24"><div align='left'>题目描述：{{descr}}</div></el-col>
            </el-row>
            <el-divider></el-divider>
            <el-button>开始做题</el-button>
        </el-main>

    </el-container>
</template>

<script>
    import TaskCard from "@/components/task/TaskCard";
    import Stick from "vue-stick"
    import fun from "@/net/task"

    export default {
        name: "TaskView",
        components: {

        },
        data() {
            return {
                title: '题目标题',
                number:20,
                descr:'题目描述介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍',
                type:'选择题',
                earn:'10'
            }
        },
        mounted: function () {

        },
        methods: {
        }
    }
</script>

<style scoped>
    .title {
        font-size: x-large;
        font-weight: bolder;
    }
</style>