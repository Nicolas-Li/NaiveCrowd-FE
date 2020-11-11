<template>
    <el-container>
        <el-header class='title'>{{task.title}}</el-header>
        <el-main>
            <el-divider></el-divider>
            <el-row :gutter="20">
                <el-col :span="6">
                    <div align='left'>题目数量：{{task.problemsNum}}</div>
                </el-col>
                <el-col :span="6">
                    <div align='left'>题目类型：{{type}}</div>
                </el-col>
                <el-col :span="6">
                    <div align='left'>预期收益：{{task.bonus}}</div>
                </el-col>
                <el-col :span="6">
                    <div align='left'>做题时间：{{miniTaskTime}}min</div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col>
                    <div align='left'>截止日期：{{showDate}}</div>
                </el-col>
            </el-row>
            <el-divider></el-divider>
            <el-row>
                <el-col :span="24">
                    <div align='left'>题目描述：{{task.intro}}</div>
                </el-col>
            </el-row>
            <el-divider></el-divider>
            <div v-if="$cookies.get('identity') === 'user'">
                <el-button :disabled="task.isFavor" @click="favor">{{ task.isFavor ? "已收藏" : "收藏" }}</el-button>
                <el-button @click="doTask">开始做题</el-button>
            </div>
        </el-main>

    </el-container>
</template>

<script>
    import fun from "@/net/task"

    export default {
        name: "TaskView",
        components: {},
        data() {
            return {
                task: {},
                type: "选择题",
                miniTaskTime: 20,
            }
        },
        mounted: function () {
            let task = this.$route.query.task
            if (task.id) {
                this.task = task
                fun.isFavor(task.id).then(res => {
                    if (res.data.type === "failed") {
                        this.$message.error(res.data.message)
                    } else {
                        this.task.isFavor = res.data.info === "yes"
                    }
                }).catch(err => {
                    this.$message.error(err.toString())
                })
            } else {
                this.$message.warning("详情出错啦！即将返回前一页面")
                setTimeout(() => {
                    this.$router.back()
                }, 1500)
            }
        },
        methods: {
            doTask() {
                fun.getMiniTaskByTask(this.task.id)
                    .then(res => {
                        if (res.data.type === "failed") {
                            this.$message.error(res.data.message)
                        } else {
                            this.$router.push({
                                name: 'doTask',
                                params: {id: res.data.id}
                            })
                        }
                    }).catch(err => {
                    this.$message.error(err.toString())
                })
            },
            favor() {
                if (!this.task.isFavor) {
                    fun.favor(this.task.id)
                        .then(res => {
                            if (res.data.type === "failed") {
                                this.$message.error(res.data.message)
                            } else {
                                this.$message.success(res.data.message)
                                this.task.isFavor = true
                            }
                        }).catch(err => {
                        this.$message.error(err.toString())
                    })
                }
            }
        },
        computed: {
            showDate() {
                let t = new Date()
                t.setTime(this.task.time)
                return t.toLocaleString()
            },
        }
    }
</script>

<style scoped>
    .title {
        font-size: x-large;
        font-weight: bolder;
    }
</style>