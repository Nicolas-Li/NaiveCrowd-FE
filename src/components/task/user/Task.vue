<template>
    <el-card class="card">
        <el-row>
            <span class="title">{{ task.title }}</span>
        </el-row>
        <p>{{ task.intro }}</p>
        <el-row>
            <el-col :span="14">
                <el-row :span="18">{{ showDate }}</el-row>
                <el-row :span="6">截止时间</el-row>
            </el-col>
            <el-col :span="10">
                <el-button @click="taskView">查看详情</el-button>
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
        computed: {
            showDate() {
                let t = new Date()
                t.setTime(this.task.time)
                return t.toLocaleString()
            },
        },
        methods: {
            taskView() {
                this.$router.push({
                    name: 'taskView',
                    params: this.task
                })
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