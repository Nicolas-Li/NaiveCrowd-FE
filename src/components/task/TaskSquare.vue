<template>
    <el-container>
        <el-header>
            <el-row>
                <el-col :span='2' align="left">
                    <div style="white-space:pre">是否可收藏:</div>
                </el-col>
                <el-col :span='12' align="left">
                    <div>
                        <el-radio :label=0 @change="change" v-model="canBeFavor">不限</el-radio>
                        <el-radio :label=1 @change="change" v-model="canBeFavor">可收藏</el-radio>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span='2' align="left">
                    <div style="white-space:pre">状态:</div>
                </el-col>
                <el-col :span='12' align="left">
                    <div>
                        <el-radio :label=-1 @change="change" v-model="status">不限</el-radio>
                        <el-radio :label=2 @change="change" v-model="status">发布中</el-radio>
                        <el-radio :label=3 @change="change" v-model="status">待验收</el-radio>
                        <el-radio :label=4 @change="change" v-model="status">待结算</el-radio>
                        <el-radio :label=5 @change="change" v-model="status">已结束</el-radio>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span='2' align="left">
                    <div style="white-space:pre">题型:</div>
                </el-col>
                <el-col :span='12' align="left">
                    <div>
                        <el-radio @change="change" label='0' v-model="type">不限</el-radio>
                        <el-radio @change="change" label='choice' v-model="type">选择题</el-radio>
                        <el-radio @change="change" label='completion' v-model="type">填空题</el-radio>
                        <el-radio @change="change" label='photo-judge' v-model="type">判断题</el-radio>
                    </div>
                </el-col>
            </el-row>
        </el-header>
        <el-divider></el-divider>
        <el-main>
            <Stick :list="tasks" @onScrollEnd="loadMore">
                <template slot-scope="scope">
                    <TaskCard :task="scope.data"/>
                </template>
            </Stick>
        </el-main>
    </el-container>
</template>

<script>
    import TaskCard from "@/components/task/TaskCard"
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
                canBeFavor: 0,
                status: -1,
                type: "0",
                tasks: [],
                allTasks: [],
                favor: [],
            }
        },
        mounted: function () {
            fun.loadAll()
                .then(res => {
                    this.allTasks = res.data.data
                    fun.getFavor()
                        .then(res => {
                            this.favor = res.data.data
                            for (let i = 0; i < this.allTasks.length; i = i + 1) {
                                this.allTasks[i]['isFavor'] = this.favor.includes(this.allTasks[i].id)
                            }
                        }).catch(err => {
                        this.$message.error(err.toString())
                    })
                    this.change(0)
                }).catch(err => {
                this.$message.error(err.toString())
            })


        },
        methods: {
            loadMore: function (number = 10) {
                fun.loadMore(this.allTasks.length, number)
                    .then(res => {
                        let data = res.data.data
                        this.allTasks = this.allTasks.concat(data)
                        this.change(0)
                    }).catch(err => {
                    this.$message.error(err.toString())
                })
            },
            change(label) {
                this.tasks.splice(0, this.tasks.length)
                for (let i = 0; i < this.allTasks.length; i = i + 1) {
                    if ((this.canBeFavor === 0 || (this.allTasks[i].status <= 4 && !this.favor.includes(this.allTasks[i].id)))
                        && ((this.status === -1 && this.allTasks[i].status >= 2) || this.allTasks[i].status === this.status)
                        && (this.type === '0' || this.allTasks[i].type === this.type)) {
                        this.tasks.push(this.allTasks[i])
                    }
                }
            },
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