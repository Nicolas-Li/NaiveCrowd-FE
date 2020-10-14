<template>
    <div>
        <el-card class="card">
            <el-row>
                <el-col :span="19">
                    <h2>{{ task.title }}</h2>
                </el-col>
                <el-col :span="5">
                    {{ task.status }}
                </el-col>
            </el-row>
            <p>{{ task.intro }}</p>
            <el-row>
                <el-col :span="20">{{}}</el-col>
                <el-col :span="4">
                    <el-row :span="18">{{ task.time }}</el-row>
                    <el-row :span="6">截止时间</el-row>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "Task",
        props: {
            task: {
                type: Object,
                default: () => {
                    return {}
                }
            }
        },
        mounted: function () {
            // console.log(this.task.status)
        },
        computed: {}
    }
</script>

<style scoped>
    .card {
        border-radius: 20px;
        margin-bottom: -10px;
        width: 400px;
        overflow: hidden;
    }
</style>