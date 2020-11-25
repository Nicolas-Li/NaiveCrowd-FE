<template>
    <el-main>
        <i :key="answerId" v-for="(answerId, index) in warnAnswerList">
            <el-button @click="seeAnswersOfUser(answerId)" class="singleButton"
                       icon="el-icon-edit"
                       plain round type="primary">
                用户答案{{ normalIndex(answersOfUsersIdList.length, index) }}
            </el-button>
        </i>
        <el-drawer
                :title="userInfo.name+'的答案'"
                :visible.sync="answerDrawerVisible"
                direction="rtl">
            <el-row>
                <el-col v-if="!deleted">
                    <el-button @click="answerDrawerVisible=false">验收通过</el-button>
                    <el-button @click="refuseAnswer">拒绝通过</el-button>
                </el-col>
                <el-col v-if="deleted">
                    <el-button disabled>已拒绝</el-button>
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
            <el-card :key="content.content" v-for="content in contentList">
                {{ content }}
            </el-card>
        </el-drawer>
    </el-main>
</template>

<script>
    import fun from "@/net/task";

    export default {
        name: "AutoCheck",
        props: {
            task: null
        },
        data() {
            return {
                errAnswerList: [],
                warnAnswerList: [],
                // 详细答案
                answerDrawerVisible: false,
                answerId: null,
                deleted: false,
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
        mounted() {
            this.autoCheck()
        },
        methods: {
            autoCheck() {
                fun.autoCheck(this.task.id).then(res => {
                    let data = res.data;
                    if (data.type === "failed") {
                        this.$message.error(data.message)
                    } else if (data.type === "success") {
                        this.errAnswerList = data.errAnswerList
                        this.warnAnswerList = data.warnAnswerList
                        this.$message.success("自动拒绝了" + data.errAnswerList.length + "份答案")
                    }
                }).catch(err => {
                    this.$message.error(err.toString())
                })
            },
            refuseAnswer() {
                fun.refuseAnswer(this.answerId)
                    .then(res => {
                        let data = res.data
                        if (data.type === "success") {
                            this.$message.success(data.message)
                            this.$emit("refuse")
                        } else if (data.type === "failed") {
                            this.$message.error(data.message)
                        }
                    }).catch(err => {
                    this.$message.error(err.toString())
                })
            },
            seeAnswersOfUser(answerId) {
                this.answerId = null
                fun.getProblemsAndUsers(answerId)
                    .then(res => {
                        let data = res.data
                        console.log(data)
                        if (data.type === "success") {
                            this.answerDrawerVisible = true
                            this.answerId = answerId
                            this.deleted = data.deleted
                            this.userInfo = data.userInfo
                            this.contentList = data.contentList
                        } else if (data.type === "failed") {
                            this.$message.error(data.message)
                        }
                    }).catch(err => {
                    this.$message.error(err.toString())
                })
            },
        }
    }
</script>

<style scoped>

</style>