<template>
    <div>
        <el-row>
            <el-col :span="12">
                <el-button @click="getTask">换一个任务</el-button>
            </el-col>
            <el-col :span="12">
                <el-button @click="getMiniTaskByTask" v-if="miniTaskId !== null">领取任务</el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="8">
                <el-image :src="task.cover"
                          fit="cover" style="max-width: 300px"
                          v-if="task.cover"/>
            </el-col>
            <el-col :span="16">
                <h1>{{ task.title }}</h1>
                <p>任务介绍:{{ task.intro }}</p>
                <p>小任务题目数量:{{ task.num }}</p>
                <p>截止日期:{{ showDate }}</p>
            </el-col>
        </el-row>
        <el-divider/>
        <DoTaskTemplate :data="problemList" :isTimer="true" :maxtime="task.doTime"
                        @onSubmit="submitAnswer"
                        v-if="miniTaskId !== null"/>
    </div>
</template>

<script>
    import DoTaskTemplate from "@/components/task/user/DoTaskTemplate";
    import fun from "@/net/doTask"
    import allFun from "@/net/task"

    export default {
        name: "Distribute",
        components: {
            DoTaskTemplate,
        },
        data() {
            return {
                // 大任务信息
                task: {
                    id: null,
                    title: '',
                    intro: '',
                    cover: null,
                    doTime: 600,
                    num: null,
                    time: null,
                },

                // 小任务信息
                miniTaskId: null,
                problemList: [],
                miniTasksTime: 600,
            }
        },
        mounted: function () {
            this.getTask()
        },
        methods: {
            getTask() {
                this.miniTaskId = null
                fun.distributeMiniTask().then(res => {
                    let data = res.data
                    if (data.type === "failed") {
                        this.$message.error(data.message)
                    } else if (data.type === "success") {
                        this.task = {
                            id: data.id,
                            title: data.title,
                            intro: data.intro,
                            cover: data.cover,
                            doTime: data.doTime,
                            num: data.num,
                            time: data.time,
                        }
                    }
                }).catch(err => {
                    this.$message.error(err.toString())
                })
            },
            getMiniTaskByTask() {
                if (this.task.id) {
                    allFun.getMiniTaskByTask(this.task.id)
                        .then(res => {
                            if (res.data.type === "failed") {
                                this.$message.error(res.data.message)
                            } else {
                                this.miniTaskId = res.data.id
                                fun.getProblems(res.data.id).then(res => {
                                    let data = res.data
                                    if (data.type === "failed") {
                                        this.$message.error(data.message)
                                    } else if (data.type === "success") {
                                        this.problemList = data.data
                                    }
                                }).catch(err => {
                                    this.$message.error(err.toString())
                                })
                            }
                        }).catch(err => {
                        this.$message.error(err.toString())
                    })
                }
            },
            submitAnswer(answer) {
                console.log(answer)
                fun.submitAnswer(answer, this.miniTaskId)
                    .then(res => {
                        let data = res.data
                        if (data.type === "failed") {
                            this.$message.error(data.message)
                        } else if (data.type === "success") {
                            this.$message.success(data.message)
                            this.getTask()
                        }
                    }).catch(err => {
                    this.$message.error(err.toString())
                })
            },
            showDate() {
                let t = new Date()
                t.setTime(this.task.time)
                return t.toLocaleString()
            },
        }
    }
</script>

<style scoped>
</style>