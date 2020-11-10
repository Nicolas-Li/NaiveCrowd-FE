<template>
    <el-container>
        <el-header>
            {{currentPage-1}}.{{data[currentPage-1].description}}
        </el-header>
        <el-main>
            <div v-if="data[currentPage-1].type==='choice'">
                <el-radio-group v-model="answer[currentPage-1]">
<!--                    <div :key=item v-for="(item,index) in data[currentPage-1].choice">-->
                    <div :key=item v-for="item in data[currentPage-1].choice">
                        <el-radio :label="item">
<!--                            {{String.fromCharCode(65+index)}}.{{item}}-->
                            {{item.trim().replace(':', '.').replace(/'/ig, '')}}
                        </el-radio>
                    </div>
                </el-radio-group>
            </div>
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
            <el-pagination
                    :current-page.sync="currentPage"
                    :page-size="1"
                    :total="data.length"
                    background
                    layout="prev, pager, next">
            </el-pagination>
            <el-button @click="submit" v-if="currentPage===data.length">提交</el-button>
        </el-footer>
    </el-container>
</template>

<script>
    export default {
        name: "DoTask",
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
            }
        },
        data() {
            return {
                currentPage: 1,
                answer: [],
            }
        },
        methods: {
            submit: function () {
                this.$emit("onSubmit", this.answer)
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
</style>