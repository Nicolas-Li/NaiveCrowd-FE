<template>
    <el-card class="card">
        <el-row>
            <el-col :span="19" class="title">
                {{ task.title }}
            </el-col>
            <el-col :span="5">
                {{ showStatus }}
            </el-col>
        </el-row>
        <p>{{ task.intro }}</p>
        <el-row>
            <el-col :span="14">
                <el-row :span="18">{{ showDate }}</el-row>
                <el-row :span="6">截止时间</el-row>
            </el-col>
            <el-col :span="10">
                <el-button @click="TaskView">{{ showButton }}</el-button>
            </el-col>
        </el-row>
    </el-card>
</template>

<script>
    export default {
        name: "Task",
        props: {
            task: {
                type: Object,
                default: () => {
                    return {
                        id: "3a4d567",
                        title: "标题",
                        intro: "介绍",
                        status: 0,
                        time: new Date().getTime()
                    }
                }
            }
        },
        mounted: function () {
            // console.log(this.task.status)
        },
        data() {
            return {
            }
        },
        computed: {
            showStatus() {
                let statusList = ["未完成","待验收","待结算","奖励待领取","任务结束"]
                return statusList[this.task.status]
            },
            showDate() {
                let t = new Date()
                t.setTime(this.task.time)
                return t.toLocaleString()
            },
            showButton() {
                let statusList = ["开始做题","查看详情","查看详情","我要领取","查看详情"]
                return statusList[this.task.status]
            },
        },
        methods: {
            TaskView(){
                this.$router.push('/main/task/view')
            }
        }
    }
</script>

<style scoped>
    .card {
        border-radius: 20px;
        margin-bottom: -10px;
        width: 400px;
        overflow: hidden;
    }
    .title {
        font-size: x-large;
        font-weight: bolder;
    }
</style>