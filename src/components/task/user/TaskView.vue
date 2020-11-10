<template>
    <el-container>
        <el-header class='title'>{{title}}</el-header>
        <el-main>
            <el-divider></el-divider>
            <el-row :gutter="20">
                <el-col :span="6"><div align='left'>题目数量：{{number}}</div></el-col>
                <el-col :span="6"><div align='left'>题目类型：{{type}}</div></el-col>
                <el-col :span="6"><div align='left'>预期收益：{{earn}}</div></el-col>
                <el-col :span="6"><div align='left'>做题时间：{{miniTaskTime}}min</div></el-col>
                <el-col :span="6"><div align='left'>截止日期：2020-11-20</div></el-col>
            </el-row>
            <el-divider></el-divider>
            <el-row>
                <el-col :span="24"><div align='left'>题目描述：{{descr}}</div></el-col>
            </el-row>
            <el-divider></el-divider>
            <el-button @click="doTask">开始做题</el-button>
        </el-main>

    </el-container>
</template>

<script>
    export default {
        name: "TaskView",
        components: {

        },
        data() {
            return {
                task: null,
                id:'',
                title: '题目标题',
                number:20,
                descr:'题目描述介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍',
                type:'选择题',
                earn:'10',
                miniTaskTime:'30'
            }
        },
        mounted: function () {
            let task = this.$route.params
            if (task.id && Number(task.status) === 0) {
                this.task = task
            } else {
                this.$message.warning("详情出错啦！即将返回前一页面")
                setTimeout(() => {
                    this.$router.back()
                }, 1500)
            }
        },
        methods: {
            doTask(){
                this.$router.push('/main/task/do')
            }
        }
    }
</script>

<style scoped>
    .title {
        font-size: x-large;
        font-weight: bolder;
    }
</style>