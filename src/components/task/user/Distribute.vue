<template>
<div>
        <el-button @click="getMiniTasksId">换一个</el-button>
        <DoTaskTemplate :data="problemList" :maxtime="miniTasksTime" @onSubmit="submitAnswer"/>
</div>
</template>

<script>
    import DoTaskTemplate from "@/components/task/user/DoTaskTemplate";
    import fun from "@/net/doTask"

    export default {
        name: "Distribute",
        components: {
            DoTaskTemplate,
        },
        data() {
            return {
                miniTaskId: null,
                problemList: [{description:'1',type:'choice',choice:['1','2']}],
                miniTasksTime:3689,
            }
        },
        mounted: function () {
            this.getMiniTasksId()
        },
        methods: {
            getMiniTasksId: function () {
                fun.distributeMiniTask().then(res => {
                    let data = res.data
                    if (data.type === "failed") {
                        this.$message.error(data.message)
                    } else if (data.type === "success") {
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
                        fun.getInfoOfTask(this.miniTaskId)
                        .then(res => {
                            let data = res.data
                            if (data.type === "failed") {
                                this.$message.error(data.message)
                            } else {
                                this.miniTasksTime = data.miniTasksTime
                            }
                        }).catch(err => {
                        this.$message.error(err.toString())
                })
                    }
                }).catch(err => {
                    this.$message.error(err.toString())
                })
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
                            this.getMiniTasksId()
                        }
                    }).catch(err => {
                    this.$message.error(err.toString())
                })
            }
        }
    }
</script>

<style scoped>
</style>