<template>
    <el-main>
        <DoTaskTemplate :data="problemList" @onSubmit="submitAnswer"/>
    </el-main>
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
                problemList: [],
            }
        },
        mounted: function () {
            this.miniTaskId = this.$route.params.id
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
                                this.$router.go(-1)
                            }
                        }).catch(err => {
                        this.$message.error(err.toString())
                    })
                }
            }
        }
    }
</script>

<style scoped>
</style>