<template>
    <el-main>
        <el-button @click="getMiniTasksId">换一个</el-button>
        <DoTask :data="problemList" @onSubmit="submitAnswer"/>
    </el-main>
</template>

<script>
    import DoTask from "@/components/task/user/DoTask";
    import fun from "@/net/doTask"

    export default {
        name: "Distribute",
        components: {
            DoTask,
        },
        data() {
            return {
                miniTaskId: null,
                problemList: [],
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