<template>
    <el-carousel indicator-position="none" :autoplay="false">
        <el-carousel-item v-for="item in 4" :key="item">
            <el-container>
                <el-col style="height: 100%">
                    <el-row :span="12">
                        <el-col :span="8">
                            <TaskCard/>
                        </el-col>
                        <el-col :span="8">
                            <TaskCard/>
                        </el-col>
                        <el-col :span="8">
                            <TaskCard/>
                        </el-col>
                    </el-row>
                    <el-row :span="12">
                        <el-col :span="8">
                            <TaskCard/>
                        </el-col>
                        <el-col :span="8">
                            <TaskCard/>
                        </el-col>
                        <el-col :span="8">
                            <TaskCard/>
                        </el-col>
                    </el-row>

                </el-col>
            </el-container>
        </el-carousel-item>
    </el-carousel>
</template>

<script>
    import TaskCard from "@/components/task/TaskCard";

    export default {
        name: "TaskSquare",
        components: {
            TaskCard,
        }
    }
</script>

<style scoped>

</style>