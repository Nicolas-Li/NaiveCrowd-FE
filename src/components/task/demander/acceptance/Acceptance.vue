<template>
    <el-container v-if="task.id">
        <el-header>
            <el-row>
                <el-col :span="16">
                    {{ answerProgress.totNum }}份答案中，检查了{{ answerProgress.checkNum }}份答案，
                    拒绝了{{ answerProgress.refuseNum }}份答案
                </el-col>
                <el-col :span="8">
                    <el-button plain round
                               type="primary"
                               v-if="answerProgress.refuseNum > 0"
                               @click="continueRelease">继续分发
                    </el-button>
                    <el-button @click="settleTask" plain round type="warning">结算任务</el-button>
                </el-col>
            </el-row>
            <el-menu mode="horizontal">
                <el-row>
                    <el-col :span="8">
                        <el-menu-item index="1" @click="currentIndex=1">
                            <i class="el-icon-s-opportunity"></i>
                            <span slot="title">按小任务验收</span>
                        </el-menu-item>
                    </el-col>
                    <el-col :span="8">
                        <el-menu-item index="2" @click="currentIndex=2">
                            <i class="el-icon-s-check"></i>
                            <span slot="title">按用户验收</span>
                        </el-menu-item>
                    </el-col>
                    <el-col :span="8">
                        <el-menu-item index="3" @click="currentIndex=3">
                            <i class="el-icon-s-release"></i>
                            <span slot="title">平台反作弊</span>
                        </el-menu-item>
                    </el-col>
                </el-row>
            </el-menu>
        </el-header>
        <el-main>
            <ByMiniTasks :task="task" v-if="currentIndex === 1" @refuse="getAnswerProgress"/>
            <AutoCheck :task="task" v-if="currentIndex === 3" @refuse="getAnswerProgress"/>
        </el-main>
    </el-container>
</template>

<script>
    import ByMiniTasks from "@/components/task/demander/acceptance/ByMiniTasks"
    import AutoCheck from "@/components/task/demander/acceptance/AutoCheck"
    import fun from "@/net/task"
    import util from "@/util"

    export default {
        name: "Acceptance",
        components: {
            ByMiniTasks,
            AutoCheck,
        },
        data() {
            return {
                currentIndex: 1,
                answerProgress: {
                    totNum: 100,
                    checkNum: 10,
                    refuseNum: 1,
                },
                task: {
                    title: "任务标题",
                    intro: "任务介绍"
                },
            }
        },
        mounted: function () {
            this.assertTaskId()
        },
        methods: {
            assertTaskId() {
                let task = this.$route.params
                if (task.id && Number(task.status) === 3) {
                    this.task = task
                    this.getAnswerProgress()
                    return true
                } else {
                    util.toIndex(this, "验收出错啦！即将返回主页面")
                }
                return false
            },
            settleTask() {
                fun.settleTask(this.task.id).then(res => {
                    let data = res.data;
                    if (data.type === "failed") {
                        this.$message.error(data.message)
                    } else if (data.type === "success") {
                        this.$message.success(data.message)
                        this.$router.push({path: '/main/task/demander'})
                    }
                }).catch(err => {
                    this.$message.error(err.toString())
                })
            },
            continueRelease() {
                fun.continueRelease(this.task.id).then(res => {
                    let data = res.data;
                    if (data.type === "failed") {
                        this.$message.error(data.message)
                    } else if (data.type === "success") {
                        this.$message.success(data.message)
                        this.$router.push({path: '/main/task/demander'})
                    }
                }).catch(err => {
                    this.$message.error(err.toString())
                })
            },
            getAnswerProgress() {
                fun.getAnswerProgress(this.task.id).then(res => {
                    let data = res.data;
                    if (data.type === "failed") {
                        this.$message.error(data.message)
                    } else if (data.type === "success") {
                        this.answerProgress = {
                            totNum: data.totNum,
                            checkNum: data.checkNum,
                            refuseNum: data.refuseNum,
                        }
                    }
                }).catch(err => {
                    this.$message.error(err.toString())
                })
            }
        },
    }
</script>

<style scoped>
</style>