<template>
    <el-container>
        <el-header>
            <el-row>
                <el-col :span='2' align="left" ><div style="white-space:pre">是否可收藏: </div></el-col>
                <el-col :span='12' align="left"><div>
                    <el-radio v-model="canBeFavor" :label=0 @change="change">不限</el-radio>
                    <el-radio v-model="canBeFavor" :label=1 @change="change">可收藏</el-radio>
                </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span='2' align="left" ><div style="white-space:pre">状态: </div></el-col>
                <el-col :span='12' align="left"><div>
                    <el-radio v-model="status" :label=-1 @change="change">不限</el-radio>
                    <el-radio v-model="status" :label=2 @change="change">发布中</el-radio>
                    <el-radio v-model="status" :label=3 @change="change">待验收</el-radio>
                    <el-radio v-model="status" :label=4 @change="change">待结算</el-radio>
                    <el-radio v-model="status" :label=5 @change="change">已结束</el-radio>
                </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span='2' align="left" ><div style="white-space:pre">题型: </div></el-col>
                <el-col :span='12' align="left"><div>
                    <el-radio v-model="type" label='0' @change="change">不限</el-radio>
                    <el-radio v-model="type" label='choice' @change="change">选择题</el-radio>
                    <el-radio v-model="type" label='completion' @change="change">填空题</el-radio>
                    <el-radio v-model="type" label='photo-judge' @change="change">判断题</el-radio>
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
                canBeFavor:0,
                status:-1,
                type:"0",
                tasks: [],
                alltasks:[],
                favor:[],
            }
        },
        mounted: function () {
            fun.loadAll()
                .then(res=>{
                    this.alltasks=res.data.data
                    fun.getFavor()
                        .then(res => {
                                this.favor = res.data.data
                                for(var i=0;i<this.alltasks.length;i=i+1){
                                    this.alltasks[i]['isFavor']=this.favor.includes(this.alltasks[i].id)
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
                fun.loadMore(this.alltasks.length, number)
                    .then(res => {
                        let data = res.data.data
                        this.alltasks = this.alltasks.concat(data)
                        this.change(0)
                    }).catch(err => {
                    this.$message.error(err.toString())
                })
            },
            change(label){
                this.tasks.splice(0,this.tasks.length)
                for(var i=0;i<this.alltasks.length;i=i+1){
                    if((this.canBeFavor==0||(this.alltasks[i].status<=4&&!this.favor.includes(this.alltasks[i].id)))
                    &&((this.status==-1&&this.alltasks[i].status>=2)||this.alltasks[i].status==this.status)
                    &&(this.type=='0'||this.alltasks[i].type==this.type))
                    {
                        this.tasks.push(this.alltasks[i])
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