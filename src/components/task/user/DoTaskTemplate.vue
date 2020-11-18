<template>
    <el-container>
        <el-header>
            <div style="margin:5px">第{{currentPage}}题.{{data[currentPage-1].description}}</div>
            <div v-if="data[currentPage-1].type==='choice'">
                <el-radio-group v-model="answer[currentPage-1]">
                    <div :key=item v-for="item in data[currentPage-1].choice">
                        <el-radio :label="item" style="zoom:130%;margin:3px">
                            {{item}}
<!--                            {{String.fromCharCode(65+index)}}.{{item}}-->
                            <!-- {{item.trim().replace(':', '.').replace(/'/ig, '')}} -->
                        </el-radio>
                    </div>
                </el-radio-group>
            </div>
        </el-header>
        <el-main>
            <div v-if="data[currentPage-1].type==='completion'">
                <el-input clearable
                          placeholder="请输入答案"
                          v-model="answer[currentPage-1]">
                </el-input>
            </div>
            <div v-if="data[currentPage-1].type==='photo-judge'">
                <el-image :src="data[currentPage-1].imageUrl"/>
                <el-radio-group v-model="answer[currentPage-1]">
                    <el-radio label='yes'>√</el-radio>
                    <el-radio label='no'>×</el-radio>
                </el-radio-group>
            </div>
        </el-main>
        <el-footer>
            <el-container>
                <el-head>
                    <el-pagination
                            :current-page.sync="currentPage"
                            :page-size="1"
                            :total="data.length"
                            background
                            layout="prev, pager, next">
                    </el-pagination>
                </el-head>
                <el-main>
                    <el-button @click="submit" v-if="currentPage===data.length">提交</el-button>
                </el-main>
                <el-footer>
                    <Timer :time="time" :maxtime="maxtime" ref="headerChild"></Timer>
                </el-footer>
            </el-container>
        </el-footer>
    </el-container>
</template>

<script>
    import Timer from "@/components/task/user/Timer";
    export default {
        name: "DoTaskTemplate",
        components: {
            Timer,
        },
        props: {
            data: {
                type: Array,
                default: () => {
                    return [{
                        description: "",
                        type: "",
                        choice: [""],
                        imageUrl: null,
                    }]
                }
            },
            maxtime:{
                type:Number,
                default:600
            }
        },
        data() {
            return {
                currentPage: 1,
                answer: [],
            }
        },
        created() {
            this.$refs.headerChild.start()
        },
        methods: {
            submit: function () {
                if(this.$refs.headerChild.overtime==false){
                    this.$emit("onSubmit", this.answer)
                }
                else{
                    this.$message.error("超时啦！")
                }
            }
        },
        watch: {
            "data": {
                handler(newData) {
                    if (newData) {
                        this.answer = new Array(newData.length)
                    }
                }
            }
        }
    }
</script>

<style scoped>
     .radio {
        font-size:20px;
        zoom: 220%;
        margin:10px
    }
</style>