<template>
    <el-card class="card">
        <el-row>
            <el-col :span="18" class="title">
                {{ task.title }}
            </el-col>
            <el-col :span="6">
                {{ showStatus }}
                <el-progress :percentage="percentage" :stroke-width="16" :text-inside="true" v-if="task.status === 2"/>
            </el-col>
        </el-row>
        <p>{{ task.intro }}</p>
        <el-row>
            <el-col :span="14">
                <el-row :span="18">{{ showDate }}</el-row>
                <el-row :span="6">截止时间</el-row>
            </el-col>
            <el-col :span="10">
                <el-button :loading="loading" @click="chooseTask">查看详情</el-button>
            </el-col>
        </el-row>
    </el-card>
</template>

<script>
    import util from "@/components/task/util"

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
                loading: false,
                percentage: 0
            }
        },
        computed: {
            showStatus() {
                return util.showStatus(this.task.status)
            },
            showDate() {
                return util.showDate(this)
            },
        },
        mounted: function () {
            if (this.task.status === 2) {
                this.loading = true
                util.getTaskProgress(this)
            }
        },
        methods: {
            chooseTask() {
                this.$router.push({name: 'taskView', params: {task: this.task}})
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