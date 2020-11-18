<template>
    <el-main>
        <el-button @click="drawerVisible=!drawerVisible">{{ drawerVisible ? '关闭' : '打开'}}任务列表</el-button>
        <el-drawer
                title="小任务列表"
                :visible.sync="drawerVisible"
                direction="ltr">
            <i :key="miniTasksId" v-for="(miniTasksId, index) in miniTasksIdList">
                <el-button @click="seeAnswersOfUsers(miniTasksId, index)" class="singleButton"
                           icon="el-icon-edit"
                           plain
                           round
                           type="success">
                    小任务{{ normalIndex(miniTasksIdList.length, index) }}
                </el-button>
            </i>
        </el-drawer>
        <el-row>
            <el-col :span="12">
                <el-card v-for="problem in problemList" :key="problem.description">
                    <div slot="header">
                        {{ problem.description }}
                    </div>
                    <div>
                        {{ problem.type }}
                    </div>
                    <div>
                        {{ problem.choice }}
                    </div>
                    <div>
                        {{ problem.imageUrl }}
                    </div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <i :key="answerId" v-for="(answerId, index) in answersOfUsersIdList">
                    <el-button @click="seeAnswersOfUser(answerId)" class="singleButton"
                               icon="el-icon-edit"
                               plain
                               round
                               type="primary">
                        用户答案{{ normalIndex(answersOfUsersIdList.length, index) }}
                    </el-button>
                </i>
                <el-drawer
                        :title="userInfo.name+'的答案'"
                        :visible.sync="answerDrawerVisible"
                        direction="rtl">
                    <el-row>
                        <el-col :span="12">
                            <el-button @click="answerDrawerVisible=false">验收通过</el-button>
                            <el-button @click="refuseAnswer">拒绝通过</el-button>
                        </el-col>
                    </el-row>
                    <div>
                        用户名：{{ userInfo.name }}
                    </div>
                    <div>
                        信誉值：{{ userInfo.credit }}
                    </div>
                    <div>
                        历史接受率：{{ userInfo.acceptRate }}
                    </div>
                    <div>
                        做了{{ userInfo.answerNum }}份关于该任务的小任务
                    </div>
                    <el-card v-for="content in contentList" :key="content.content">
                        {{ content }}
                    </el-card>
                </el-drawer>
            </el-col>
        </el-row>
    </el-main>
</template>

<script>
    import fun from "@/net/task"

    export default {
        name: "ByMiniTasks",
        props: {
            task: null
        },
        data() {
            return {
                drawerVisible: true,
                // 小任务列表
                miniTasksIdList: [],
                miniTasksIndex: null,
                // 答案列表
                answersOfUsersIdList: [],
                problemList: [{
                    description: null,
                    type: null,
                    choice: null,
                    imageUrl: null
                }],
                // 详细答案
                answerDrawerVisible: false,
                answerId: null,
                userInfo: {
                    name: "unknown",
                    credit: 100,
                    acceptRate: 1,
                    answerNum: 0
                },
                contentList: [{
                    content: 'none'
                }],
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
            seeAnswersOfUsers(miniTasksId) {
                this.answersOfUsersIdList = []
                fun.getAnswerIds(miniTasksId)
                    .then(res => {
                        let data = res.data
                        if (data.type === "success") {
                            this.drawerVisible = false
                            this.answersOfUsersIdList = data.answersOfUsersIdList
                            this.problemList = data.problemList
                        } else if (data.type === "failed") {
                            this.$message.error(data.message)
                        }
                    }).catch(err => {
                    this.$message.error(err.toString())
                })
            },
            seeAnswersOfUser(answerId) {
                if (this.answerId !== answerId) {
                    this.answerId = null
                    fun.getProblemsAndUsers(answerId)
                        .then(res => {
                            let data = res.data
                            if (data.type === "success") {
                                this.answerDrawerVisible = true
                                this.answerId = answerId
                                this.userInfo = data.userInfo
                                this.contentList = data.contentList
                            } else if (data.type === "failed") {
                                this.$message.error(data.message)
                            }
                        }).catch(err => {
                        this.$message.error(err.toString())
                    })
                } else {
                    this.answerDrawerVisible = true
                }
            },
            refuseAnswer() {
                fun.refuseAnswer(this.answerId)
                    .then(res => {
                        let data = res.data
                        if (data.type === "success") {
                            this.$message.success(data.message)
                        } else if (data.type === "failed") {
                            this.$message.error(data.message)
                        }
                    }).catch(err => {
                    this.$message.error(err.toString())
                })
            },
        },
    }
</script>

<style scoped>
.singleButton {
    margin: 2px 3px 3px 2px;
}
</style>