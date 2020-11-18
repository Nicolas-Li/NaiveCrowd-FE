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
                <el-button :loading="loading" @click="chooseTask">{{ showButton }}</el-button>
            </el-col>
        </el-row>
    </el-card>
</template>

<script>
    import fun from "@/net/task"
    import util from "@/util"

    export default {
        name: "Task",
        props: {
            task: {
                title: "标题",
                time: new Date().getTime(),
                intro: "介绍",
                id: "3a4d567",
                status: 0
            }
        },
        data() {
            return {
                percentage: 0,
                loading: false
            }
        }
        ,
        computed: {
            showDate() {
                return util.showDate(this)
            }
            ,
            showStatus() {
                return util.showStatus(this.task.status)
            }
            ,
            showButton() {
                let statusList = ["配置任务", "发布任务", "终止任务", "我要验收", "我要结算", "导出任务"]
                let statusLoadingList = ["进入配置", "正在发布", "正在终止", "进入验收", "进入结算", "正在导出"]
                return this.loading ? statusLoadingList[this.task.status] : statusList[this.task.status]
            }
            ,
        }
        ,
        mounted: function () {
            if (this.task.status === 2) {
                util.getTaskProgress(this)
            }
        }
        ,
        methods: {
            chooseTask() {
                this.loading = true
                switch (this.task.status) {
                    // 配置任务
                    case 0:
                        this.$router.push({
                            name: 'configuration',
                            params: this.task
                        })
                        break
                    // 发布任务
                    case 1:
                        fun.beforeReleaseTask(this.task.id)
                            .then(res => {
                                let data = res.data
                                if (data.type === "failed") {
                                    this.loading = false
                                    this.$message.error(data.message)
                                } else if (data.type === "success") {
                                    let taskMoney = data.taskMoney
                                    let demanderMoney = data.demanderMoney
                                    if (taskMoney > demanderMoney) {
                                        this.loading = false
                                        this.$message.warning("任务发布需要资金" + util.money(taskMoney)
                                            + "\n但您只有" + util.money(demanderMoney)
                                            + "\n请充值")
                                    } else {
                                        fun.releaseTask(this.task.id)
                                            .then(res => {
                                                let data = res.data
                                                this.loading = false
                                                if (data.type === "failed") {
                                                    this.$message.error(data.message)
                                                } else if (data.type === "success") {
                                                    this.$message.success("任务发布成功")
                                                    this.task.status = 2
                                                }
                                            }).catch(err => {
                                            this.loading = false
                                            this.$message.error(err.toString())
                                        })
                                    }
                                }
                            }).catch(err => {
                            this.loading = false
                            this.$message.error(err.toString())
                        })
                        break
                    // 终止任务
                    case 2:
                        fun.terminateTask(this.task.id)
                            .then(res => {
                                let data = res.data
                                this.loading = false
                                if (data.type === "failed") {
                                    this.$message.error(data.message)
                                } else if (data.type === "success") {
                                    this.$message.success("任务终止成功")
                                    this.task.status = 3
                                }
                            }).catch(err => {
                            this.loading = false
                            this.$message.error(err.toString())
                        })
                        break
                    // 验收任务
                    case 3:
                        this.$router.push({
                            name: 'acceptance',
                            params: this.task
                        })
                        break
                    // 结算任务
                    case 4:
                        fun.settleTask(this.task.id).then(res => {
                            let data = res.data
                            if (data.type === "failed") {
                                this.$message.error(data.message)
                            } else if (data.type === "success") {
                                this.$message.success(data.message)
                                this.task.status = 5
                            }
                        }).catch(err => {
                            this.$message.error(err.toString())
                        })
                        break
                    // 导出任务
                    case 5:
                        fun.exportTask(this.task.id).then(res => {
                            let data = res.data
                            if (data.type === "failed") {
                                this.$message.error(data.message)
                            } else if (data.type === "success") {
                                this.$message.success(data.message)
                                window.open(data.resultUrl)
                            }
                            this.loading = false
                        }).catch(err => {
                            this.loading = false
                            this.$message.error(err.toString())
                        })
                        break
                    default:
                        this.loading = false
                        this.$message.warning("任务状态出错啦，请刷新页面")
                        break
                }
            }
            ,
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