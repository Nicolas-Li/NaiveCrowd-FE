<template>
    <el-card class="card">
        <el-image :src="task.cover"
                  fit="cover" style="width: 305px;height:140px;text-align:center;display: table-cell;"
                  v-if="task.cover"/>
        <h1>{{ task.title }}</h1>
        <p>{{ showStatus }}</p>
        <p>截止日期:{{ showDate }}</p>
        <el-button v-if="$cookies.get('identity') === 'user'" @click="goToTaskView">查看详情</el-button>
    </el-card>
</template>

<script>
    export default {
        name: "TaskCard",
        props: {
            task: {},
        },
        methods: {
            goToTaskView() {
                this.$router.push({name: 'taskView', params: {task: this.task}})
            }
        },
        computed: {
            showStatus() {
                let statusList = ["未配置", "待发布", "发布中", "待验收", "待结算", "任务结束"]
                return statusList[this.task.status]
            },
            showDate() {
                let t = new Date()
                t.setTime(this.task.time)
                return t.toLocaleString()
            },
        }
    }
</script>

<style scoped>
    .card {
        border-radius: 10px;
        margin-bottom: -10px;
        width: 310px;
        height: 360px;
        overflow: hidden;
    }

    p {
        font-size: 15px;
    }
</style>