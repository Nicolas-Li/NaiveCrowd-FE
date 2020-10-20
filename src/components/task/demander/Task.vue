<template>
    <el-card class="card">
        <el-row>
            <el-col :span="19" class="title">
                {{ task.title }}
            </el-col>
            <el-col :span="5">
                {{ showStatus }}
            </el-col>
        </el-row>
        <p>{{ task.intro }}</p>
        <el-row>
            <el-col :span="14">
                <el-row :span="18">{{ showDate }}</el-row>
                <el-row :span="6">截止时间</el-row>
            </el-col>
            <el-col :span="10">
                <el-button @click="chooseTask">{{ showButton }}</el-button>
            </el-col>
        </el-row>
    </el-card>
</template>

<script>
    export default {
        name: "Task",
        props: {
            task: {
                type: Object,
                default: () => {
                    return {
                        id: "3a4d567",
                        title: "标题",
                        intro: "介绍",
                        status: 0,
                        time: new Date().getTime()
                    }
                }
            }
        },
        data() {
            return {
            }
        },
        computed: {
            showStatus() {
                let statusList = ["未配置","待发布","发布中","待验收","待结算","任务结束"]
                return statusList[this.task.status]
            },
            showDate() {
                let t = new Date()
                t.setTime(this.task.time)
                return t.toLocaleString()
            },
            showButton() {
                let statusList = ["配置任务","发布任务","终止任务","我要验收","我要结算","查看详情"]
                return statusList[this.task.status]
            },
        },
        methods: {
            chooseTask() {
                switch (this.task.status) {
                    case 0:
                        this.$router.push({
                            name: 'configuration',
                            params: this.task
                        })
                        break
                }
            },
        }
    }
</script>

<style scoped>
    .card {
        border-radius: 20px;
        margin-bottom: -10px;
        width: 400px;
        overflow: hidden;
    }
    .title {
        font-size: x-large;
        font-weight: bolder;
    }
</style>