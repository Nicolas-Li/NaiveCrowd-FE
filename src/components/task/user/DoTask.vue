<template>
    <el-container>
        <el-divider></el-divider>
        <el-pagination
                background
                @current-change="current_change"
                layout="prev, pager, next"
                :page-size="1"
                :total="problems.length">
            </el-pagination>
        <el-divider></el-divider>
        <el-head>
            <el-col :span="24"><div>{{currentPage}}.{{problems[currentPage-1].description}}</div></el-col>
            <el-image v-if="problems[currentPage-1].url"
                  :src="problems[currentPage-1].url"/>
        </el-head>
        <el-main>
            
            <div v-if="problems[currentPage-1].type=='choice'">
                <el-radio-group v-model="answer[currentPage-1]" >
                    <div v-for="(item1,index1) in problems[currentPage-1].choice" :key=item1>
                        <el-radio :label=indexToABC[index1]>
                            {{indexToABC[index1]}}.{{item1}}
                        </el-radio>
                    </div>
                </el-radio-group>
            </div>
            <div v-else-if="problems[currentPage-1].type=='completion'">
                <el-input style="text-align:center;vertical-align:middle;" 
                placeholder="请输入答案" 
                v-model="answer[currentPage-1]" 
                clearable>
                </el-input>
            </div>
            <div v-else-if="problems[currentPage-1].type=='photo-judge'">
                    <el-radio v-model="answer[currentPage-1]" label='yes'>
                        √
                    </el-radio>
                    <el-radio v-model="answer[currentPage-1]" label='no'>
                        ×
                    </el-radio>
            </div>
        </el-main>
        <el-footer><el-button @click="submit">提交</el-button></el-footer>

    </el-container>
</template>

<script>
    import TaskCard from "@/components/task/TaskCard";
    import Stick from "vue-stick"
    import fun from "@/net/doTask"

    export default {
        name: "DoTask",
        components: {

        },
        data() {
            return {
                id:'',
                indexToABC:['A','B','C','D','E','F','G'],
                currentPage:1,
                answer:[],
                problems:[
                    {
                        description:'题目描述题目描述1',
                        choice:['选项1','选项2','选项3'],
                        type:'choice'
                    },
                    {
                        description:'题目描述题目描述2',
                        choice:['选项1','选项2','选项3'],
                        type:'completion'
                    },
                    {
                        description:'题目描述题目描述3',
                        choice:['选项1','选项2','选项3'],
                        type:'photo-judge',
                        url:'http://ydschool-online.nos.netease.com/1603071728688-file.jpg'
                    },
                ]
            }
        },
        mounted: function () {
            this.id=this.$cookies.get("miniTaskId")
            fun.load_problems(this.id)
            .then(res => {
                        this.problems = res.data
                    }).catch(err => {
                    this.$message.error(err.toString())
                })
        },
        methods: {
            current_change:function(currentPage){
                this.currentPage = currentPage;
            },
            submit:function(){
                var flag=true
                var i=0
                for(;i<this.problems.length;i++){
                    if(this.answer[i]==null){
                        flag=false
                        break
                    }
                }
                if(!flag)this.$message.error("第"+(String)(i+1)+"题未完成")
                else {
                    fun.submit_answer(this.answer,this.id)
                    .then(res=>{
                    }).catch(err=>{
                        this.$message.error(err.toString())
                    })
                    this.$message.info("提交成功")
                    this.$router.go(-1)
                }
            }
        }
    }
</script>

<style scoped>
    .title {
        font-size: x-large;
        font-weight: bolder;
    }
    .el-radio{
        font-size: x-large;
    }
</style>