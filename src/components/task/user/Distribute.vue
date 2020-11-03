<template>
    <div>
        <el-button class="creatBtn" type="primary" plain
                   @click="createNewTask">换一换<i class="el-icon-plus"/></el-button>
        <div>id:{{id}}</div>
    </div>
</template>

<script>
    import Stick from "vue-stick"
    import TaskCard from "@/components/task/user/Task";
    import fun from "@/net/task"

    export default {
        name: "MyTasks",
        components: {
        },
        data() {
            return {
                id:'0',
                
            }
        },
        mounted: function () {
            this.getMiniTask()
        },
        methods: {
            getMiniTask:function(){
                fun.distribute_minitask()
                .then(res => {
                            this.id = res.id
                        }).catch(err => {
                        this.$message.error(err.toString())
                    })
                this.$cookies.set("miniTaskId",this.id)
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