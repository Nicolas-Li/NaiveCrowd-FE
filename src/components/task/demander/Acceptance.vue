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
            hhh
        </el-dialog>
    </el-main>
</template>

<script>
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
                } else {
                    this.$message.error("验收出错啦！即将返回前一页面")
                    setTimeout(() => {
                        this.$router.back()
                    }, 1500)
                }
            },
            seeAnswersOfUsers(miniTasksId, index) {
                console.log(miniTasksId)
                this.miniTasksIndex = index
                this.showAnswer()
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
                console.log(answerId)
                this.dialogVisible = true
            },
            normalIndex: function (listLength, index) {
                let len = (listLength - 1).toString().length
                return (Array(len).join("0") + index).slice(-len)
            }
        },
    }
</script>

<style scoped>
    .singleButton {
        margin: 3px 5px 3px 5px;
    }
</style>