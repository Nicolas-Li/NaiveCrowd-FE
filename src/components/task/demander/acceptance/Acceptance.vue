<template>
    <el-container v-if="task.id">
        <el-header>
            <el-row>
                <el-col :span="16">
                    {{ answerProgress.totNum }}份答案中，检查了{{ answerProgress.checkNum }}份答案，
                    拒绝了{{ answerProgress.refuseNum }}份答案
                </el-col>
                <el-col :span="8">
                    <el-button plain round type="primary" v-if="answerProgress.refuseNum > 0">继续分发</el-button>
                    <el-button plain round type="warning">结算任务</el-button>
                </el-col>
            </el-row>
            <el-menu mode="horizontal">
                <el-row>
                    <el-col :span="8">
                        <el-menu-item index="1">
                            <i class="el-icon-s-opportunity"></i>
                            <span slot="title">按小任务验收</span>
                        </el-menu-item>
                    </el-col>
                    <el-col :span="8">
                        <el-menu-item index="2">
                            <i class="el-icon-s-check"></i>
                            <span slot="title">按用户验收</span>
                        </el-menu-item>
                    </el-col>
                    <el-col :span="8">
                        <el-menu-item index="3">
                            <i class="el-icon-s-release"></i>
                            <span slot="title">平台反作弊</span>
                        </el-menu-item>
                    </el-col>
                </el-row>
            </el-menu>
        </el-header>
        <el-main>
            <ByMiniTasks :task="task"/>
        </el-main>
    </el-container>
</template>

<script>
    import ByMiniTasks from "@/components/task/demander/acceptance/ByMiniTasks";

    export default {
        name: "Acceptance",
        components: {
            ByMiniTasks,
        },
        data() {
            return {
                answerProgress: {
                    totNum: 100,
                    checkNum: 10,
                    refuseNum: 1,
                },
                task: {
                    title: "任务标题",
                    intro: "任务介绍"
                },
            }
        },
        mounted: function () {
            this.assertTaskId()
        },
        methods: {
            assertTaskId() {
                let task = this.$route.params
                if (task.id && Number(task.status) === 3) {
                    this.task = task
                    return true
                } else {
                    this.$message.warning("验收出错啦！即将返回前一页面")
                    setTimeout(() => {
                        this.$router.back()
                    }, 1500)
                }
                return false
            },
        },
    }
</script>

<style scoped>
    .singleButton {
        margin: 3px 5px 3px 5px;
    }
</style>