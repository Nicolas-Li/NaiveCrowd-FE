<template>
    <el-card class="card">
        <el-row>
            <el-col :span="18" class="title">
                {{ task.title }}
            </el-col>
            <el-col :span="6">
                {{ showStatus }}
                <el-progress :percentage="percentage" :stroke-width="16" :text-inside="true" v-if="task.status === 2"/>
            </el-col>
        </el-row>
        <p>{{ task.intro }}</p>
        <el-row>
            <el-col :span="14">
                <el-row :span="18">{{ showDate }}</el-row>
                <el-row :span="6">截止时间</el-row>
            </el-col>
            <el-col :span="10">
                <el-button :loading="loading" @click="chooseTask">查看详情</el-button>
            </el-col>
        </el-row>
    </el-card>
</template>

<script>
    import fun from "@/net/task"

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
        data() {
            return {
                loading: false,
                percentage: 0
            }
        },
        computed: {
            showStatus() {
                let statusList = ["未配置", "待发布", "发布中", "待验收", "待结算", "任务结束"]
                return statusList[this.task.status]
            },
            showDate() {
                let t = new Date()
                t.setTime(this.task.time)
                return t.toLocaleString()
            },
        },
        mounted: function () {
            if (this.task.status === 2) {
                this.loading = true
                fun.getTaskProgress(this.task.id)
                    .then(res => {
                        let data = res.data
                        this.loading = false
                        if (data.type === "failed") {
                            this.$message.error(data.message)
                        } else if (data.type === "success") {
                            this.percentage = Math.round(Math.min(data.answersNum * 100.0 / data.totalNum, 100))
                        }
                    }).catch(err => {
                    this.loading = false
                    this.$message.error(err.toString())
                })
            }
        },
        methods: {
            chooseTask() {
                this.$router.push({name: 'taskView', params: {task: this.task}})
            },
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