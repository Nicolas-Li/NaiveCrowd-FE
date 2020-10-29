<template>
    <el-row>
        <el-col :span="span.miniTasks">
            <h4>小任务列表</h4>
            <i :key="miniTasksId" v-for="(miniTasksId, index) in miniTasksIdList">
                <el-button @click="seeAnswersOfUsers(miniTasksId, index)" class="singleButton"
                           icon="el-icon-edit"
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
</template>

<script>
    import fun from "@/net/task";

    export default {
        name: "ByMiniTasks",
        props: {
            task: null
        },
        data() {
            return {
                span: {
                    miniTasks: 24,
                    answersOfUsers: 0,
                },
                miniTasksIdList: ["id"],
                miniTasksIndex: null,
                answersOfUsersIdList: ["id"],
            }
        },
        mounted: function() {
            this.seeMiniTasksOfTask()
        },
        methods: {
            normalIndex: function (listLength, index) {
                let len = (listLength - 1).toString().length
                return (Array(len).join("0") + index).slice(-len)
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
                console.log(this.task)
                console.log("ddd")
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

</style>