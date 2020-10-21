<template>
    <Stick :list="tasks" @onScrollEnd="loadMore">
        <template slot-scope="scope">
            <TaskCard :task="scope.data"/>
        </template>
    </Stick>
</template>

<script>
    import TaskCard from "@/components/task/TaskCard";
    import Stick from "vue-stick"
    import fun from "@/net/task"

    export default {
        name: "TaskSquare",
        components: {
            TaskCard,
            Stick: Stick.component
        },
        data() {
            return {
                tasks: [],
            }
        },
        mounted: function () {
            if (this.tasks.length === 0) {
                this.loadMore(10)
            }
        },
        methods: {
            loadMore: function (number = 20) {
                fun.loadMore(this.tasks.length, number)
                    .then(res => {
                        let data = res.data
                        this.tasks = this.tasks.concat(data)
                    }).catch(err => {
                    this.$message.error(err.toString())
                })
            }
        }
    }
</script>

<style scoped>

</style>