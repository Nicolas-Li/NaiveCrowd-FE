<template>
    <el-card :body-style="{ padding: '0px' }" style="height: 250px; width: 400px; background: black"/>
</template>

<script>
    export default {
        name: "TaskCard",
        props: {
            task: {
                type: Object,
                default: () => {
                    return {
                        name: "任务样例",
                        time: new Date(),
                    }
                }
            }
        }
    }
</script>

<style scoped>

    .time {
        font-size: 13px;
        color: #999;
    }

    .bottom {
        margin-top: 13px;
        line-height: 12px;
    }

    .button {
        padding: 0;
        float: right;
    }

    .image {
        width: 100%;
        display: block;
    }

    .clear-fix:before,
    .clear-fix:after {
        display: table;
        content: "";
    }

    .clear-fix:after {
        clear: both
    }
</style>