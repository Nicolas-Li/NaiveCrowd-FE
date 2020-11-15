<template>
    <div>
        <el-main class="stick">
            <Stick :columnWidth="400" :list="taskList">
                <template slot-scope="scope">
                    <TaskCard :task="scope.data"/>
                </template>
            </Stick>
        </el-main>
    </div>
</template>

<script>
    import Stick from "vue-stick"
    import TaskCard from "@/components/task/user/Task"
    import fun from "@/net/task"

    export default {
        name: "MyTasks",
        components: {
            TaskCard,
            Stick: Stick.component
        },
        data() {
            return {
                taskList: []
            }
        },
        mounted: function () {
            fun.loadTask()
                .then(res => {
                    this.taskList = res.data.data
                }).catch(err => {
                this.$message.error(err.toString())
            })
        },
        methods: {}
    }
</script>

<style scoped>
    .creatBtn {
        align-self: flex-start;
        width: 80%;
        border-style: hidden;
    }

    .stick {
        margin-left: 5%;
        width: 90%;
    }
</style>