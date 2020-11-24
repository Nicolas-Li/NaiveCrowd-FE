<template>
    <DoTaskTemplate :data="problemList" :maxTime="task.doTime" :isTimer="true"
                    @onSubmit="submitAnswer"
                    @timeIsOut="timeIsOut"/>
</template>

<script>
    import DoTaskTemplate from "@/components/task/user/DoTaskTemplate";
    import fun from "@/net/doTask"

    export default {
        name: "DoTask",
        components: {
            DoTaskTemplate,
        },
        data() {
            return {
                miniTaskId: null,
                task: null,
                problemList: [],
            }
        },
        mounted: function () {
            this.miniTaskId = this.$route.params.id
            this.task = this.$route.params.task
            if (this.miniTaskId) {
                fun.getProblems(this.miniTaskId)
                    .then(res => {
                        let data = res.data
                        if (data.type === "failed") {
                            this.$message.error(data.message)
                        } else {
                            this.problemList = data.data
                        }
                    }).catch(err => {
                    this.$message.error(err.toString())
                })
            }
        },
        methods: {
            submitAnswer(answer) {
                let flag = true
                let i = 0
                for (; i < this.problemList.length; i++) {
                    if (answer[i] == null) {
                        flag = false
                        break
                    }
                }
                if (!flag) this.$message.error("第" + (String)(i + 1) + "题未完成")
                else {
                    fun.submitAnswer(answer, this.miniTaskId)
                        .then(res => {
                            let data = res.data
                            if (data.type === "failed") {
                                this.$message.error(data.message)
                            } else {
                                this.$message.success(data.message)
                                this.$router.push({name: 'taskView', params: {task: this.task}})
                            }
                        }).catch(err => {
                        this.$message.error(err.toString())
                    })
                }
            },
            timeIsOut() {
                fun.timeOut(this.miniTaskId)
            }
        }
    }
</script>

<style scoped>
</style>