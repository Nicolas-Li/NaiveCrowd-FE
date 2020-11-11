<template>
    <div>
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
    import TaskCard from "@/components/task/TaskCard"
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
            fun.loadAll().then(res=>{
                let alltasks=res.data.data
                fun.getFavor().then(res => {
                    let favor = res.data.data
                    for(var i=0;i<alltasks.length;i=i+1){                        
                        alltasks[i]['isFavor']=favor.includes(alltasks[i].id)
                        if(favor.includes(alltasks[i].id)){
                            this.taskList.push(alltasks[i])
                        }
                    }
                }).catch(err => {
                    this.$message.error(err.toString())
                })
            }).catch(err => {
                this.$message.error(err.toString())
            })
        },
        methods: {
            
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