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
                <el-button :loading="loading" @click="chooseTask">{{ showButton }}</el-button>
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
                loading: false
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
            showButton() {
                let statusList = ["配置任务", "发布任务", "终止任务", "我要验收", "我要结算", "查看详情"]
                let statusLoadingList = ["进入配置", "正在发布", "正在终止", "进入验收", "进入结算", "进入详情"]
                return this.loading ? statusLoadingList[this.task.status] : statusList[this.task.status]
            },
        },
        methods: {
            chooseTask() {
                this.loading = true
                switch (this.task.status) {
                    case 0:
                        this.$router.push({
                            name: 'configuration',
                            params: this.task
                        })
                        break
                    case 1:
                        fun.releaseTask(this.task.id)
                            .then(res => {
                                let data = res.data
                                if (data.type === "failed") {
                                    this.$message.error(data.message)
                                } else if (data.type === "success") {
                                    this.$message.success("任务发布成功")
                                    this.task.status += 1
                                }
                            }).catch(err => {
                            this.loading = false
                            this.$message.error(err.toString())
                        })
                        break
                    case 2:
                        fun.terminateTask(this.task.id)
                            .then(res => {
                                let data = res.data
                                if (data.type === "failed") {
                                    this.$message.error(data.message)
                                } else if (data.type === "success") {
                                    this.$message.success("任务终止成功")
                                    this.task.status += 1
                                }
                            }).catch(err => {
                            this.loading = false
                            this.$message.error(err.toString())
                        })
                        break
                    case 3:
                        this.$router.push({
                            name: 'acceptance',
                            params: this.task
                        })
                        break
                    case 4:
                        break
                    case 5:
                        break
                    default:
                        this.loading = false
                        this.$message.error("任务状态出错啦，请刷新页面")
                        break
                }
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