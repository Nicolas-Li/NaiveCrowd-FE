<template>
    <el-card class="card">
        <el-image v-if="task.cover"
                  style="width: 100%" fit="cover"
                  :src="task.cover"/>
        <h2>{{ task.title }}</h2>
        <p>{{ task.intro }}</p>
        <el-button>{{ task.time }}</el-button>
    </el-card>
</template>

<script>
    export default {
        name: "TaskCard",
        props: {
            task: {
                type: Object,
                default: () => {
                    return {
                        cover: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                        title: "任务样例",
                        intro: "整合人工智能，实现自动驾驶，进阶人机交互",
                        time: new Date().toLocaleString(),

                    }
                }
            }
        }
    }
</script>

<style scoped>
    .card {
        border-radius: 20px;
        margin-bottom: -10px;
        width: 280px;
        overflow: hidden;
    }
</style>