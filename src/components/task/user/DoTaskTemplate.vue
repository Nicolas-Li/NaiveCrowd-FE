<template>
    <el-container v-if="data">
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
                <el-row>
                    <el-col :span="12">
                        <el-image :src="data[currentPage-1].imageUrl" style="max-height: 500px" fit="contain"/>
                    </el-col>
                    <el-col :span="12">
                        <el-radio-group v-model="answer[currentPage-1]">
                            <el-radio label='yes'>√</el-radio>
                            <el-radio label='no'>×</el-radio>
                        </el-radio-group>
                    </el-col>
                </el-row>
            </div>
        </el-main>
        <el-footer>
            <el-container>
                <el-col>
                    <el-row>
                        <el-pagination
                                :current-page.sync="currentPage"
                                :page-size="1"
                                :total="data.length"
                                background
                                layout="prev, pager, next">
                        </el-pagination>
                    </el-row>
                    <el-row>
                        <el-button @click="submit" v-if="currentPage===data.length">提交</el-button>
                    </el-row>
                    <el-row>
                        <Timer :maxTime="maxTime" ref="headerChild" @timeIsOut="timeIsOut"/>
                    </el-row>
                </el-col>
            </el-container>
        </el-footer>
    </el-container>
</template>

<script>
    import Timer from "@/components/task/user/Timer"

    export default {
        name: "DoTaskTemplate",
        components: {
            Timer,
        },
        props: {
            data: {
                type: Array,
                default: () => {
                    return [{},{
                        description: "",
                        type: "",
                        choice: [""],
                        imageUrl: null,
                    }]
                }
            },
            maxTime: {
                type: Number,
                default: 600
            },
            isTimer: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                currentPage: 1,
                answer: [],
            }
        },
        mounted() {
            if (this.isTimer)
                this.$refs.headerChild.start()
        },
        methods: {
            submit: function () {
                if (!this.isTimer) {
                    this.$emit("onSubmit", this.answer)
                } else {
                    if (this.$refs.headerChild.overtime === false) {
                        this.$emit("onSubmit", this.answer)
                    } else {
                        this.$message.error("超时啦！")
                    }
                }
            },
            timeIsOut() {
                this.$message.error("超时啦！")
                this.$emit("timeIsOut")
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
        font-size: 20px;
        zoom: 220%;
        margin: 10px
    }
</style>