<template>
    <el-main v-if="task.id">
        <h1>验收任务</h1>
        <el-row>
            <el-col :span="span.miniTasks">
                <h4>小任务列表</h4>
                <i :key="miniTasksId" v-for="(miniTasksId, index) in miniTasksIdList">
                    <el-button @click="seeAnswersOfUsers(miniTasksId, index)" class="singleButton" icon="el-icon-edit"
                               plain
                               round
                               type="success">
                        小任务{{ normalIndex(miniTasksIdList.length, index) }}
                    </el-button>
                </i>
            </el-col>
            <el-col :span="span.answersOfUsers">
                <el-row>
                    <el-col :span="20"><h4>小任务{{ miniTasksIndex }}用户答案列表</h4></el-col>
                    <el-col :span="4">
                        <el-button @click="hideAnswer" circle icon="el-icon-s-unfold"
                                   type="info"/>
                    </el-col>
                </el-row>
                <i :key="answerId" v-for="(answerId, index) in answersOfUsersIdList">
                    <el-button @click="seeAnswersOfUser(answerId)" class="singleButton" icon="el-icon-edit" plain
                               round
                               type="warning">
                        答案{{ normalIndex(answersOfUsersIdList.length, index) }}
                    </el-button>
                </i>
            </el-col>
        </el-row>
        <el-dialog :visible.sync="dialogVisible">
            {{ dialogAnswer }}
            <el-button @click="refuseAnswer" type="warning">拒绝</el-button>
            <el-button @click="acceptAnswer" type="success">接受</el-button>
        </el-dialog>
    </el-main>
</template>

<script>
    import fun from "@/net/task"

    export default {
        name: "Acceptance",
        data() {
            return {
                task: {
                    title: "任务标题",
                    intro: "任务介绍"
                },
                span: {
                    miniTasks: 24,
                    answersOfUsers: 0
                },
                miniTasksIdList: ["id"],
                miniTasksIndex: null,
                answersOfUsersIdList: ["id"],

                dialogVisible: false,
                dialogAnswerId: null,
                dialogAnswer: {
                    userID: null,
                    content: null,
                    choice: null,
                    judgement: null
                },
            }
        },
        mounted: function () {
            if (this.assertTaskId()) {
                this.seeMiniTasksOfTask()
            }
        },
        methods: {
            normalIndex: function (listLength, index) {
                let len = (listLength - 1).toString().length
                return (Array(len).join("0") + index).slice(-len)
            },
            assertTaskId() {
                let task = this.$route.params
                if (task.id && Number(task.status) === 3) {
                    this.task = task
                    return true
                } else {
                    this.$message.error("验收出错啦！即将返回前一页面")
                    setTimeout(() => {
                        this.$router.back()
                    }, 1500)
                }
                return false
            },
            seeMiniTasksOfTask() {
                this.miniTasksIdList = []
                fun.getMiniTasks(this.task.id)
                    .then(res => {
                        let data = res.data
                        if (data.type === "success") {
                            this.miniTasksIdList = data.miniTasksIdList
                        } else if (data.type === "failed") {
                            this.$message.error(data.message)
                        }
                    }).catch(err => {
                    this.$message.error(err.toString())
                })
            },
            seeAnswersOfUsers(miniTasksId, index) {
                this.answersOfUsersIdList = []
                fun.getAnswerIds(miniTasksId)
                    .then(res => {
                        let data = res.data
                        if (data.type === "success") {
                            this.miniTasksIndex = index
                            this.showAnswer()
                            this.answersOfUsersIdList = data.answersOfUsersIdList
                        } else if (data.type === "failed") {
                            this.$message.error(data.message)
                        }
                    }).catch(err => {
                    this.$message.error(err.toString())
                })
            },
            showAnswer() {
                this.span = {
                    miniTasks: 12,
                    answersOfUsers: 12
                }
            },
            hideAnswer() {
                this.span = {
                    miniTasks: 24,
                    answersOfUsers: 0
                }
            },
            seeAnswersOfUser(answerId) {
                this.dialogAnswerId = answerId
                fun.getProblemsAndUsers(this.dialogAnswerId)
                    .then(res => {
                        let data = res.data
                        if (data.type === "success") {
                            this.dialogAnswer = {
                                userID: data.userID,
                                content: data.content,
                                choice: data.choice,
                                judgement: data.judgement
                            }
                            this.dialogVisible = true
                        } else if (data.type === "failed") {
                            this.$message.error(data.message)
                        }
                    }).catch(err => {
                    this.$message.error(err.toString())
                })
            },
            refuseAnswer() {
                fun.refuseAnswer(this.dialogAnswerId)
                    .then(res => {
                        let data = res.data
                        if (data.type === "success") {
                            this.$message.success(data.message)
                        } else if (data.type === "failed") {
                            this.$message.error(data.message)
                        }
                        this.acceptAnswer()
                    }).catch(err => {
                    this.acceptAnswer()
                    this.$message.error(err.toString())
                })
            },
            acceptAnswer() {
                this.dialogVisible = false
            }
        },
    }
</script>

<style scoped>
    .singleButton {
        margin: 3px 5px 3px 5px;
    }
</style>