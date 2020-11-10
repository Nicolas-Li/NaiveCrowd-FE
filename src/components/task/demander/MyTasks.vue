<template>
    <div>
        <el-button class="creatBtn" type="primary" plain
                   icon="el-icon-plus"
                   @click="createNewTask">创建新任务 <i class="el-icon-plus"/></el-button>
        <el-main class="stick">
            <Stick :list="taskList" :columnWidth="400">
                <template slot-scope="scope">
                    <TaskCard :task="scope.data"/>
                </template>
            </Stick>
        </el-main>
    </div>
</template>

<script>
    import Stick from "vue-stick"
    import TaskCard from "@/components/task/demander/Task";
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
            this.loadTask()
        },
        methods: {
            loadTask: function () {
                fun.loadTask()
                    .then(res => {
                        this.taskList = res.data.data
                    }).catch(err => {
                    this.$message.error(err.toString())
                })
            },
            createNewTask: function () {
                this.$router.push('/main/task/create')
            }
        }
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